<template>
  <article
    class="w-full h-full bg-white shadow-lg"
    :class="eventIsPast ? 'past-event-card' : 'future-event-card'"
  >
    <figure id="image" class="overflow-hidden">
      <nuxt-link :to="`/berlin/events/${event.slug}`" class="no-underline"
        ><img :src="imageURL" class="object-cover w-full h-full"
      /></nuxt-link>
    </figure>
    <main class="p-4">
      <div id="type-date" class="flex justify-between pb-3 font-logo">
        <event-type :type="content.type" />
        <event-date :date="content.date" :show-time="!eventIsPast" />
      </div>

      <div id="title">
        <h3 class="font-bold">
          <!-- <a
          :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${content.meetupId}/`"
          target="blank"
          >{{ content.title }}</a
        > -->
          <nuxt-link
            :to="`/berlin/events/${event.slug}`"
            class="no-underline"
            >{{ content.title }}</nuxt-link
          >
        </h3>
        <div v-if="!eventIsPast" class="hidden sm:block">
          <v-clamp autoresize :max-lines="2">{{ content.subtitle }}</v-clamp>
        </div>
      </div>
      <div id="location" :class="{ 'text-sm': eventIsPast }">
        <div class="h-4" />
        <p>
          <span v-if="content.is_online"
            ><icon-video class="w-4 h-4" /> Online Event</span
          >
          <span v-else
            ><icon-location
              class="w-4 h-4"
              :class="{ 'pb-1': eventIsPast }"
            />{{ content.location }}</span
          >
        </p>
      </div>
    </main>
  </article>
</template>

<script>
import VClamp from 'vue-clamp'
import { defineComponent } from 'nuxt-composition-api'
import { isPast } from 'date-fns'
import useCloudinaryURL from '@/use/cloudinaryURL'

export default defineComponent({
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
  components: {
    VClamp,
  },
  setup(props) {
    const { content } = props.event
    const imageURL = useCloudinaryURL(
      content.main_image.filename,
      'ar_1.5,c_crop,dpr_auto,f_auto,g_center'
    )
    const eventIsPast = isPast(new Date(content.date))
    return {
      imageURL,
      eventIsPast,
      content,
    }
  },
})
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
