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

      <div class="h-12 sm:h-16" />
      <section>
        <div class="max-w-xl mx-auto">
          <p class="text-center text-red-600 font-logo">&middot;</p>
          <p>&nbsp;</p>
          <nuxt-content :document="homeCopy" class="text-center" />
          <p>&nbsp;</p>
          <p class="text-center text-red-600 font-logo">&middot;</p>
        </div>
      </section>
      <div class="h-12 sm:h-16" />
    </div>
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
        <event-list-future />
      </div>
      <div class="h-8" />
    </section>
    <!-- ABOUT  -->
    <section class="px-4 py-8 text-white bg-black sm:p-8">
      <div class="max-w-xl mx-auto">
        <!-- <div class="w-12 mb-1 border-t-2 border-white" /> -->
        <h2 class="font-bold">
          About
          <span class="font-normal text-red-600 font-logo">&middot;ban</span>
        </h2>
        <div class="h-4" />
        <div>
          <nuxt-content :document="about" />
        </div>
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

export default defineComponent({
  setup() {
    const { $content } = useContext()
    const homeCopy = ref({})
    const about = ref({})
    useFetch(async () => {
      homeCopy.value = await $content('homeCopy').fetch()
      about.value = await $content('homeAbout').fetch()
    })

    return {
      homeCopy,
      about,
    }
  },
})
</script>

<style></style>
