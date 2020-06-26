<template>
  <div>
    <div class="home-event-grid">
      <event-list-item-next :event="events[0]" />

      <div v-if="events.length > 1">
        <!-- SMALLER SCREENS, SHOW BIG CARDS -->
        <ul id="list-screen-small" class="space-y-4 md:hidden">
          <li v-for="event in events.slice(1)" :key="event.slug">
            <event-list-item-next :event="event" />
          </li>
        </ul>
        <!-- LARGE SCREENS, MAKE IT A REGULAR LIST -->
        <div class="hidden md:block">
          <ul class="h-full event-grid">
            <li v-for="event in events.slice(1)" :key="event.slug">
              <event-list-item :event="event" />
            </li>
            <li
              v-if="events.slice(1).length < 2"
              class="flex-col items-center justify-center hidden p-4 bg-white border-2 border-dashed md:flex"
            >
              <span class="text-6xl text-gray-400 font-logo">&plus;</span>
              Any ideas for an event?<br />
              <a href="mailto:berlin@architecturalnetworks.com">Let us know!</a>
            </li>
          </ul>
          <!-- <event-list :events="events.slice(1)" /> -->
        </div>
      </div>

      <div class="md:hidden">
        <div class="h-8" />
        <p class="text-center">
          Any ideas for an event?
          <a href="mailto:berlin@architecturalnetworks.com">Let us know!</a>
        </p>
      </div>
    </div>
    <div
      v-if="events.length % 3 === 0 || events.length === 1"
      class="hidden md:block"
    >
      <div class="h-8" />
      <p class="text-center">
        Any ideas for an event?
        <a href="mailto:berlin@architecturalnetworks.com">Let us know!</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.home-event-grid {
  display: grid;
  grid-gap: 1.25rem;
}
@screen md {
  .home-event-grid {
    grid-auto-rows: 1fr;
  }
}
ul.event-grid {
  display: grid;
  grid-gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
