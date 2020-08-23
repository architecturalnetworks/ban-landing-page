<template>
  <div>
    <div class="max-w-4xl px-4 pt-4 mx-auto sm:px-8">
      <header>
        <nav-bar />
        <div class="h-8 md:h-20" />
        <!-- HERO -->
        <home-hero />
      </header>

      <div class="h-12 md:h-20" />
      <section class="text-lg leading-tight text-center md:text-xl">
        <h1 class="font-bold">
          <span class="text-red-600 font-logo">&middot;ban</span>
          {{ homeCopy.title }}
        </h1>
        <p>{{ homeCopy.tagline }}</p>
        <div class="h-12" />
        <div class>
          <email-form :text="homeCopy" />
        </div>
      </section>

      <div class="h-16 sm:h-24" />
      <!-- <section>
        <div class="max-w-xl mx-auto">
          <p class="text-center text-red-600 font-logo">&middot;</p>
          <p>&nbsp;</p>
          <nuxt-content :document="homeCopy" class="text-center" />
          <p>&nbsp;</p>
          <p class="text-center text-red-600 font-logo">&middot;</p>
        </div>
      </section>
      <div class="h-12 sm:h-16" /> -->
    </div>
    <!-- JOBS -->
    <section class="px-4 pb-8 sm:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between">
          <h2 class="font-bold">
            <nuxt-link to="/berlin/events" class="no-underline">Jobs</nuxt-link>
            <span class="font-normal text-red-600 font-logo">latest</span>
          </h2>
          <p class="text-red-600 font-logo">
            <!-- <nuxt-link to="/berlin/events" class="no-underline">[·]</nuxt-link> -->
            [x]
          </p>
        </div>
        <div class="h-4" />
        <job-list />
      </div>
      <div class="h-8" />
    </section>
    <!-- EVENTS -->
    <section class="px-4 pb-8 sm:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between">
          <h2 class="font-bold">
            <nuxt-link to="/berlin/events" class="no-underline"
              >Events</nuxt-link
            >
            <span class="font-normal text-red-600 font-logo">next</span>
          </h2>
          <p class="text-red-600 font-logo">
            <nuxt-link to="/berlin/events" class="no-underline">[·]</nuxt-link>
          </p>
        </div>
        <div class="h-4" />
        <event-list-future :events="events" :fetch-state="eventsFetchState" />
      </div>
      <div class="h-8" />
    </section>
    <!-- ABOUT  -->
    <section class="px-4 py-8 text-white bg-black sm:p-8">
      <div class="max-w-xl mx-auto">
        <h2 class="font-bold">
          About
          <span class="font-normal text-red-600 font-logo">&middot;ban</span>
        </h2>
        <div class="h-4" />
        <nuxt-content :document="about" />
      </div>
    </section>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useFetch,
  useContext,
} from 'nuxt-composition-api'
import { endOfYesterday, format } from 'date-fns'
const YESTERDAY = format(endOfYesterday(), 'yyyy-MM-dd HH:mm')
export default defineComponent({
  setup() {
    const {
      $content,
      app: { $storyapi },
    } = useContext()
    const homeCopy = ref({})
    const about = ref({})
    const events = ref()
    useFetch(async () => {
      homeCopy.value = await $content('homeCopy').fetch()
      about.value = await $content('homeAbout').fetch()
    })
    const { fetchState: eventsFetchState } = useFetch(async () => {
      const eventsRaw = await $storyapi.get('cdn/stories', {
        starts_with: 'events/',
        filter_query: {
          date: {
            gt_date: YESTERDAY,
          },
        },
        sort_by: 'content.date:asc',
      })
      if (eventsRaw.total) {
        events.value = eventsRaw.data.stories
      }
    })
    return {
      eventsFetchState,
      homeCopy,
      about,
      events,
    }
  },
})
</script>

<style></style>
