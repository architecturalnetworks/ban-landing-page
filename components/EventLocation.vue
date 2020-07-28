<template>
  <div id="location">
    <p v-if="location"><icon-location class="w-4 h-4" /> {{ location }}</p>
    <p v-else><icon-video class="w-4 h-4" /> Online Event</p>
  </div>
</template>

<script>
export default {
  props: {
    location: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
