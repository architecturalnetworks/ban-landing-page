<template>
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
        <event-list :events="events.slice(1)" />
      </div>
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
  grid-auto-rows: 1fr;
  grid-gap: 1.25rem;
}
</style>
