<template>
  <ul>
    <li v-for="event in events" :key="event.slug">
      <event-list-item :event="event" />
    </li>
    <li
      v-if="!isPast"
      class="flex flex-col items-center justify-center p-4 bg-white border"
    >
      Any ideas for an event?<br />
      <a href="mailto:berlin@architecturalnetworks.com">Let us know!</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      required: true,
    },
    isPast: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
ul {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>
