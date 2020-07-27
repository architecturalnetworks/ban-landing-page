<template>
  <div>
    <nav class="mb-2 text-xs">
      <ul class="flex space-x-2">
        <li><nuxt-link to="/berlin">Home</nuxt-link></li>
      </ul>
    </nav>
    <section>
      <h1 class="font-bold">
        Events<span class="font-normal text-red-600 font-logo"> next</span>
      </h1>
      <div class="h-6" />
      <template
        v-if="state.matches('fetched') && state.context.futureEvents.length > 0"
      >
        <event-list-future :events="state.context.futureEvents" />
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

        <template
          v-if="state.matches('fetched') && state.context.pastEvents.length > 0"
        >
          <ul class="h-full past-events-grid">
            <li v-for="event in state.context.pastEvents" :key="event.id">
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
import { defineComponent, computed } from 'nuxt-composition-api'
import { eventMachineVue } from '@/fsm/EventMachine'
export default defineComponent({
  layout: 'pages',
  setup() {
    const state = computed(() => {
      return eventMachineVue.current
    })
    const context = computed(() => {
      return eventMachineVue.context
    })
    eventMachineVue.send({ type: 'FETCH_ALL' })
    return {
      state,
      context,
    }
  },
})
</script>

<style scoped>
ul.past-events-grid {
  display: grid;
  grid-gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
@screen sm {
  ul.past-events-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
