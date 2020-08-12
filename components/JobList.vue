<template>
  <div>
    <ul class="space-y-4">
      <li v-for="job in jobs" :key="job.id" class="flex space-x-4">
        <div class="mt-2">
          <img
            v-if="job.image_url"
            :src="job.image_url"
            class="w-12 h-12 overflow-hidden rounded shadow"
          />
          <img
            v-else
            src="https://res.cloudinary.com/architecturalnetworks/image/upload/v1597225472/ban/slack_jobs_bot_image_small_gray_qcz1gx.png"
            class="w-12 h-12 overflow-hidden rounded shadow"
          />
        </div>
        <div>
          <strong>{{ job.title }}</strong
          ><br />
          @ {{ job.company }}
          <p class="text-sm">
            {{
              $dateFns.formatDistanceToNow(new Date(job.date), {
                addSuffix: true,
              })
            }}
            on
            <a :href="job.url" target="_blank"
              >{{ uppercaseFirst(job.site) }} →</a
            >
          </p>
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
