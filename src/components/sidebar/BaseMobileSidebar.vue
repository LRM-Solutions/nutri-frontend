<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { links } from "./partials/links";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

const active_link_id = ref(null);

const route = useRoute();

const router = useRouter();

const redirectToLink = (link) => {
  router.push(link);
};
</script>

<template>
  <nav
    class="sidebar h-[90%] sticky top-18 w-full flex flex-col items-center justify-between gap-5 p-3 bg-white border-r shadow-2xl border-r-gray-300"
  >
    <div class="flex flex-col gap-4 items-center w-full">
      <div class="header w-full flex items-center justify-center">
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
  animation: slide-in 0.5s forwards;
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

@keyframes slide-in {
  from {
    transform: translateY(-60px);
  }

  to {
    transform: translateY(0px);
  }
}
</style>
