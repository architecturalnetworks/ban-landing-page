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
      <section
        class="text-lg leading-tight text-center md:text-xl"
        v-if="homeCopy"
      >
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
            <nuxt-link to="/berlin/jobs" class="no-underline">Jobs</nuxt-link>
            <span class="font-normal text-red-600 font-logo">latest</span>
          </h2>
          <p class="text-red-600 font-logo">
            <nuxt-link to="/berlin/jobs" class="no-underline">[×]</nuxt-link>
          </p>
        </div>
        <div class="h-4" />
        <job-list :jobs="jobs" />
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
        <event-list-future :events="events" />
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
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { endOfYesterday, format } from 'date-fns'
import { invokeFetchLatest } from '~/use/fetchJobs'
const YESTERDAY = format(endOfYesterday(), 'yyyy-MM-dd HH:mm')
export default defineComponent({
  setup() {
    const {
      $content,
      app: { $storyapi },
    } = useContext()
    const homeCopy = useAsync(async () => await $content('homeCopy').fetch())
    const about = useAsync(async () => await $content('homeAbout').fetch())
    const events = useAsync(async () => {
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
    const jobs = useAsync(async () => await invokeFetchLatest())
    return {
      homeCopy,
      about,
      events,
      jobs,
    }
  },
})
</script>

<style></style>
