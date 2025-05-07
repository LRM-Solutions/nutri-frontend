<script setup>
import { usePacienteStore } from "@/stores/paciente";
import {
  DataTable,
  InputText,
  Column,
  SplitButton,
  useToast,
  Toast,
} from "primevue";
import { computed, onMounted, ref } from "vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import CriarEditarPaciente from "./partials/CriarEditarPaciente.vue";
import DeletarPaciente from "./partials/DeletarPaciente.vue";
import { useExameStore } from "@/stores/exame";
import { useRoute } from "vue-router";

const openCreateEditModal = ref(false);
const openDeleteModal = ref(false);
const modalInfo = ref(null);
const exames = ref([]);
const loading = ref(false);
const search = ref(null);
const toast = useToast();

const exameStore = useExameStore();
const { listarExamesPorPaciente } = exameStore;

const route = useRoute();

const options = [
  // {
  //   id: 0,
  //   name: "Editar",
  //   icon: "pi-pen-to-square",
  // },
  // {
  //   id: 1,
  //   name: "Excluir",
  //   icon: "pi-trash",
  // },
  // {
  //   id: 2,
  //   name: "Exames",
  //   icon: "pi-book",
  // },
  {
    id: 3,
    name: "Visualizar",
    icon: "pi-eye",
  },
];

const filteredData = computed(() => {
  if (!search.value) {
    return exames.value;
  } else {
    return exames.value.filter((item) =>
      item.exame_descricao.toLowerCase().includes(search.value.toLowerCase())
    );
  }
});

const initFunction = async () => {
  loading.value = true;
  exames.value = await listarExamesPorPaciente(route.params.paciente_id);
  loading.value = false;
};

const handleSelect = (data, id) => {
  modalInfo.value = data;
  if (id === 0) {
    openCreateEditModal.value = true;
  } else if (id === 1) {
    openDeleteModal.value = true;
  }
};

const modalClose = () => {
  openCreateEditModal.value = false;
  modalInfo.value = null;
};

const modalRefresh = async (event) => {
  openCreateEditModal.value = false;
  modalInfo.value = null;
  switch (event) {
    case 0:
      toast.add({
        severity: "success",
        summary: "Paciente Editado!",
        detail: "Os dados do paciente foram editados com sucesso!",
        life: 3000,
      });
      break;
    case 1:
      toast.add({
        severity: "success",
        summary: "Paciente Criado!",
        detail: "O paciente foi criado com sucesso!",
        life: 3000,
      });
      break;
    case 2:
      toast.add({
        severity: "success",
        summary: "Paciente Deletado!",
        detail: "O paciente foi deletado com sucesso!",
        life: 3000,
      });
      break;

    default:
      break;
  }
  await initFunction();
};
onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div v-if="!loading" class="flex flex-col w-full p-8 gap-7">
    <div class="w-full flex flex-col md:flex-row gap-3 justify-between z-0">
      <InputText
        placeholder="🔎   Buscar Exame..."
        class="h-[32px] w-full md:w-[50%]"
        v-model="search"
      />
    </div>

    <DataTable
      :value="filteredData"
      stripedRows
      tableStyle="min-width: 40rem; padding-bottom: 50px"
    >
      <Column field="exame_id" header="ID"></Column>
      <Column field="exame_descricao" header="Descrição"></Column>
      <Column field="exame_data" header="Data do Exame"> </Column>
      <Column header="Visualizar">
        <template #body="{ data }">
          <i class="pi pi-eye mr-2"></i>
        </template>
      </Column>
    </DataTable>
    <!-- <CriarEditarPaciente
      v-model="openCreateEditModal"
      :info="modalInfo"
      @close="modalClose"
      @refresh="modalRefresh($event)"
    /> -->
    <DeletarPaciente
      v-model="openDeleteModal"
      :info="modalInfo"
      @close="modalClose"
      @refresh="modalRefresh($event)"
    />
  </div>
  <div v-else class="w-full h-[300px] flex items-center justify-center">
    <i
      class="pi pi-spin pi-spinner text-green-500"
      style="font-size: 2.5rem"
    ></i>
  </div>

  <Toast position="bottom-right" class="z-50" />
</template>

<style scoped></style>
