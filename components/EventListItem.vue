<template>
  <article class="h-40 bg-white shadow sm:h-56">
    <div id="image" class="">
      <img class="object-cover w-full h-full" :src="image" />
    </div>

    <div class="flex flex-col py-2 pr-2 sm:py-4 sm:pr-4">
      <div class="flex justify-between sm:mb-2 font-logo">
        <p>
          <span class="-ml-2 text-red-600">&middot;ban</span>{{ event.type }}
        </p>
        <p>
          <a
            :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${event.meetupId}/`"
            class="no-underline"
          >
            {{ $dateFns.format(new Date(event.date), 'MMM do') }}</a
          >
        </p>
      </div>

      <div id="text">
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
      <p class="mt-auto text-xs tracking-wide text-gray-600 uppercase">
        Online Event · 17+ attendees
      </p>
    </div>
  </article>
</template>

<script>
export default {
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
}
</script>

<style scoped>
article {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 2fr;
}
</style>
