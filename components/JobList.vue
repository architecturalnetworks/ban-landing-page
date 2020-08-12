<template>
  <div>
    <ul class="space-y-4">
      <li v-for="job in jobs" :key="job.id">
        <div>
          <strong>{{ job.title }}</strong
          ><br />
          @ {{ job.company }}
        </div>
        <div class="text-sm">
          {{
            $dateFns.formatDistanceToNow(new Date(job.date), {
              addSuffix: true,
            })
          }}
          on
          <a :href="job.url" target="_blank"
            >{{ uppercaseFirst(job.site) }} →</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed } from 'nuxt-composition-api'

import { jobsMachineVue } from '~/fsm/jobsMachine'

export default defineComponent({
  setup() {
    const state = computed(() => {
      return jobsMachineVue.current
    })
    const jobs = computed(() => {
      return jobsMachineVue.context.jobs
    })
    jobsMachineVue.send({ type: 'FETCH_LATEST' })
    function uppercaseFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return {
      state,
      jobs,
      uppercaseFirst,
    }
  },
})
</script>

<style lang="scss" scoped></style>
