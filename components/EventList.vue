<template>
  <ul class="space-y-4">
    <li
      v-for="event in events"
      :key="event.slug"
      class="h-40 overflow-hidden bg-white shadow sm:h-56"
    >
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
