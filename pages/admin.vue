<template>
  <div>
    <button
      class="p-2 m-2 bg-gray-300 border rounded shadow"
      @click="addToDatabase"
    >
      Add to database
    </button>
    <ul>
      <li v-for="event in events" :key="event.slug">
        {{ event.meetupId }} - {{ event.title }}
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import gql from 'graphql-tag'
import { client } from '@/plugins/apollo'

export default {
  layout: 'pages',
  async asyncData({ $content }) {
    const events = await $content('events')
      .where({
        publish: true,
      })
      .sortBy('meetupId', 'desc')
      .fetch()

    return {
      events,
    }
  },
  methods: {
    async addToDatabase() {
      const objects = this.assembleEventObjects(this.events)
      try {
        const { data } = await client.mutate({
          mutation: gql`
            mutation insert_event($objects: [event_insert_input!]!) {
              insert_event(objects: $objects) {
                affected_rows
              }
            }
          `,
          variables: {
            objects,
          },
        })
        console.log(data)
        return data
      } catch (e) {
        console.error(e)
      }
    },
    assembleEventObjects(events) {
      const objects = []
      for (const event of this.events) {
        // console.log(event)
        const {
          date,
          image: main_image,
          meetupId: meetup_id,
          onlineEvent: is_online,
          onlineEventLink: online_event_url,
          slug,
          subtitle,
          summary,
          title,
          type,
          body,
          location,
          attendees,
        } = event
        const description = body.children
          .map(({ children }) => {
            if (children.type === 'text') return children.value
          })
          .join(' ')

        const object = {
          date,
          main_image,
          meetup_id,
          is_online,
          online_event_url,
          slug,
          subtitle,
          title,
          type,
          location,
          attendees,
          summary,
          description,
        }
        // console.log(object)
        objects.push(object)
      }
      return objects
    },
  },
}
</script>

<style scoped></style>
