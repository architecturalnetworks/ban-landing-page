<template>
  <div>
    <div class="px-4 sm:px-8">
      <header class="pt-8 md:pt-24">
        <!-- <div class="flex items-center justify-between md:hidden">
          <logo-ban-text class="text-2xl" />
          <div>
            <icon-hamburger class="w-6 h-6" />
          </div>
        </div> -->
        <div class="h-8 md:hidden" />
        <!-- HERO -->
        <home-hero />
      </header>

      <div class="h-12 md:h-24" />
      <section
        class="max-w-xl mx-auto text-lg leading-tight text-center md:text-xl"
      >
        <h1 class="font-bold">
          <span class="text-red-600 font-logo">&middot;ban </span
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
      <!-- EVENTS -->
      <section>
        <div class="max-w-xl mx-auto">
          <!-- <div class="w-12 mb-1 border-t-2 border-red-600" /> -->
          <div class="flex justify-between">
            <h2 class="font-bold">
              Events
              <span class="font-normal text-red-600 font-logo">next</span>
            </h2>
            <p class="font-logo">[O]</p>
          </div>
          <div class="h-8" />
          <ul class="space-y-8">
            <li
              v-for="event in events"
              :key="event.slug"
              class="flex items-start space-x-4"
            >
              <div
                class="flex-none w-12 text-center cursor-pointer sm:w-24 hover:text-red-600 mouse-pointer"
              >
                <p class="text-right font-logo">
                  <a :href="event.link" class="no-underline">
                    {{ $dateFns.format(new Date(event.date), 'MMM do') }}<br />
                    {{ event.time }}</a
                  >
                </p>
              </div>
              <div>
                <p class="-ml-2 font-logo">
                  <span class="text-red-600">&middot;ban</span>{{ event.type }}
                </p>
                <h3 class="font-bold">
                  <a :href="event.link">{{ event.title }}</a>
                </h3>
                <p>{{ event.subtitle }}</p>
              </div>
            </li>
            <li class="flex items-start space-x-4">
              <div
                class="flex-none w-12 text-center cursor-pointer sm:w-24 hover:text-red-600 mouse-pointer"
              ></div>
              <div>
                <p>
                  Any ideas for an event?
                  <a href="mailto:berlin@architecturalnetworks.com"
                    >Let us know</a
                  >!
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <div class="h-16" />
    </div>
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

<style>
.masthead {
  width: 100%;
  height: 100vh; /* if you don't want it to take up the full screen, reduce this number */
  overflow: hidden;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 1) 100%
    ),
    url(~static/imgs/Paper-Artist-and-Engineer-Matt-Shlian.jpg) no-repeat center
      center scroll;
  background-size: cover, cover;
}
@screen sm {
  .masthead {
    height: 75vh;
  }
}

@screen lg {
  .masthead {
    height: 100vh;
  }
}
</style>
