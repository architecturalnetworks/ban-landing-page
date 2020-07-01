<template>
  <p class="text-red-600 font-logo">
    {{ $dateFns.format(new Date(date), dateFormat) }}
  </p>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    showTime: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    dateFormat() {
      return this.showTime ? 'd.M · H:mm' : 'd.M.yy'
    },
  },
}
</script>

<style lang="scss" scoped></style>
