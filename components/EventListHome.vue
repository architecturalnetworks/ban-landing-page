<template>
  <div>
    <event-list-item-next :event="events[0]" />
    <div class="h-4" />
    <ul v-if="events.length > 1" class="space-y-4">
      <li v-for="event in events.slice(1)" :key="event.slug">
        <event-list-item :event="event" />
      </li>
    </ul>
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

<style scoped></style>
