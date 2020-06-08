<template>
  <div>
    <template v-if="status === 'success'">
      <p class="font-bold" data-cy="subscribe-success">
        👏 Great, we'll get in touch shortly!
      </p>
    </template>
    <template v-else-if="status === 'failure'">
      <div data-cy="subscribe-failure">
        <p class="font-bold">Oops 🙀!</p>
        <p>
          I'm so sorry, something went wrong on my side!
          <button class="link" @click="status = 'idle'">
            Wanna try again?
          </button>
        </p>
      </div>
    </template>
    <template v-else>
      <form @submit.prevent="submit">
        <p>
          <input
            id="email"
            v-model="email"
            class="w-full h-10 p-2 text-black bg-white border border-black shadow-inner sm:h-12 sm:text-lg"
            type="text"
            :placeholder="text.ctaInputPlaceholder"
          />
        </p>
        <div class="w-2 h-2" />
        <p>
          <button
            type="submit"
            :disabled="isLoading"
            class="flex items-center justify-center w-full h-10 p-1 text-lg tracking-wide text-white uppercase bg-red-600 shadow font-logo sm:h-12 sm:text-lg"
          >
            <span v-if="isLoading">
              <pulse-loader
                :loading="true"
                color="#ffffff"
                size="5px"
              ></pulse-loader>
            </span>
            <span v-else>
              {{ text.ctaButtonText }}
            </span>
          </button>
        </p>
      </form>
      <div class="h-2" />
      <p class="text-xs text-center sm:text-sm">
        {{ text.ctaExplainer }}
      </p>
    </template>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
const NETLIFY_MC_FUNCTION = '/.netlify/functions/newsletter-signup'
export default {
  name: 'McApiForm',
  components: { PulseLoader },
  props: {
    text: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      email: '',
      isLoading: false,
      status: 'idle',
    }
  },
  methods: {
    async submit() {
      this.isLoading = true
      await this.sendToMailchimp()
      this.isLoading = false
    },

    async sendToMailchimp() {
      const url = `${NETLIFY_MC_FUNCTION}?email=${encodeURIComponent(
        this.email
      )}&tag=landing-page`
      console.log(url)
      try {
        const res = await fetch(url)
        if (res.status !== 200) {
          throw new Error(res)
        }
        this.status = 'success'
      } catch (e) {
        console.error(e)
        this.status = 'failure'
      }
    },
  },
}
</script>
