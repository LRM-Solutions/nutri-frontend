<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import BaseMobileSidebar from "./sidebar/BaseMobileSidebar.vue";
import BaseSidebar from "./sidebar/BaseSidebar.vue";
import { onMounted, ref, watch, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
const authStore = useAuthStore();

const userData = ref(null);
const openedMenu = ref(false);
const loading = ref(false);
const route = useRoute();
const showOverlay = ref(false);

const initFunction = async () => {
  loading.value = true;
  loading.value = false;
};

// Fecha o menu quando a rota muda
watch(
  () => route.path,
  () => {
    openedMenu.value = false;
  }
);

// Controla o overlay e scroll da página
watch(openedMenu, (newVal) => {
  if (newVal) {
    showOverlay.value = true;
    document.body.style.overflow = "hidden";
  } else {
    showOverlay.value = false;
    document.body.style.overflow = "";
  }
});

// Fecha o menu ao clicar fora
const handleClickOutside = (event) => {
  const sidebar = document.querySelector(".sidebar");
  const menuButton = document.querySelector(".mobile-menu-btn");

  if (
    openedMenu.value &&
    !sidebar.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    openedMenu.value = false;
  }
};

onMounted(async () => {
  await initFunction();
  // Adiciona listener para clique fora
  document.addEventListener("click", handleClickOutside);
});

// Remove o listener quando o componente é destruído
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.body.style.overflow = ""; // Garante que o scroll volte ao normal
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

  <!-- Overlay -->
  <transition name="fade">
    <div
      v-if="showOverlay"
      class="fixed inset-0 z-30 bg-black bg-opacity-50"
      @click="openedMenu = false"
    ></div>
  </transition>

  <!-- Sidebar com animação -->
  <transition name="slide-left">
    <BaseSidebar v-if="openedMenu && !loading" class="sidebar" />
  </transition>
</template>

<style scoped lang="scss">
header {
  z-index: 10;
}

.mobile-menu-btn {
  display: block;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: block;
  }
}

/* Animações */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* Estilos do sidebar */
.sidebar {
  z-index: 40;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
}
</style>
