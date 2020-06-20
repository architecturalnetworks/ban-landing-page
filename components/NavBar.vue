<template>
  <nav class="flex items-end justify-between">
    <nuxt-link to="/berlin" tag="button" class="text-left focus:outline-none"
      ><logo-full-text :class="size === 'large' ? 'text-lg' : 'text-base'"
    /></nuxt-link>
    <div class="font-bold">
      <p>
        <nuxt-link class="no-underline" to="/berlin/events">Events</nuxt-link>
      </p>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'large',
    },
  },
}
</script>

<style scoped></style>
