<template>
  <div class="h-full sandwich-grid">
    <!-- BREADCRUMBS  -->
    <nav class="mb-2 text-xs">
      <ul class="flex space-x-2">
        <li><nuxt-link to="/berlin">Home</nuxt-link></li>
      </ul>
    </nav>
    <!-- ONE WEEK JOBS  -->
    <section>
      <div>
        <h1 class="font-bold">
          Jobs<span class="font-normal text-red-600 font-logo"> this week</span>
        </h1>
        <!-- <div>
          Filter:
          <input
            type="text"
            class="p-2 text-black bg-white border border-black shadow-inner"
            placeholder="Start typing..."
            v-model="filter"
          />
        </div> -->
      </div>
      <div class="h-6" />
      <template v-if="fetchState.pending">
        <spinner />
      </template>
      <template v-else>
        <job-list :jobs="lastWeek" />
      </template>

      <div class="h-12" />
    </section>

    <!-- ONE MONTH  -->
    <section class="bg-gray-100 full-width">
      <div class="max-w-4xl px-4 mx-auto sm:px-8">
        <div class="h-10" />
        <h2 class="font-bold">
          Jobs<span class="font-normal text-red-600 font-logo"> older</span>
        </h2>
        <div class="h-6" />
        <template v-if="fetchState.pending">
          <spinner />
        </template>
        <template v-else>
          <job-list :jobs="lastMonth" />
        </template>
        <div class="h-10" />
      </div>
    </section>
  </div>
</template>

<script>
import {
  defineComponent,
  useMeta,
  // useAsync,
  // computed,
  ref,
  useFetch,
} from '@nuxtjs/composition-api'
import { createSEOMeta } from '~/utils/seo'
import { invokeFetchAll } from '~/use/fetchJobs'

export default defineComponent({
  layout: 'pages',
  head: {},
  setup() {
    useMeta({
      title: 'Jobs ·ban - Berlin Architectural Network',
      meta: createSEOMeta({
        description: 'Architecture jobs in Berlin.',
      }),
    })
    const filter = ref('')

    const lastWeek = ref([])
    const lastMonth = ref([])
    const { fetchState } = useFetch(async () => {
      const res = await invokeFetchAll()
      lastWeek.value = res.lastWeek
      lastMonth.value = res.lastMonth
    })

    // const lastWeekJobs = computed(() => {
    //   if (filter) {
    //     return lastWeek.value.filter((job) =>
    //       job.title.toLowerCase().includes(filter.value.toLowerCase())
    //     )
    //   }
    //   return lastWeek
    // })

    return {
      lastWeek,
      lastMonth,
      filter,
      fetchState,
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
