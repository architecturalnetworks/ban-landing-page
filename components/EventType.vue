<template>
  <p class="font-logo">
    <span class="text-black font-logo">{{ symbol[type] }}</span
    ><logo-ban-text />{{ type }}
  </p>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'talks',
    },
  },
  data() {
    return {
      symbol: {
        talks: '−',
        networking: '·',
        walks: '<',
        workshop: '×',
      },
    }
  },
}
</script>

<style scoped></style>
