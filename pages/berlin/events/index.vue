<template>
  <div class="h-full sandwich-grid">
    <!-- BREADCRUMBS  -->
    <nav class="mb-2 text-xs">
      <ul class="flex space-x-2">
        <li><nuxt-link to="/berlin">Home</nuxt-link></li>
      </ul>
    </nav>
    <!-- FUTURE EVENTS  -->
    <section>
      <h1 class="font-bold">
        Events<span class="font-normal text-red-600 font-logo"> next</span>
      </h1>
      <div class="h-6" />

      <event-list-future :events="futureEvents" />

      <div class="h-12" />
    </section>
    <!-- PAST EVENTS  -->
    <section class="bg-gray-100 full-width">
      <div class="max-w-4xl px-4 mx-auto sm:px-8">
        <div class="h-10" />
        <h2 class="font-bold">
          Events<span class="font-normal text-red-600 font-logo"> past</span>
        </h2>
        <div class="h-6" />

        <template v-if="pastEvents">
          <ul class="h-full past-events-grid">
            <li v-for="event in pastEvents" :key="event.id">
              <event-list-item :event="event" />
            </li>
          </ul>
        </template>
        <template v-else>
          <spinner />
        </template>

        <div class="h-10" />
      </div>
    </section>
  </div>
</template>

<script>
import {
  defineComponent,
  useMeta,
  useAsync,
  useContext,
} from '@nuxtjs/composition-api'
import { endOfYesterday, format } from 'date-fns'
import { createSEOMeta } from '~/utils/seo'
const YESTERDAY = format(endOfYesterday(), 'yyyy-MM-dd HH:mm')

export default defineComponent({
  layout: 'pages',
  head: {},
  setup() {
    useMeta({
      title: 'Events ·ban - Berlin Architectural Network',
      meta: createSEOMeta({
        description: 'Future and past events for architects in Berlin.',
      }),
    })
    const {
      app: { $storyapi },
    } = useContext()

    const futureEvents = useAsync(async () => {
      const res = await $storyapi.get('cdn/stories', {
        starts_with: 'events/',
        filter_query: {
          date: {
            gt_date: YESTERDAY,
          },
        },
        sort_by: 'content.date:asc',
      })
      return res.total ? res.data.stories : []
    })
    const pastEvents = useAsync(async () => {
      const res = await $storyapi.get('cdn/stories', {
        starts_with: 'events/',
        filter_query: {
          date: {
            lt_date: YESTERDAY,
          },
        },
        sort_by: 'content.date:desc',
      })
      return res.total ? res.data.stories : []
    })

    return {
      futureEvents,
      pastEvents,
    }
  },
})
</script>

<style scoped>
ul.past-events-grid {
  display: grid;
  grid-gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
@screen sm {
  ul.past-events-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
