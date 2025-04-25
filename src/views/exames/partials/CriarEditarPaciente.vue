<script setup>
import { ref, computed, watch } from "vue";
import { Dialog, Button, InputText, useToast, Toast } from "primevue";
import { formatCpf } from "@/utils/masks";
import { usePacienteStore } from "@/stores/paciente";

const pacienteStore = usePacienteStore();
const { novoPaciente, editarPaciente } = pacienteStore;
const toast = useToast();

const props = defineProps({
  modelValue: Boolean,
  info: Object,
});

const submitLoading = ref(false);

const disabled = computed(() => {
  return (
    !dataPayload.value.paciente_nome ||
    !dataPayload.value.paciente_email ||
    !dataPayload.value.paciente_cpf ||
    (props.info ? false : !dataPayload.value.paciente_senha)
  );
});

const emit = defineEmits(["update:modelValue", "close", "refresh"]);

const dataPayload = ref({
  paciente_nome: null,
  paciente_email: null,
  paciente_cpf: null,
  paciente_senha: null,
});

const resetForm = () => {
  dataPayload.value = {
    paciente_nome: null,
    paciente_email: null,
    paciente_cpf: null,
    paciente_senha: null,
  };
};
const formattedCpf = computed({
  get() {
    return formatCpf(dataPayload.value.paciente_cpf);
  },
  set(newValue) {
    dataPayload.value.paciente_cpf = newValue.replace(/\D/g, "");
  },
});

const closeModal = () => {
  emit("update:modelValue", false);
};

const handleSubmit = async () => {
  submitLoading.value = true;
  if (props.info) {
    const response = await editarPaciente(
      props.info.paciente_id,
      dataPayload.value
    );

    if (!response) {
      toast.add({
        severity: "error",
        summary: "Erro ao Editar Paciente!",
        detail: "Ocorreu um erro ao editar o paciente.",
        life: 3000,
      });
      return;
    }

    emit("refresh", 0);
  } else {
    const response = await novoPaciente(dataPayload.value);

    if (!response) {
      toast.add({
        severity: "error",
        summary: "Erro ao Criar Paciente!",
        detail: "Ocorreu um erro ao criar o paciente.",
        life: 3000,
      });
      return;
    }

    emit("refresh", 1);
  }
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
        paciente_nome: newInfo.paciente_nome,
        paciente_email: newInfo.paciente_email,
        paciente_cpf: newInfo.paciente_cpf,
        paciente_senha: null, // Não carregar a senha
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
      :header="props.info ? 'Editar Paciente' : 'Cadastrar Paciente'"
      style="width: 30rem; border-radius: 8px"
      @update:visible="(val) => emit('update:modelValue', val)"
    >
      <!-- Restante do conteúdo permanece igual -->
      <span class="text-surface-500 dark:text-surface-400 block mb-8">
        Preencha os campos a seguir.
      </span>

      <div class="flex mb-3 flex-col gap-3">
        <label for="username" class="font-semibold w-24">Nome:</label>
        <InputText
          id="username"
          class="flex-auto"
          autocomplete="off"
          v-model="dataPayload.paciente_nome"
        />
      </div>
      <div class="flex mb-3 flex-col gap-3">
        <label for="cpf" class="font-semibold w-24">CPF:</label>
        <InputText
          id="cpf"
          class="flex-auto"
          autocomplete="off"
          v-model="formattedCpf"
          maxlength="14"
        />
      </div>
      <div class="flex mb-3 flex-col gap-3">
        <label for="email" class="font-semibold w-24">Email:</label>
        <InputText
          id="email"
          class="flex-auto"
          autocomplete="off"
          v-model="dataPayload.paciente_email"
        />
      </div>

      <div class="flex mb-5 flex-col gap-3" v-if="!props.info">
        <label for="password" class="font-semibold w-24">Senha:</label>
        <InputText
          id="password"
          class="flex-auto"
          autocomplete="off"
          v-model="dataPayload.paciente_senha"
        />
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
          class="bg-green-500"
          :label="props.info ? 'Editar' : 'Cadastrar'"
          @click="handleSubmit"
          :disabled="disabled"
          :loading="submitLoading"
          :loading-label="''"
        ></Button>
      </div>
    </Dialog>
    <Toast position="bottom-right" class="z-50" />
  </div>
</template>
