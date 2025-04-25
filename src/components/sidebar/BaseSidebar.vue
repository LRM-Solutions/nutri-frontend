<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { links } from "./partials/links";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();

const route = useRoute();

const router = useRouter();

const redirectToLink = (link) => {
  router.push(link);
};
</script>

<template>
  <nav
    class="sidebar h-full fixed left-0 top-0 flex flex-col items-center justify-between p-3 w-[250px] border-r shadow-2xl border-r-gray-300"
  >
    <div class="w-full flex flex-col items-center gap-4">
      <div class="header w-full flex justify-center">
        <img
          src="../../assets/png/Logo.svg"
          alt="logo"
          width="150px"
          draggable="false"
        />
      </div>
      <div class="links w-full p-1 flex flex-col items-center gap-4">
        <div
          v-for="link in links"
          :key="link.id"
          class="pl-5 pt-1.5 pb-1.5 pr-5 link w-full flex items-center gap-3"
          :class="link.link === route.path ? 'active' : ''"
          @click="redirectToLink(link.link)"
        >
          <i
            class="pi pi-chart-line text-md text-gray-500"
            :class="link.icon"
            style="font-size: 1.15rem"
          ></i>
          <span class="text-gray-500 text-md">{{ link.name }}</span>
        </div>
      </div>
    </div>
    <div
      class="flex items-center w-full justify-center gap-2 text-gray-500 p-5 cursor-pointer"
      @click="router.push('/logout')"
    >
      <i class="pi pi-sign-out"></i>
      Sair
    </div>
  </nav>
</template>

<style scoped lang="scss">
.sidebar {
  z-index: 100;
  background-color: #fff;
  @media (max-width: 1024px) {
    display: none;
  }
}

.active {
  background-color: #23c45d;
  span {
    color: #fff;
  }

  i {
    color: #fff;
  }
}

.link {
  border-radius: 5px;

  transition: 0.3s all ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
}
</style>
