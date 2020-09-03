<template>
  <div>
    <template v-if="jobs">
      <ul class="space-y-6">
        <li v-for="job in jobs" :key="job.id" class="flex space-x-4">
          <div class="flex-none w-12 mt-2">
            <img
              v-if="job.image_url"
              :src="job.image_url"
              :onerror="`this.onerror=null; this.src='${defaultLogo}'`"
              class="object-cover object-top w-full h-12 overflow-hidden rounded shadow"
            />
            <img
              v-else
              :src="defaultLogo"
              class="w-12 h-12 overflow-hidden rounded shadow"
            />
          </div>
          <div>
            <strong
              ><a :href="job.url" target="_blank" rel="noopener noreferrer">{{
                job.title
              }}</a></strong
            ><br />
            @ {{ job.company }}
            <p class="text-sm">
              {{
                $dateFns.formatDistanceToNow(new Date(job.date), {
                  addSuffix: true,
                })
              }}
              on
              <a :href="job.url" target="_blank" rel="noopener noreferrer"
                >{{ uppercaseFirst(job.site) }} →</a
              >
            </p>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <spinner />
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    jobs: {
      type: Array,
      default: null,
    },
  },
  setup() {
    function uppercaseFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    const defaultLogo =
      'https://res.cloudinary.com/architecturalnetworks/image/upload/v1597225472/ban/slack_jobs_bot_image_small_gray_qcz1gx.png'
    return {
      uppercaseFirst,
      defaultLogo,
    }
  },
})
</script>

<style lang="scss" scoped></style>
