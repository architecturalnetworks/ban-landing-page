<template>
  <div class="w-full h-full">
    <div class="max-w-xl px-4 pt-8 mx-auto sm:px-8">
      <header class="flex items-center justify-between">
        <logo-ban-text class="text-2xl" />
        <nav>
          <ul class="font-bold">
            <li><nuxt-link to="/berlin/events">events</nuxt-link></li>
          </ul>
        </nav>
      </header>
      <div class="h-8 md:h-20" />
      <main class="flex-1">
        <nuxt />
      </main>
    </div>
    <base-footer />
  </div>
</template>

<style></style>
