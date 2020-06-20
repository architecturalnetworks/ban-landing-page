<template>
  <article class="bg-white shadow-lg event-card">
    <figure id="image" class="overflow-hidden">
      <img :src="imageURL" class="object-cover w-full h-full" />
    </figure>

    <div id="datetime" class="p-6">
      <p class="text-right font-logo">
        {{ $dateFns.format(new Date(event.date), 'MMM do') }}<br />
        {{ $dateFns.format(new Date(event.date), 'H:m') }}
      </p>
    </div>
    <div id="text" class="p-6">
      <event-type :type="event.type" />
      <div class="hidden block h-2 sm:block" />
      <h3 class="font-bold">
        <a
          :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${event.meetupId}/`"
          target="blank"
          >{{ event.title }}</a
        >
      </h3>
      <p>{{ event.subtitle }}</p>
    </div>
    <div id="summary" class="px-6 pb-6 text-sm">
      <p>{{ event.summary }}</p>
      <div class="h-4" />
      <p class="text-sm text-right">
        <a
          :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${event.meetupId}/`"
          target="blank"
          >read more &rarr;</a
        >
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
  },
  data() {
    return {
      imageURL: `${process.env.NUXT_ENV_CLOUDINARY_BASE_URL}/c_fill,dpr_auto,f_auto,g_center,w_832${this.event.image}`,
    }
  },
}
</script>

<style scoped>
article {
  display: grid;
  grid-template-columns: 1fr 150px;
  grid-template-rows: 300px repeat(2, auto);
  grid-template-areas: 'image image' 'title datetime' 'summary summary';
}

#image {
  grid-area: image;
}

#title {
  grid-area: title;
}

#datetime {
  grid-area: datetime;
}

#summary {
  grid-area: summary;
}
</style>
