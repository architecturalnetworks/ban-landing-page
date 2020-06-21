<template>
  <article class="bg-white shadow-lg event-card">
    <figure id="image" class="overflow-hidden">
      <img :src="imageURL" class="object-cover w-full h-full" />
    </figure>

    <div id="type-date" class="flex justify-between p-4">
      <event-type :type="event.type" />
      <p class="text-right text-red-600 font-logo">
        {{ $dateFns.format(new Date(event.date), 'MMM do H:m') }}
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
      <p>{{ event.subtitle }}</p>
    </div>
    <div id="summary" class="hidden px-4 pb-4 md:block">
      <p>{{ event.summary }}</p>
    </div>
    <div id="location" class="px-4 pb-6">
      <p v-if="event.onlineEvent">
        <icon-video class="w-4 h-4" /> Online Event
      </p>
      <p v-else><icon-location class="w-4 h-4" /> {{ event.location }}</p>
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
      imageURL: `${process.env.NUXT_ENV_CLOUDINARY_BASE_URL}/ar_1.5,c_fill,dpr_auto,f_auto,g_center,w_832${this.event.image}`,
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

@screen md {
  article {
    grid-template-columns: 200px 1fr;
    grid-template-rows: repeat(4, auto);
    grid-template-areas: 'image type-date' 'image title' 'image summary' 'image location';
  }
  #image {
    grid-area: image;
  }
  #type-date {
    grid-area: type-date;
  }
  #title {
    grid-area: title;
  }
  #summary {
    grid-area: summary;
  }
  #location {
    grid-area: location;
  }
}
</style>
