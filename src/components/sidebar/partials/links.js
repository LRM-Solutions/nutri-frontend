import { ref } from "vue";

export const links = ref([
  {
    id: 1,
    name: "Agenda",
    icon: "pi-calendar",
    link: "/",
  },
  {
    id: 2,
    name: "Pacientes",
    icon: "pi-users",
    link: "/pacientes",
  },
]);
