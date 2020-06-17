<template>
  <div class="w-full h-full bg-gray-100">
    <div class="bg-white">
      <header
        class="flex items-center justify-between max-w-4xl px-4 py-4 mx-auto sm:px-8"
      >
        <logo-ban-text class="text-2xl" />
        <nav>
          <ul class="font-bold">
            <li><nuxt-link to="/berlin/events">events</nuxt-link></li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="max-w-4xl px-4 mx-auto sm:px-8">
      <div class="h-8" />
      <main class="flex-1">
        <nuxt />
      </main>
    </div>
    <base-footer />
  </div>
</template>

<style></style>
