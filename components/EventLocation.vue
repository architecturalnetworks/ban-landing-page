<template>
  <div id="location" class="px-4 pb-6 md:pl-0">
    <p v-if="location"><icon-location class="w-4 h-4" /> {{ location }}</p>
    <p v-else><icon-video class="w-4 h-4" /> Online Event</p>
  </div>
</template>

<script>
export default {
  location: {
    type: String,
    default: null,
  },
}
</script>

<style lang="scss" scoped></style>
