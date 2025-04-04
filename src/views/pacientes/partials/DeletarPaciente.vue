<script setup>
import { ref, watch } from "vue";
import { Dialog, Button, useToast, Toast } from "primevue";

import { usePacienteStore } from "@/stores/paciente";

const pacienteStore = usePacienteStore();
const { deletarPaciente } = pacienteStore;
const toast = useToast();

const props = defineProps({
  modelValue: Boolean,
  info: Object,
});

const submitLoading = ref(false);

const emit = defineEmits(["update:modelValue", "close", "refresh"]);

const dataPayload = ref({
  paciente_id: null,
});

const resetForm = () => {
  dataPayload.value = {
    paciente_id: null,
  };
};

const closeModal = () => {
  emit("update:modelValue", false);
};

const handleSubmit = async () => {
  const response = await deletarPaciente(props.info.paciente_id);

  if (!response) {
    toast.add({
      severity: "error",
      summary: "Erro ao Deletar Paciente!",
      detail: "Ocorreu um erro ao deletar o paciente.",
      life: 3000,
    });
  }
  emit("refresh", 2);

  closeModal();
  resetForm();
  emit("update:modelValue", false);
  submitLoading.value = false;
};

watch(
  () => props.info,
  (newInfo) => {
    if (newInfo) {
      dataPayload.value = {
        paciente_id: newInfo.paciente_id,
      };
    } else {
      // Limpa o formulário quando não há info (modal de criação)
      resetForm();
    }
  },
  { immediate: true }
);

// Observa quando o modal é fechado
watch(
  () => props.modelValue,
  (isOpen) => {
    if (!isOpen) {
      resetForm();
      emit("close");
    }
  }
);
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="props.modelValue"
      modal
      header="Deletar Paciente"
      style="width: 30rem; border-radius: 8px"
      @update:visible="(val) => emit('update:modelValue', val)"
    >
      <!-- Restante do conteúdo permanece igual -->
      <div class="mb-6">
        <span>
          Você tem certeza que deseja deletar o paciente:
          <b>{{ props.info.paciente_nome }}</b
          >?
        </span>
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="closeModal"
        ></Button>
        <Button
          type="button"
          class="bg-red-500"
          label="Deletar"
          @click="handleSubmit"
          :loading="submitLoading"
          :loading-label="''"
        ></Button>
      </div>
    </Dialog>
    <Toast position="bottom-right" class="z-50" />
  </div>
</template>
