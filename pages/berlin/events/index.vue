<template>
  <div>
    <h1 class="text-4xl font-bold">
      Events<span class="font-normal text-red-600 font-logo"> next</span>
    </h1>
    <div class="h-8" />
    <template v-if="futureEvents">
      <event-list-item-next :event="futureEvents[0]" />
      <event-list v-if="futureEvents.length > 1" :events="futureEvents" />
    </template>
      <div class="h-8" />
      <p class="pl-4">
        Any ideas for an event?
        <a href="mailto:berlin@architecturalnetworks.com">Let us know!</a>
      </p>
      <div class="h-12" />
    <h2 class="text-2xl font-bold">
      Events<span class="font-normal text-red-600 font-logo"> past</span>
    </h2>
    <div class="h-6" />
    <div class="">
      <aside>
        <ul class="flex justify-end space-x-4 text-sm text-gray-600 font-logo">
          <li v-for="year in years" :key="year">
            <button
              class="cursor-pointer hover:underline focus:outline-none focus:underline"
              :class="{ 'underline text-black': year === selectedYear }"
              @click="loadEvents(year)"
            >
              {{ year }}
            </button>
          </li>
        </ul>
        <div class="h-4" />
      </aside>
      <template v-if="yearEvents">
        <event-list :events="yearEvents" />
      </template>
    </div>
    <div class="h-8" />
  </div>
</template>

<script>
export default {
  layout: 'pages',
  async asyncData({ $content }) {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const futureEvents = await $content('events')
      .where({
        publish: true,
        date: { $gt: yesterday },
      })
      .sortBy('date')
      .fetch()
    const pastEvents = await $content('events')
      .where({
        publish: true,
        date: { $lt: today },
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
  computed: {
    yearEvents() {
      return this.pastEvents.filter((event) => {
        const eventDate = new Date(event.date)
        const eventYear = eventDate.getFullYear()
        return eventYear === this.selectedYear
      })
    },
    years() {
      const allYears = this.pastEvents.map((event) => {
        const date = new Date(event.date)
        return date.getFullYear()
      })
      return [...new Set(allYears)]
    },
  },
  methods: {
    loadEvents(year) {
      this.selectedYear = year
    },
  },
}
</script>
