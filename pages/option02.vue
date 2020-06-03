<template>
  <div class="w-full h-full">
    <section
      class="px-4 py-8 sm:px-8 sm:pt-12 masthead"
      role="img"
      aria-label="Image Description"
    >
      <div class="flex flex-col justify-between h-full max-w-3xl mx-auto">
        <div
          class="w-16 h-16 overflow-hidden bg-white rounded-full md:w-24 md:h-24"
        >
          <logo-short class="w-16 h-16 md:w-24 md:h-24" />
        </div>
        <div>
          <div class="text-lg sm:text-xl md:text-2xl">
            <h1 class="font-bold">Berlin Architectural Network</h1>
            <p>
              The architecture community in Berlin, promoting architecture
              discussion, local activities, and networking
            </p>
          </div>
          <div class="h-12" />
          <div class="w-full md:w-2/3 lg:w-1/2">
            <form class="sm:flex">
              <input
                class="w-full h-10 p-2 text-black bg-white border border-black shadow-inner sm:h-12 sm:text-lg"
                type="text"
                placeholder="Enter your email"
              />
              <div class="w-2 h-2" />
              <button
                class="flex justify-between w-full h-10 p-1 font-mono text-lg tracking-wide text-white uppercase bg-red-600 shadow sm:h-12 sm:text-lg sm:w-1/3"
              >
                <span>|</span><span>join</span><span>|</span>
              </button>
            </form>
            <div class="h-2" />
            <p class="text-xs text-center sm:text-sm sm:text-left">
              You'll receive news about events, jobs, updates, and more. And you
              can unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
    <div class="h-12" />
    <section class="px-4 sm:px-8">
      <div class="max-w-3xl mx-auto">
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
    <section class="px-4 sm:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="w-12 mb-1 border-t-2 border-red-600" />
        <h2 class="font-mono font-bold tracking-wide uppercase">
          Upcoming Events
        </h2>
        <div class="h-8" />
        <ul class="space-y-4">
          <li
            v-for="event in events"
            :key="event.slug"
            class="flex items-start space-x-4"
          >
            <div
              class="flex-none w-12 p-1 mt-1 text-center bg-black cursor-pointer sm:w-24 hover:bg-red-600"
            >
              <p
                class="font-mono text-sm font-semibold text-white uppercase sm:text-base"
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
    <div class="h-12" />
    <!-- ABOUT  -->
    <section class="px-4 py-8 text-white bg-black sm:px-8">
      <div class="max-w-3xl mx-auto">
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
