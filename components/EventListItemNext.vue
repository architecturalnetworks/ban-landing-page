<template>
  <article class="bg-white shadow-lg event-card">
    <figure id="image" class="overflow-hidden">
      <nuxt-link :to="`/berlin/events/${event.slug}`" class="no-underline"
        ><img :src="imageURL" class="object-cover w-full h-full"
      /></nuxt-link>
    </figure>

    <div id="type-date" class="flex justify-between px-4 py-4 md:pl-0">
      <event-type :type="content.type" />
      <event-date :date="content.date" class="text-right" />
    </div>
    <div id="title" class="px-4 pb-4 md:pl-0">
      <h3 class="font-bold">
        <nuxt-link :to="`/berlin/events/${event.slug}`" class="no-underline">{{
          content.title
        }}</nuxt-link>
      </h3>
      <p>{{ content.subtitle }}</p>
    </div>
    <div id="summary" class="hidden px-4 pb-4 md:pl-0 md:block">
      <p>{{ content.summary }}</p>
    </div>
    <div id="location" class="px-4 pb-6 md:pl-0">
      <p v-if="content.is_online">
        <icon-video class="w-4 h-4" /> Online Event
      </p>
      <p v-else><icon-location class="w-4 h-4" /> {{ content.location }}</p>
    </div>
  </article>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useCloudinaryURL from '@/use/cloudinaryURL'

export default defineComponent({
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { content } = props.event
    const imageURL = useCloudinaryURL(
      content.main_image.filename,
      'ar_1.5,c_crop,dpr_auto,f_auto,g_center'
    )
    return {
      imageURL,
      content,
    }
  },
})
</script>

<style scoped>
article {
  max-width: 385px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
}

@screen md {
  article {
    max-width: none;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1.25rem;
    grid-template-rows: auto auto 1fr auto;
    grid-template-areas: 'image type-date' 'image title' 'image summary' 'image location';
  }
  #image {
    grid-area: image;
  }
  #type-date {
    grid-area: type-date;
  }
  #title {
    grid-area: title;
  }
  #summary {
    grid-area: summary;
  }
  #location {
    grid-area: location;
  }
}
</style>
