<template>
  <ul class="space-y-4">
    <li v-for="guest in guests" :key="guest._uid">
      <event-guest-list-item :guest="guest" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    guests: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped></style>
