<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useExameStore } from "@/stores/exame";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

const exameStore = useExameStore();
const { listarExames } = exameStore;

const examePayload = {
  exame_id: null,
  exame_descricao: null,
  paciente_id: null,
  exame_data: null,
};

const examesLista = ref([]);

const handleDateClick = (arg) => {
  alert("date click! " + arg.dateStr);
};

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  dateClick: handleDateClick,
  locales: [ptBrLocale], // Adiciona os locais suportados
  locale: "pt-br",
  events: [],
});

const initFunction = async () => {
  examesLista.value = await listarExames();
  getEvents(examesLista.value);
};

const getEvents = (arr) => {
  if (arr.length < 1) {
    return;
  }

  calendarOptions.value.events = arr.map((item) => {
    return {
      title: item.exame_descricao,
      start: item.exame_data,
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
</style>
