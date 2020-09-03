<template>
  <div>
    <a
      :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${meetupId}/`"
      target="blank"
      class="flex items-center justify-center w-full px-2 py-1 space-x-2 tracking-wide text-white uppercase bg-red-600 shadow font-logo btn-link"
      rel="noopener noreferrer"
    >
      <span>register</span><icon-external-link class="w-4 h-4 mb-1" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    meetupId: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped></style>
