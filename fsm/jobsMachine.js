import gql from 'graphql-tag'
import { Machine, assign } from 'xstate'
import { hasuraClient } from '@/plugins/apollo'
import { generateVueMachine } from './generateVueMachine'

const machine = Machine(
  {
    id: 'JobMachine',
    context: {
      jobs: [],
      error: null,
    },
    initial: 'idle',
    states: {
      idle: {},
      fetchingAll: {
        invoke: {
          id: 'invoke-fetch-all',
          src: invokeFetchAll,
          onDone: {
            actions: ['setJobs'],
            target: 'fetched',
          },
          onError: {
            actions: ['setError'],
            target: 'failed',
          },
        },
      },
      fetchingLatest: {
        invoke: {
          id: 'invoke-fetch-latest',
          src: invokeFetchLatest,
          onDone: {
            actions: ['setJobs'],
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
      FETCH_LATEST: 'fetchingLatest',
    },
  },
  {
    actions: {
      setJobs: assign({
        jobs: (_, event) => event.data,
      }),
      setError: assign({
        error: (_, event) => event.data,
      }),
    },
  }
)

export const jobFragment = gql`
  fragment jobItem on job {
    id
    date
    title
    job_id
    created_at
    company
    subtitle
    url
    site
    image_url
  }
`

async function invokeFetchAll() {
  const { data } = await hasuraClient.query({
    query: gql`
      query allJobs {
        job(order_by: { date: desc }, where: { status: { _neq: "disabled" } }) {
          ...jobItem
        }
      }
      ${jobFragment}
    `,
  })
  return data.job
}
async function invokeFetchLatest() {
  const { data } = await hasuraClient.query({
    query: gql`
      query allJobs {
        job(
          order_by: { date: desc }
          limit: 5
          where: { status: { _neq: "disabled" } }
        ) {
          ...jobItem
        }
      }
      ${jobFragment}
    `,
  })
  return data.job
}

export const jobsMachineVue = generateVueMachine(machine)
