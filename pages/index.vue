<template>
  <div>
    <div class="px-4 sm:px-8">
      <header class="pt-8 md:pt-24">
        <div class="flex items-center justify-between md:hidden">
          <logo-ban-text class="text-2xl" />
          <div><icon-hamburger class="w-6 h-6" /></div>
        </div>
        <div class="h-8 md:hidden" />
        <!-- HERO -->
        <home-hero />
      </header>

      <div class="h-12 md:h-24" />
      <section
        class="max-w-xl mx-auto text-lg leading-tight text-center md:text-xl"
      >
        <h1 class="font-bold">
          The Architecture Community <br class="sm:hidden" />in Berlin
        </h1>
        <p>Promoting architecture discussion, local event, and networking</p>
        <div class="h-6" />
        <button
          class="w-48 py-2 font-mono font-bold tracking-wide text-white uppercase bg-red-600 shadow"
        >
          JOIN
        </button>
      </section>

      <div class="h-12 sm:h-24" />
      <section>
        <div class="max-w-xl mx-auto">
          <div class="w-12 mb-1 border-t-2 border-red-600" />
          <p>
            We are currently building the new
            <logo-ban-text class="text-lg" /> website.
            <br class="hidden lg:inline-block" />In the meantime, check our
            <a
              href="https://www.meetup.com/BAN-Berlin-Architectural-Network"
              class="font-bold red"
              >MeetUp</a
            >
            page or <span class="font-bold text-red-600">join</span> to stay in
            the loop about future updates.
          </p>
        </div>
      </section>
      <div class="h-12" />
      <!-- EVENTS -->
      <section>
        <div class="max-w-xl mx-auto">
          <div class="w-12 mb-1 border-t-2 border-red-600" />
          <div class="flex justify-between">
            <h2 class="font-bold">
              Events <span class="font-mono text-red-600">next</span>
            </h2>
            <span class="font-bold font-logo">[>]</span>
          </div>
          <div class="h-8" />
          <ul class="space-y-4">
            <li
              v-for="event in events"
              :key="event.slug"
              class="flex items-start space-x-4"
            >
              <div
                class="flex-none w-12 p-1 text-center cursor-pointer border-red sm:w-24 hover:text-red-600 hover:border-red-600"
              >
                <p
                  class="text-sm font-semibold uppercase font-logo sm:text-base"
                >
                  {{ $dateFns.format(new Date(event.date), 'd/MMM')
                  }}<br class="sm:hidden" />
                  {{ event.time }}
                </p>
              </div>
              <div>
                <p class="font-mono">
                  <span class="text-red-600">&middot;ban</span>{{ event.type }}
                </p>
                <h3 class="font-bold">{{ event.title }}</h3>
                <p>{{ event.subtitle }}</p>
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
        <h2 class="font-mono font-bold tracking-wide uppercase">
          About
        </h2>
        <div class="h-4" />
        <div>
          <nuxt-content :document="about" />
        </div>
      </div>
    </section>
    <base-footer />
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const about = await $content('homeAbout').fetch()
    const events = await $content('events').fetch()
    return {
      about,
      events,
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
