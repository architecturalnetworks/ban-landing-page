<template>
  <div>
    <h1 class="text-4xl font-bold">
      Events<span class="font-normal text-red-600 font-logo"> next</span>
    </h1>
    <div class="h-8" />
    <event-list-item-next :event="futureEvents[0]" />
    <event-list v-if="futureEvents.length > 1" :events="futureEvents" />
    <div class="h-10" />
    <h2 class="text-2xl font-bold">
      Events<span class="font-normal text-red-600 font-logo"> past</span>
    </h2>
    <div class="h-8" />
    <event-list :events="pastEvents" />
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
      .fetch()
    const pastEvents = await $content('events')
      .where({
        publish: true,
        date: { $lt: today },
      })
      .fetch()
    return {
      futureEvents,
      pastEvents,
    }
  },
}
</script>

<style lang="scss" scoped></style>
