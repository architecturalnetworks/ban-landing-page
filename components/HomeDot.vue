<template>
  <div
    class="flex items-center justify-center w-40 h-40 text-2xl text-white bg-red-600 rounded-full font-logo"
  >
    <div v-if="version === 0">
      <p>&nbsp;[]&nbsp;</p>
      <p>[++]</p>
      <p>/&nbsp;&nbsp;\</p>
    </div>
    <div v-else-if="version === 1">
      <p>\[]/</p>
      <p>&nbsp;--&nbsp;</p>
      <p>/&nbsp;&nbsp;\</p>
    </div>
    <div v-else-if="version === 2">
      <p>&nbsp;&nbsp;[]&nbsp;</p>
      <p>&nbsp;/--&nbsp;</p>
      <p>[*]&nbsp;\</p>
    </div>
    <div v-else-if="version === 3">
      <p>&nbsp;[]&nbsp;</p>
      <p>&lt;\/&gt;</p>
      <p>/&nbsp;&nbsp;\</p>
    </div>
    <div v-else>
      <p>&nbsp;[]&nbsp;</p>
      <p>&lt;--&gt;</p>
      <p>/&nbsp;&nbsp;\</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    version: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped></style>
