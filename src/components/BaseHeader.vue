<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import BaseMobileSidebar from "./sidebar/BaseMobileSidebar.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const authStore = useAuthStore();

const userData = ref(null);

const openedMenu = ref(false);
const loading = ref(false);
const route = useRoute();

const initFunction = async () => {
  loading.value = true;

  loading.value = false;
};

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <header
    v-if="!loading"
    class="w-full z-20 border-b flex p-4 sticky top-0 justify-between items-center bg-white border-b-gray-300 shadow-2xl"
  >
    <span class="text-2xl font-normal">{{ route.name }}</span>
    <div class="flex items-center gap-5">
      <i
        class="mobile-menu-btn pi pi-bars"
        style="font-size: 1.35rem"
        @click="openedMenu = !openedMenu"
      ></i>
    </div>
  </header>
  <div
    v-if="loading"
    class="w-full fixed left-0 z-50 h-full bg-white flex items-center justify-center"
  >
    <i class="pi pi-spin pi-spinner text-green-500" style="font-size: 5rem"></i>
  </div>
  <BaseMobileSidebar v-if="openedMenu && !loading" />
</template>

<style scoped lang="scss">
header {
  z-index: 10;
}

.mobile-menu-btn {
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }
}
</style>
