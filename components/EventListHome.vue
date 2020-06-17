<template>
  <div>
    <event-list-item-next :event="events[0]" />
    <ul v-if="events.length > 1" class="space-y-8">
      <li v-for="event in events.slice(1, -1)" :key="event.slug">
        <event-list-item :event="event" />
      </li>
    </ul>
    <div class="h-8" />
    <p class="pl-4">
      Any ideas for an event?
      <a href="mailto:berlin@architecturalnetworks.com">Let us know</a>!
    </p>
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
