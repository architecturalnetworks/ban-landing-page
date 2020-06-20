<template>
  <ul>
    <li v-for="event in events" :key="event.slug">
      <event-list-item :event="event" />
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
  },
}
</script>

<style scoped>
ul {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 200px;
}
</style>
