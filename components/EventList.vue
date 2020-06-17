<template>
  <ul class="space-y-4">
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

<style scoped></style>
