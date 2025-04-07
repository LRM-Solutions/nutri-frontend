<script setup>
import { ref, onMounted } from "vue";
import { useExameStore } from "@/stores/exame";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import NovoExameModal from "./partials/NovoExameModal.vue";
import ExameDetailsModal from "./partials/ExameDetailsModal.vue";
import { generateColorByIndex } from "@/utils/colors";
import { useToast } from "primevue";

const exameStore = useExameStore();
const { listarExames } = exameStore;
const toast = useToast();

const modalInfo = ref(null);
const novo_exame_data = ref(null);
const openCreateEditModal = ref(false);
const openDetailsModal = ref(false);
const examesLista = ref([]);

const handleDateClick = (arg) => {
  novo_exame_data.value = arg.dateStr;
  openCreateEditModal.value = true;
};

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  dateClick: handleDateClick,
  locales: [ptBrLocale], // Use o locale personalizado
  locale: "pt-br",
  eventClick: (info) => {
    openDetailsModal.value = true;
    modalInfo.value = info.event;
  },
  events: [],
});

const initFunction = async () => {
  examesLista.value = await listarExames();
  getEvents(examesLista.value);
};

const modalClose = () => {
  openCreateEditModal.value = false;
};

const modalRefresh = async (event) => {
  await initFunction();

  switch (event) {
    case 0:
      toast.add({
        severity: "success",
        summary: "Exame Agendado!",
        detail: "O exame foi agendado com sucesso!",
        life: 3000,
      });
      break;

    default:
      break;
  }
};

const getEvents = (arr) => {
  if (arr.length < 1) {
    return;
  }

  calendarOptions.value.events = arr.map((item, i) => {
    return {
      exame_id: item.exame_id,
      title: item.exame_descricao,
      start: item.exame_data,
      backgroundColor: generateColorByIndex(i),
    };
  });
};

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="h-full p-10 w-full">
    <FullCalendar class="calendar" :options="calendarOptions" />
    <NovoExameModal
      v-model="openCreateEditModal"
      :date="novo_exame_data"
      @close="modalClose"
      @refresh="modalRefresh($event)"
    />
    <ExameDetailsModal
      v-model="openDetailsModal"
      :info="modalInfo"
      :date="novo_exame_data"
      @close="modalClose"
      @refresh="modalRefresh($event)"
    />
    <Toast position="bottom-right" class="z-50" />
  </div>
</template>

<style scoped>
.calendar {
  height: 700px;
}
</style>

<style>
.fc-button {
  background-color: #23c45d !important;
}
.fc .fc-button-primary:disabled,
.fc .fc-button-primary {
  border-color: #23c45d;
}
.fc-toolbar-title::first-letter {
  text-transform: uppercase;
}
</style>
