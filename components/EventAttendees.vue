<template>
  <p>
    <icon-people class="w-4 h-4" />
    <a
      :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${meetupId}/`"
      target="_blank"
      rel="noopener noreferrer"
      >{{ attendees }} attendees</a
    >
  </p>
</template>

<script>
export default {
  props: {
    meetupId: {
      type: String,
      default: '',
    },
    attendees: {
      type: String,
      default: '10',
    },
  },
}
</script>

<style scoped></style>
