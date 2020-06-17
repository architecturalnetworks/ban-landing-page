<template>
  <div>
    <div class="px-4 sm:px-8">
      <header class="max-w-xl pt-8 mx-auto">
        <nav class="flex items-start justify-between">
          <logo-full-text class="mb-8 text-lg md:hidden" />
          <logo-ban-text class="hidden text-2xl md:block" />
          <!-- <div>
            <icon-hamburger class="w-6 h-6" />
          </div> -->
          <ul class="font-bold">
            <li><nuxt-link to="berlin/events">events</nuxt-link></li>
          </ul>
        </nav>
        <div class="h-8 md:h-20" />
        <!-- HERO -->
        <home-hero />
      </header>

      <div class="h-12 md:h-20" />
      <section
        class="max-w-xl mx-auto text-lg leading-tight text-center md:text-xl"
      >
        <h1 class="font-bold">
          <span class="text-red-600 font-logo md:hidden">&middot;ban </span
          >{{ homeCopy.title }}
        </h1>
        <p>{{ homeCopy.tagline }}</p>
        <div class="h-12" />
        <div class="max-w-sm mx-auto">
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
    <section class="px-4 py-8 bg-gray-100 sm:p-8">
      <div class="max-w-xl mx-auto">
        <!-- <div class="w-12 mb-1 border-t-2 border-red-600" /> -->
        <div class="flex justify-between">
          <h2 class="font-bold">
            <nuxt-link to="/berlin/events" class="no-underline"
              >Events</nuxt-link
            >
            <span class="font-normal text-red-600 font-logo">next</span>
          </h2>
          <p class="font-logo">
            <nuxt-link to="/berlin/events" class="no-underline">[>]</nuxt-link>
          </p>
        </div>
        <div class="h-4" />
        <event-list-home :events="events" />
      </div>
      <div class="h-16" />
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
export default {
  async asyncData({ $content }) {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const homeCopy = await $content('homeCopy').fetch()
    const about = await $content('homeAbout').fetch()
    const events = await $content('events')
      .where({
        publish: true,
        date: { $gt: yesterday },
      })
      .fetch()
    return {
      about,
      events,
      homeCopy,
    }
  },
}
</script>

<style></style>
