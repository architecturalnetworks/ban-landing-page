<template>
  <div class="container mx-auto">
    <section class="p-8">
      <logo-full />
    </section>
    <div class="h-12" />
    <section class="px-8">
      <ul class="flex flex-col justify-center space-y-4">
        <li class="text-center">
          <nuxt-link to="/option01" class="font-bold red">Option 01</nuxt-link
          ><br />
          Full logo, form CTA
        </li>
        <li class="text-center">
          <nuxt-link to="/option02" class="font-bold red">Option 02</nuxt-link
          ><br />
          Circle logo, form CTA
        </li>
        <li class="text-center">
          <nuxt-link to="/option03" class="font-bold red">Option 03</nuxt-link
          ><br />
          Circle logo, button CTA
        </li>
        <li class="text-center">
          <nuxt-link to="/option04" class="font-bold red">Option 04</nuxt-link
          ><br />
          ASCII figures
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
