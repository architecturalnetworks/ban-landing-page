<template>
  <article class="bg-white shadow">
    <div id="image" class="">
      <img class="object-cover w-full h-full" :src="image" />
    </div>
    <div class="py-4 pr-4">
      <div class="flex justify-between mb-4 font-logo">
        <p>
          <span class="-ml-2 text-red-600">&middot;ban</span>{{ event.type }}
        </p>
        <p>
          <a :href="event.meetupURL" class="no-underline">
            {{ $dateFns.format(new Date(event.date), 'MMM do') }}</a
          >
        </p>
      </div>

      <div id="text">
        <h3 class="font-bold">
          <a :href="event.meetupURL">{{ event.title }}</a>
        </h3>
        <p class="mb-4 text-sm">{{ event.subtitle }}</p>
        <p class="text-xs tracking-wide text-gray-600 uppercase">
          Online Event · 17+ atendees
        </p>
      </div>
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
