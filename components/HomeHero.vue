<template>
  <div
    class="flex items-center justify-center max-w-3xl mx-auto space-x-12 text-lg text-red-600 sm:text-xl"
  >
    <div v-if="dotVersion" class="w-40 h-40 ban-dot">
      <component :is="`ban-person-${dotVersion}`" class="w-40 h-40" />
    </div>
    <div v-else class="w-40" />
    <!-- <logo-full-text class="hidden text-black md:block ban-logo" /> -->
  </div>
</template>

<script>
import BanPerson1 from '@/components/ban-people/BanPerson1'
import BanPerson2 from '@/components/ban-people/BanPerson2'
import BanPerson3 from '@/components/ban-people/BanPerson3'
import BanPerson4 from '@/components/ban-people/BanPerson4'
import BanPerson5 from '@/components/ban-people/BanPerson5'
export default {
  components: {
    BanPerson1,
    BanPerson2,
    BanPerson3,
    BanPerson4,
    BanPerson5,
  },
  data() {
    return {
      dotVersion: this.getRndInteger(1, 5),
    }
  },
  methods: {
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
  },
}
</script>

<style scoped>
.ban-dot {
  animation: 1s appear-left ease-out;
}
.ban-logo {
  animation: 1s appear-right ease-out;
}

@keyframes appear-right {
  0% {
    opacity: 0;
    transform: translateX(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes appear-left {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
