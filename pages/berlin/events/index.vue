<template>
  <div>
    <section>
      <h1 class="text-4xl font-bold">
        Events<span class="font-normal text-red-600 font-logo"> next</span>
      </h1>
      <div class="h-6" />
      <template v-if="futureEvents">
        <event-list-item-next :event="futureEvents[0]" image-size="large" />
        <div class="h-4" />
        <event-list
          v-if="futureEvents.length > 1"
          :events="futureEvents.slice(1)"
        />
      </template>

      <div class="h-12" />
    </section>
    <section class="bg-gray-100 full-width">
      <div class="max-w-4xl px-4 mx-auto sm:px-8">
        <div class="h-10" />
        <h2 class="text-2xl font-bold">
          Events<span class="font-normal text-red-600 font-logo"> past</span>
        </h2>
        <div class="h-2" />

        <!-- <aside>
            <ul class="flex justify-end space-x-4 text-sm text-gray-600">
              <li v-for="year in years" :key="year">
                <button
                  class="font-bold cursor-pointer hover:underline focus:outline-none focus:underline"
                  :class="{ 'underline text-black': year === selectedYear }"
                  @click="loadEvents(year)"
                >
                  {{ year }}
                </button>
              </li>
            </ul>
            <div class="h-4" />
          </aside> -->
        <template v-if="pastEvents">
          <event-list :events="pastEvents" :is-past="true" />
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
  // computed: {
  //   yearEvents() {
  //     return this.pastEvents.filter((event) => {
  //       const eventDate = new Date(event.date)
  //       const eventYear = eventDate.getFullYear()
  //       return eventYear === this.selectedYear
  //     })
  //   },
  //   years() {
  //     const allYears = this.pastEvents.map((event) => {
  //       const date = new Date(event.date)
  //       return date.getFullYear()
  //     })
  //     return [...new Set(allYears)]
  //   },
  // },
  // methods: {
  //   loadEvents(year) {
  //     this.selectedYear = year
  //   },
  // },
}
</script>
