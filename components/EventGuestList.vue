<template>
  <section>
    <h2 class="font-bold">
      <span v-if="guests.length === 1">Guest</span><span v-else>Guests</span>
    </h2>
    <div class="h-4" />
    <ul class="space-y-4">
      <li v-for="guest in guests" :key="guest._uid">
        <event-guest-list-item :guest="guest" />
      </li>
    </ul>
  </section>
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
