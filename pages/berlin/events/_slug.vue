<template>
  <div>
    <nav class="mb-2 text-xs">
      <ul class="flex space-x-2">
        <li><nuxt-link to="/berlin">Home</nuxt-link></li>
        <li>·</li>
        <li><nuxt-link to="/berlin/events">Events</nuxt-link></li>
      </ul>
    </nav>
    <template v-if="state.matches('fetchingOne')">
      <!-- TODO: implement loading animation -->
      <p>Loading...</p>
    </template>
    <template v-else>
      <section class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">
          {{ context.event.content.title }}
        </h1>
      </section>
      <div class="h-6" />
      <section>
        <img :src="imageURL" class="object-cover w-full h-full" />
      </section>
      <div class="h-4" />
      <section class="flex space-x-8">
        <article class="w-2/3 prose">
          <div v-html="$md.render(context.event.content.description)" />
        </article>

        <aside class="w-1/3">
          <div class="h-6" />
          <section v-if="eventIsFuture" name="register-cta">
            <a
              :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${context.event.content.meetup_id}/`"
              target="blank"
              class="flex items-center justify-center w-full h-10 p-1 space-x-2 text-lg tracking-wide text-white uppercase bg-red-600 shadow font-logo sm:h-12 sm:text-lg btn-link"
            >
              <span>I'm in!</span><icon-external-link class="w-4 h-4 mb-1" />
            </a>
            <p class="text-sm text-center">
              RSVP on meetup.com
            </p>
            <div class="h-6" />
            <hr />
            <div class="h-6" />
          </section>
          <section>
            <h2 class="font-bold">Details</h2>
            <div class="h-4" />
            <event-type :type="context.event.content.type" />
            <div class="pl-4">
              <event-date
                :date="context.event.content.date"
                class="text-black"
                :is-long="true"
              />
              <event-location :location="context.event.content.location" />
            </div>
          </section>
          <div class="h-12" />

          <!-- GUESTS  -->
          <event-guest-list
            v-if="
              context.event.content.guests &&
              context.event.content.guests.length
            "
            :guests="context.event.content.guests"
          />
          <div class="h-12" />

          <!-- RESOURCES  -->
          <event-resource-list
            v-if="context.event.content.resources.length > 0"
            :resources="context.event.content.resources"
          />
        </aside>
      </section>
      <div class="h-12" />
    </template>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  useContext,
  ref,
  watch,
} from 'nuxt-composition-api'
import { isFuture } from 'date-fns'
import { eventMachineVue } from '~/fsm/eventMachine.js'
import useCloudinaryURL from '~/use/cloudinaryURL'
export default defineComponent({
  layout: 'pages',
  setup() {
    const { route } = useContext()
    const state = computed(() => {
      return eventMachineVue.current
    })
    const context = computed(() => {
      return eventMachineVue.context
    })
    const imageURL = ref('')
    const eventIsFuture = ref('')
    watch(context, (context, _) => {
      if (context.event) {
        imageURL.value = useCloudinaryURL(
          context.event.content.main_image.filename,
          'ar_1.5,c_crop,dpr_auto,f_auto,g_center'
        )
        eventIsFuture.value = isFuture(new Date(context.event.content.date))
      }
    })

    const fullSlug = route.value.path.replace('/berlin/', '')
    eventMachineVue.send({ type: 'FETCH_ONE', params: { id: fullSlug } })
    return {
      state,
      context,
      imageURL,
      eventIsFuture,
    }
  },
})
</script>

<style scoped>
.nuxt-content p {
  @apply mb-4;
}
</style>
