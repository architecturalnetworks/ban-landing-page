<template>
  <article class="bg-white shadow event-card">
    <div id="image">
      <img class="object-cover w-full h-full" :src="image" />
    </div>

    <div
      id="datetime"
      class="flex items-center justify-center p-2 bg-white border border-black cursor-pointer hover:text-red-600 mouse-pointer"
    >
      <p class="text-center font-logo">
        <a
          :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${event.meetupId}/`"
          class="no-underline"
        >
          {{ $dateFns.format(new Date(event.date), 'MMM do') }}<br />
          {{ $dateFns.format(new Date(event.date), 'H:m') }}</a
        >
      </p>
    </div>
    <div id="text" class="py-6 pr-6">
      <p class="-ml-2 font-logo">
        <span class="text-red-600">&middot;ban</span>{{ event.type }}
      </p>
      <h3 class="font-bold">
        <a
          :href="`https://www.meetup.com/BAN-Berlin-Architectural-Network/events/${event.meetupId}/`"
          >{{ event.title }}</a
        >
      </h3>
      <p>{{ event.subtitle }}</p>
      <div class="h-4" />
      <p>{{ event.summary }}</p>
      <div class="h-4" />
      <p class="text-right font-logo">
        <nuxt-link to="berlin/events">read more ></nuxt-link>
      </p>
    </div>
    <div id="ban-people" class="hidden text-red-600 font-logo">
      ( Help, job application!) v v [] [] /-- &lt;\/&gt; [*] \ / \
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
  grid-template-columns: 1.5rem 100px 1rem 1fr;
  grid-template-rows: repeat(2, 100px) 1rem 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

#text {
  grid-area: 4 / 2 / 5 / 5;
}
#image {
  grid-area: 1 / 1 / 4 / 5;
}
#datetime {
  grid-area: 2 / 2 / 3 / 3;
}
#ban-people {
  grid-area: 4 / 2 / 5 / 3;
}
</style>
