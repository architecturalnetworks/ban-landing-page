<template>
  <article class="w-full h-full">
    <div id="image" class="overflow-hidden">
      <img class="object-cover w-full h-full" :src="image" />
    </div>

    <div class="flex flex-col py-2 pr-2 sm:py-4 sm:pr-4">
      <div class="flex justify-between font-logo">
        <p>
          <span class="-ml-2 text-red-600">&middot;ban</span>{{ event.type }}
        </p>
        <p>
          {{ $dateFns.format(new Date(event.date), 'MMM do') }}
        </p>
      </div>

      <div id="text">
        <div class="hidden block h-2 sm:block" />
        <h3 class="font-bold">
          <a
            :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${event.meetupId}/`"
            >{{ event.title }}</a
          >
        </h3>
        <div class="hidden sm:block">
          <p class="text-sm">
            <v-clamp autoresize :max-lines="2">{{ event.subtitle }}</v-clamp>
          </p>
          <div class="h-4" />
        </div>
      </div>
      <p class="mt-auto text-xs tracking-wide text-gray-600 uppercase">
        <span v-if="event.onlineEvent">Online Event</span>
        <span v-else>{{ event.location }}</span>
        ·
        <span v-if="isPastEvent && event.attendees"
          >{{ event.attendees }}+ attendees</span
        >
        <span v-else>register</span>
      </p>
    </div>
  </article>
</template>

<script>
import VClamp from 'vue-clamp'
export default {
  components: {
    VClamp,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
    showText: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      image: require(`~/${this.event.image}`),
    }
  },
  computed: {
    isPastEvent() {
      const today = new Date()
      return today > new Date(this.event.date)
    },
  },
}
</script>

<style scoped>
article {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 2fr;
}
</style>
