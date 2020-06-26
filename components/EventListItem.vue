<template>
  <article
    class="w-full h-full bg-white shadow-lg"
    :class="event.status === 'Past' ? 'past-event-card' : 'future-event-card'"
  >
    <figure id="image" class="overflow-hidden">
      <a
        :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${event.meetupId}/`"
        target="blank"
        class="no-underline"
      >
        <img :src="imageURL" class="object-cover w-full h-full"
      /></a>
    </figure>
    <main class="p-4">
      <div id="type-date" class="flex justify-between pb-3 font-logo">
        <event-type :type="event.type" />
        <p class="text-red-600">
          {{ $dateFns.format(new Date(event.date), dateFormat) }}
        </p>
      </div>

      <div id="title">
        <h3 class="font-bold">
          <a
            :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${event.meetupId}/`"
            target="blank"
            >{{ event.title }}</a
          >
        </h3>
        <div v-if="event.status === 'Future'" class="hidden sm:block">
          <v-clamp autoresize :max-lines="2">{{ event.subtitle }}</v-clamp>
        </div>
      </div>
      <div id="location" :class="{ 'text-sm': event.status === 'Past' }">
        <div class="h-4" />
        <p>
          <span v-if="event.onlineEvent"
            ><icon-video class="w-4 h-4" /> Online Event</span
          >
          <span v-else
            ><icon-location
              class="w-4 h-4"
              :class="{ 'pb-1': event.status === 'Past' }"
            />{{ event.location }}</span
          >
        </p>
      </div>
    </main>
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
      imageURL: `${process.env.NUXT_ENV_CLOUDINARY_BASE_URL}/ar_1.5,c_crop,dpr_auto,f_auto,g_center${this.event.image}`,
      dateFormat: this.event.status === 'Past' ? 'd.M.yy' : 'd.M H:m', // 'MMM do H:m',
    }
  },
}
</script>

<style scoped>
article {
  display: grid;
  grid-template-rows: auto 1fr;
}
main {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
