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
import { cpfMask } from "@/utils/masks";

const openCreateEditModal = ref(false);
const openDeleteModal = ref(false);
const modalInfo = ref(null);
const clients = ref([]);
const loading = ref(false);
const search = ref(null);
const toast = useToast();

const options = [
  {
    id: 0,
    name: "Editar",
    icon: "pi-pen-to-square",
  },
  {
    id: 1,
    name: "Excluir",
    icon: "pi-trash",
  },
];

const filteredData = computed(() => {
  if (!search.value) {
    return clients.value;
  } else {
    return clients.value.filter((item) =>
      item.paciente_nome.toLowerCase().includes(search.value.toLowerCase())
    );
  }
});

const pacienteStore = usePacienteStore();
const { listarPacientes } = pacienteStore;

const initFunction = async () => {
  loading.value = true;
  clients.value = await listarPacientes();
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
        placeholder="🔎   Buscar paciente..."
        class="h-[32px] w-full md:w-[50%]"
        v-model="search"
      />
      <Button
        class="h-[32px] bg-green-500"
        label="+ Cadastrar paciente"
        @click="openCreateEditModal = !openCreateEditModal"
      />
    </div>

    <DataTable
      :value="filteredData"
      stripedRows
      tableStyle="min-width: 40rem; padding-bottom: 50px"
    >
      <Column field="paciente_id" header="ID"></Column>
      <Column field="paciente_nome" header="Nome"></Column>
      <Column field="paciente_cpf" header="CPF">
        <template #body="{ data }">
          <span>{{ cpfMask(data.paciente_cpf) }}</span>
        </template>
      </Column>
      <Column field="paciente_email" header="Email"></Column>
      <Column header="Ações">
        <template #body="{ data }">
          <BaseDropdown
            :options="options"
            @select="(option) => handleSelect(data, option.id)"
          />
        </template>
      </Column>
    </DataTable>
    <CriarEditarPaciente
      v-model="openCreateEditModal"
      :info="modalInfo"
      @close="modalClose"
      @refresh="modalRefresh($event)"
    />
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
