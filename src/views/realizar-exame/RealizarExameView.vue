<script setup>
import { ref } from "vue";
import Antropometria from "./partials/Antropometria.vue";
import Anamnese from "./partials/Anamnese.vue";
const activeOption = ref(0);
const options = [
  {
    id: 0,
    label: "Anamnese",
    icon: "pi-user",
    color: "bg-orange-300",
  },
  {
    id: 1,
    label: "Antropometria",
    icon: "pi-user",
    color: "bg-purple-300",
  },
  {
    id: 2,
    label: "Gastos Energéticos",
    icon: "pi-user",
    color: "bg-blue-300",
  },
  {
    id: 3,
    label: "Plano Alimentar",
    icon: "pi-user",
    color: "bg-green-300",
  },
];
</script>

<template>
  <div class="flex flex-row justify-between w-full p-8 gap-16">
    <div class="left w-full">
      <Anamnese v-if="activeOption == 0" />
      <Antropometria v-if="activeOption == 1" />
    </div>
    <div class="right w-[350px] h-[250px] rounded-md shadow-xl flex flex-col">
      <div
        v-for="option in options"
        class="option flex w-full h-full text-white p-3 flex-row items-center gap-3 hover:opacity-80 transition-all cursor-pointer"
        :class="`${option.color} ${
          activeOption == option.id ? 'opacity-100' : 'opacity-40'
        }`"
        @click="activeOption = option.id"
      >
        <i class="pi" :class="option.icon"></i>
        <p>{{ option.label }}</p>
      </div>
    </div>
  </div>

  <Toast position="bottom-right" class="z-50" />
</template>

<style scoped></style>
