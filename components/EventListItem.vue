<template>
  <article class="w-full h-full bg-white shadow-lg">
    <div id="image" class="overflow-hidden">
      <img :src="imageURL" class="object-cover w-full h-full" />
    </div>

    <div id="type-date" class="flex justify-between px-4 pt-4 pb-3 font-logo">
      <event-type :type="event.type" />
      <p class="text-red-600">
        {{ $dateFns.format(new Date(event.date), dateFormat) }}
      </p>
    </div>

    <div id="title" class="px-4 pb-4">
      <h3 class="font-bold">
        <a
          :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${event.meetupId}/`"
          target="blank"
          >{{ event.title }}</a
        >
      </h3>
      <div v-if="event.status === 'Future'" class="hidden text-sm sm:block">
        <v-clamp autoresize :max-lines="2">{{ event.subtitle }}</v-clamp>
      </div>
      <div v-else class="h-4" />
    </div>
    <div v-if="event.status === 'Future'" id="location" class="px-4 pb-4">
      <p>
        <span v-if="event.onlineEvent"
          ><icon-video class="w-4 h-4" /> Online Event</span
        >
        <span v-else
          ><icon-location class="w-4 h-4" />{{ event.location }}</span
        >
        <!-- ·
        <span v-if="event.status === 'Past' && event.attendees"
          >{{ event.attendees }}+ attendees</span
        >
        <span v-else
          ><a
            :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${event.meetupId}/`"
            target="blank"
            >register</a
          ></span
        > -->
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
      dateFormat: this.event.status === 'Past' ? 'dd.MM.yy' : 'MMM do H:m',
    }
  },
}
</script>

<style scoped>
article {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 200px repeat(3, auto);
}
</style>
