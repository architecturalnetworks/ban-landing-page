<template>
  <div>
    <nav class="flex items-center justify-between w-full">
      <nuxt-link to="/berlin" tag="button" class="text-left focus:outline-none"
        ><logo-full-text :class="size === 'large' ? 'text-lg' : 'text-base'"
      /></nuxt-link>

      <div class="font-logo">
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p class="font-sans font-bold">
          <nuxt-link to="/berlin/events">Events</nuxt-link>
        </p>

        <p>&nbsp;</p>
      </div>
    </nav>
  </div>
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
