<template>
  <div>
    <nav class="text-xs">
      <ul class="flex space-x-2">
        <li>home</li>
        <li>·</li>
        <li>events</li>
      </ul>
    </nav>
    <section class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">
        {{ event.title }}
      </h1>
    </section>
    <div class="h-8" />
    <section>
      <img :src="imageURL" class="object-cover w-full h-full" />
    </section>
    <div class="h-8" />
    <section class="flex space-x-8">
      <div class="w-2/3">
        <h2 class="font-bold">Details</h2>
        <div class="h-4" />
        <nuxt-content :document="event"></nuxt-content>
      </div>
      <div class="w-1/3">
        <event-type :type="event.type" />
        <event-date :date="event.date" class="text-black" :is-long="true" />
        <event-location :location="event.location" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'pages',
  async asyncData({ $content, params }) {
    const event = await $content('events')
      .where({
        slug: params.slug,
      })
      .fetch()

    return {
      imageURL: `${process.env.NUXT_ENV_CLOUDINARY_BASE_URL}/ar_2,c_crop,dpr_auto,f_auto,g_center${event[0].image}`,
      event: event[0],
    }
  },
}
</script>

<style scoped>
.nuxt-content p {
  @apply mb-4;
}
</style>
