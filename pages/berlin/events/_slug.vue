<template>
  <div class="sandwich-grid">
    <!-- BREADCRUMBS  -->
    <nav class="mb-2 text-xs">
      <ul class="flex space-x-2">
        <li><nuxt-link to="/berlin">Home</nuxt-link></li>
        <li>·</li>
        <li><nuxt-link to="/berlin/events">Events</nuxt-link></li>
      </ul>
    </nav>
    <!-- LOADING  -->
    <div>
      <template v-if="event">
        <!-- TITLE  -->
        <section class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">
            {{ event.content.title }}
          </h1>
        </section>
        <div class="h-6" />
        <!-- IMAGE  -->
        <section>
          <img :src="imageURL" class="object-cover w-full h-full" />
        </section>
        <div class="h-4" />
        <!-- EVENT  -->
        <section class="space-y-8 md:flex md:space-x-8 md:space-y-0">
          <!-- DESCRIPTION  -->
          <article class="prose md:w-2/3">
            <div v-html="$md.render(event.content.description)" />
          </article>
          <!-- SIDEBAR  -->
          <aside class="md:pt-6 md:w-1/3">
            <!-- DETAILS  for larger screens-->
            <section
              class="hidden px-4 py-6 mb-12 overflow-hidden border border-red-600 md:block"
            >
              <div>
                <event-type :type="event.content.type" />
                <div class="pl-4">
                  <event-date
                    :date="event.content.date"
                    class="mb-4 text-black"
                    :is-long="true"
                  />
                  <event-location
                    :location="event.content.location"
                    class="mb-8 text-sm"
                  />
                </div>
                <event-register
                  v-if="eventIsFuture"
                  :meetup-id="event.content.meetup_id"
                  class="-mx-4 -mb-6"
                />
                <event-attendees
                  v-else-if="event.content.attendees"
                  :meetup-id="event.content.meetup_id"
                  :attendees="event.content.attendees"
                  class="ml-4 -mt-8 text-sm"
                />
              </div>
            </section>
            <!-- GUESTS  -->
            <event-guest-list
              v-if="event.content.guests && event.content.guests.length"
              :guests="event.content.guests"
              class="mb-12"
            />

            <!-- RESOURCES  -->
            <event-resource-list
              v-if="
                event.content.resources && event.content.resources.length > 0
              "
              :resources="event.content.resources"
            />
            <!-- DETAILS for smaller screens, hidden from md breakpoint  -->
            <section
              class="p-4 my-8 overflow-hidden border border-red-600 md:hidden"
            >
              <div class="flex justify-between">
                <div>
                  <event-type :type="event.content.type" />

                  <event-date
                    :date="event.content.date"
                    class="ml-4 text-black"
                    :is-long="true"
                  />
                  <event-location
                    :location="event.content.location"
                    class="mt-4 mb-6 ml-4"
                    v-if="eventIsFuture"
                  />
                </div>
                <div>
                  <event-location
                    :location="event.content.location"
                    class="text-sm"
                    v-if="!eventIsFuture"
                  />

                  <event-attendees
                    v-if="!eventIsFuture && event.content.attendees"
                    :meetup-id="event.content.meetup_id"
                    :attendees="event.content.attendees"
                    class="text-sm"
                  />
                </div>
              </div>
              <event-register
                v-if="eventIsFuture"
                :meetup-id="event.content.meetup_id"
                class="-mx-4 -mb-4"
              />
            </section>
          </aside>
        </section>
        <div class="h-12" />
        <!-- PAGINATION  -->
        <!-- <section class="my-8">
          <nav>
            <ul class="flex justify-between">
              <li>
                <nuxt-link v-if="nextEventSlug" :to="nextEventSlug"
                  >&lt; Previous</nuxt-link
                >
              </li>
              <li>
                <nuxt-link v-if="previousEventSlug" :to="previousEventSlug"
                  >Next &gt;</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </section> -->
      </template>
      <template v-else>
        <spinner />
      </template>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  useAsync,
  useContext,
  useMeta,
  ref,
} from '@nuxtjs/composition-api'
import { isFuture } from 'date-fns'
import { createSEOMeta } from '~/utils/seo'
import useCloudinaryURL from '~/use/cloudinaryURL'
export default defineComponent({
  layout: 'pages',
  head: {},
  setup() {
    const {
      route,
      app: { $storyapi },
    } = useContext()

    const imageURL = ref('')
    const eventIsFuture = ref('')
    // const nextEventSlug = ref('')
    // const previousEventSlug = ref('')

    const slug = route.value.path.replace('/berlin/events/', '')

    const event = useAsync(async () => {
      // Get the slug from the route
      const res = await $storyapi.get('cdn/stories', {
        starts_with: 'events/',
        by_slugs: '*/' + slug,
      })
      const ev = res.data.stories[0]

      imageURL.value = useCloudinaryURL(
        ev.content.main_image.filename,
        'ar_1.5,c_crop,dpr_auto,f_auto,g_center'
      )
      eventIsFuture.value = isFuture(new Date(ev.content.date))
      return ev
    })

    useMeta({
      title: event.title,
      meta: createSEOMeta({
        description: event.summary,
        image: imageURL,
      }),
    })
    return {
      event,
      imageURL,
      eventIsFuture,
    }
  },
})
// function getEventIndex(currentEventSlug, paginationEvents) {
//   return paginationEvents.findIndex((evt) => evt.slug === currentEventSlug)
// }
// function getNextEventSlug(currentEventIndex, paginationEvents) {
//   if (!paginationEvents || currentEventIndex === paginationEvents.length - 1)
//     return null
//   return paginationEvents[currentEventIndex + 1].slug
// }
// function getPreviousEventSlug(currentEventIndex, paginationEvents) {
//   if (currentEventIndex === 0) return null
//   return paginationEvents[currentEventIndex - 1].slug
// }
</script>

<style scoped>
.nuxt-content p {
  @apply mb-4;
}
</style>
