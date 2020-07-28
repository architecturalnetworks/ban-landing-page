<template>
  <div class="flex items-center space-x-4">
    <img
      :src="guest.photo.filename"
      class="flex-none w-24 h-24 overflow-hidden rounded-full"
    />
    <div>
      <div class="flex items-center space-x-1">
        <h3 class="font-bold">{{ guest.name }}</h3>
        <span v-if="guest.linkedin.url"
          ><a :href="guest.linkedin.url"><linkedin-icon class="w-4 h-4" /></a
        ></span>
      </div>
      <div class="text-sm">
        <p>{{ guest.title }}</p>
        <p v-if="guest.company" class="text-gray-600">
          @
          <span v-if="guest.company_url.url"
            ><a :href="guest.company_url.url">{{ guest.company }}</a></span
          >
          <span v-else>{{ guest.company }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    guest: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
