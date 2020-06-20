<template>
  <article class="w-full h-full bg-white shadow-lg">
    <div id="image" class="overflow-hidden">
      <img :src="imageURL" class="object-cover w-full h-full" />
    </div>

    <div class="flex flex-col py-2 pr-2 sm:py-4 sm:pr-6">
      <div class="flex justify-between font-logo">
        <event-type :type="event.type" />
        <p>
          {{ $dateFns.format(new Date(event.date), 'MMM do') }}
        </p>
      </div>

      <div id="text">
        <div class="hidden block h-2 sm:block" />
        <h3 class="font-bold">
          <a
            :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${event.meetupId}/`"
            target="blank"
            >{{ event.title }}</a
          >
        </h3>
        <div class="hidden text-sm sm:block">
          <v-clamp autoresize :max-lines="2">{{ event.subtitle }}</v-clamp>
          <div class="h-4" />
        </div>
      </div>
      <p class="mt-auto text-xs tracking-wide text-gray-600 uppercase">
        <span v-if="event.onlineEvent">Online Event</span>
        <span v-else>{{ event.location }}</span>
        ·
        <span v-if="event.status === 'Past' && event.attendees"
          >{{ event.attendees }}+ attendees</span
        >
        <span v-else
          ><a
            :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${event.meetupId}/`"
            target="blank"
            >register</a
          ></span
        >
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
      imageURL: `${process.env.NUXT_ENV_CLOUDINARY_BASE_URL}/c_fill,dpr_auto,f_auto,g_center,w_272${this.event.image}`,
    }
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
