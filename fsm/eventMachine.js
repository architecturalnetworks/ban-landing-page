import gql from 'graphql-tag'
import { Machine, assign } from 'xstate'
import { endOfYesterday, format } from 'date-fns'
import { storyblokClient } from '@/plugins/apollo'
import { generateVueMachine } from './generateVueMachine'

const machine = Machine(
  {
    id: 'EventMachine',
    context: {
      event: null,
      futureEvents: [],
      pastEvents: [],
      paginationEvents: [],
      error: null,
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          FETCH_FUTURE: 'fetchingFuture',
        },
      },
      fetchingFuture: {
        invoke: {
          id: 'invoke-fetch-future',
          src: invokeFetchFuture,
          onDone: {
            actions: ['setFutureEvents'],
            target: 'fetched',
          },
          onError: {
            actions: ['setError'],
            target: 'failed',
          },
        },
      },
      fetchingAll: {
        invoke: {
          id: 'invoke-fetch-all',
          src: invokeFetchAll,
          onDone: {
            actions: ['setFutureEvents', 'setPastEvents'],
            target: 'fetched',
          },
          onError: {
            actions: ['setError'],
            target: 'failed',
          },
        },
      },
      fetchingOne: {
        invoke: {
          id: 'invoke-fetch-one',
          src: invokeFetchOne,
          onDone: {
            actions: ['setEvent', 'setPaginationEvents'],
            target: 'fetched',
          },
          onError: {
            actions: ['setError'],
            target: 'failed',
          },
        },
      },
      failed: {},
      fetched: {},
    },
    on: {
      FETCH_ALL: 'fetchingAll',
      FETCH_ONE: 'fetchingOne',
    },
  },
  {
    actions: {
      setEvent: assign({
        event: (_, event) => event.data.event,
      }),
      setPaginationEvents: assign({
        paginationEvents: (_, event) => event.data.paginationEvents,
      }),
      setEvents: assign({
        events: (_, event) => event.data,
      }),
      setFutureEvents: assign({
        futureEvents: (_, event) => event.data.futureEvents,
      }),
      setPastEvents: assign({
        pastEvents: (_, event) => event.data.pastEvents,
      }),

      setError: assign({
        error: (_, event) => event.data,
      }),
    },
  }
)

export const eventFragment = gql`
  fragment eventItem on EventItem {
    id
    slug
    full_slug
    content {
      type
      title
      subtitle
      summary
      meetup_id
      location
      main_image {
        filename
      }
      is_online
      date
    }
  }
`

async function invokeFetchOne(_, event) {
  // 2019-12-24 09:00
  const {
    params: { id },
  } = event
  const { data } = await storyblokClient.query({
    query: gql`
      query event($id: ID!) {
        EventItem(id: $id) {
          ...eventItem
          content {
            description
            guests
            resources
            attendees
          }
        }
        EventItems(sort_by: "content.date:desc") {
          items {
            id
            slug
          }
        }
      }
      ${eventFragment}
    `,
    variables: {
      id,
    },
  })
  return { event: data.EventItem, paginationEvents: data.EventItems.items }
}
async function invokeFetchFuture() {
  // 2019-12-24 09:00
  const yesterday = format(endOfYesterday(), 'yyyy-MM-dd HH:mm')
  const { data } = await storyblokClient.query({
    query: gql`
      query futureEvents {
        futureEvents:EventItems(sort_by: "content.date:asc", filter_query: { date: { gt_date: "${yesterday}" } }) {
          items {
            ...eventItem
          }
        }
      }
      ${eventFragment}
    `,
  })
  return { futureEvents: data.futureEvents.items }
}
async function invokeFetchAll() {
  const yesterday = format(endOfYesterday(), 'yyyy-MM-dd HH:mm')
  const { data } = await storyblokClient.query({
    query: gql`
      query allEvents {
        futureEvents:EventItems(sort_by: "content.date:asc", filter_query: { date: { gt_date: "${yesterday}" } }) {
          items {
            ...eventItem
          }
        }
        pastEvents:EventItems(sort_by: "content.date:desc", filter_query: { date: { lt_date: "${yesterday}" } }) {
          items {
            ...eventItem
          }
        }
      }
      ${eventFragment}
    `,
  })
  return {
    futureEvents: data.futureEvents.items,
    pastEvents: data.pastEvents.items,
  }
}

export const eventMachineVue = generateVueMachine(machine)
