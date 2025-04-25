<script setup>
import BaseHeader from "@/components/BaseHeader.vue";
import BaseSidebar from "./sidebar/BaseSidebar.vue";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <!-- <BaseSidebar /> -->

  <main :class="`main bg-gray-100 w-full`">
    <BaseHeader />

    <div class="base-padding bg-gray-100 p-6 h-full">
      <div class="page bg-white rounded-md">
        <router-view />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  transition: all ease-in-out 0.4s;
  height: 100vh;
  //margin-left: 250px;
  @media (min-width: 1700px) {
    .base-padding {
      width: 70%;
      margin: auto;
    }
  }
}

// .page {
//   // height: 100%;
// }
</style>
