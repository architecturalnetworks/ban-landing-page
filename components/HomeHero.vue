<template>
  <div
    class="flex items-center justify-center max-w-3xl mx-auto space-x-12 text-lg text-red-600 font-logo sm:text-xl"
  >
    <home-dot :version="dotVersion" />
    <div class="hidden text-black md:block">
      <p>|</p>
      <p><span class="text-red-600">&middot; b</span>erlin</p>
      <p>| <span class="text-red-600">a</span>rchitecture</p>
      <p>| <span class="text-red-600">n</span>etwork</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dotVersion: 0,
    }
  },
  mounted() {
    this.dotVersion = this.getRndInteger(0, 4)
  },
  methods: {
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
  },
}
</script>

<style lang="scss" scoped></style>
