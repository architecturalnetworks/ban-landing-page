<template>
  <section class="">
    <h2 class="font-bold">Resources</h2>
    <div class="h-4" />
    <ul class="space-y-4">
      <li v-for="resource in resources" :key="resource._uid" class="">
        <component
          :is="useSetIcon(resource.type)"
          class="w-6 h-6 text-gray-500"
        />
        <div>
          <p>
            <a :href="resource.url.url" target="_blank">{{ resource.title }}</a>
          </p>
          <p class="text-sm">{{ resource.description }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import {
  defineComponent,
  // computed,
  // useContext,
  // ref,
  // watch,
} from 'nuxt-composition-api'
import IconLink from '@/components/icons/IconLink'
import IconFilm from '@/components/icons/IconFilm'
import IconFile from '@/components/icons/IconFile'
export default defineComponent({
  components: {
    IconLink,
    IconFilm,
    IconFile,
  },
  props: {
    resources: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  setup() {
    function useSetIcon(resourceType) {
      if (resourceType === 'pdf') return 'icon-file'
      if (resourceType === 'video') return 'icon-film'

      return 'icon-link'
    }

    return { useSetIcon }
  },
})
</script>

<style scoped>
li {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.5rem;
}
</style>
