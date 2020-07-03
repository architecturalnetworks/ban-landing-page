<template>
  <div>
    <section>
      <h1 class="font-bold">
        Events<span class="font-normal text-red-600 font-logo"> next</span>
      </h1>
      <div class="h-6" />
      <template v-if="futureEvents">
        <event-list-future :events="futureEvents" />
      </template>

      <div class="h-12" />
    </section>
    <section class="bg-gray-100 full-width">
      <div class="max-w-4xl px-4 mx-auto sm:px-8">
        <div class="h-10" />
        <h2 class="font-bold">
          Events<span class="font-normal text-red-600 font-logo"> past</span>
        </h2>
        <div class="h-6" />

        <template v-if="pastEvents">
          <ul class="h-full past-events-grid">
            <li v-for="event in pastEvents" :key="event.slug">
              <event-list-item :event="event" />
            </li>
          </ul>
        </template>

        <div class="h-10" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'pages',
  async asyncData({ $content }) {
    const futureEvents = await $content('events')
      .where({
        publish: true,
        status: 'Future',
      })
      .sortBy('date')
      .fetch()
    const pastEvents = await $content('events')
      .where({
        publish: true,
        status: 'Past',
      })
      .sortBy('date', 'desc')
      .fetch()
    return {
      futureEvents,
      pastEvents,
    }
  },
  data() {
    return {
      today: new Date(),
      selectedYear: new Date().getFullYear(),
    }
  },
}
</script>

<style scoped>
ul.past-events-grid {
  display: grid;
  grid-gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
@screen sm {
  ul.past-events-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
