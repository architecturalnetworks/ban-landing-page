<template>
  <p class="text-red-600 font-logo">
    {{ $dateFns.format(new Date(parsedDate), dateFormat) }}
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
    parsedDate() {
      // deepcode ignore GlobalReplacementRegex: there is only one T in the string, always
      return this.date.includes('T') ? this.date : this.date.replace(' ', 'T')
    },
    dateFormat() {
      return this.showTime ? 'd.M · H:mm' : 'd.M.yy'
    },
  },
}
</script>

<style lang="scss" scoped></style>
