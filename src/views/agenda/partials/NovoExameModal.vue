<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { Dialog, Button, InputText, useToast, Toast } from "primevue";
import { formatDateDDMMYYYY } from "@/utils/date";
import { usePacienteStore } from "@/stores/paciente";

const pacienteStore = usePacienteStore();
const { listarPacientes } = pacienteStore;
const toast = useToast();

const props = defineProps({
  modelValue: Boolean,
  info: Object,
  date: String,
});

const pacientesOptions = ref([]);
const selectedPaciente = ref(null);
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
  exame_descricao: null,
  exame_data: null,
  paciente_id: null,
});

const resetForm = () => {
  selectedPaciente.value = null;
  dataPayload.value = {
    exame_descricao: null,
    exame_data: null,
    paciente_id: null,
  };
};

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
        summary: "Erro ao Editar Exame!",
        detail: "Ocorreu um erro ao editar o exame.",
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
        summary: "Erro ao agendar Exame!",
        detail: "Ocorreu um erro ao criar o exame.",
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
        paciente_id: newInfo.paciente_id,
        exame_data: newInfo.exame_data,
        exame_descricao: newInfo.exame_descricao,
      };
    } else {
      // Limpa o formulário quando não há info (modal de criação)
      resetForm();
    }
  },
  { immediate: true }
);
const loadOptions = async () => {
  let pacientes = await listarPacientes();
  pacientes.forEach((element) => {
    pacientesOptions.value.push({
      name: element.paciente_nome,
      code: element.paciente_id,
    });
  });
};
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

watch(
  () => selectedPaciente.value,
  (newVal) => {
    if (newVal) {
      dataPayload.value.paciente_id = newVal.code;
    } else {
      dataPayload.value.paciente_id = null;
    }
  }
);
onMounted(async () => {
  await loadOptions();
});
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="props.modelValue"
      modal
      :header="
        props.info
          ? 'Editar Exame'
          : `Agendar Exame - ${
              props.date ? formatDateDDMMYYYY(props.date) : null
            }`
      "
      style="width: 30rem; border-radius: 8px"
      @update:visible="(val) => emit('update:modelValue', val)"
    >
      <!-- Restante do conteúdo permanece igual -->
      <span class="text-surface-500 dark:text-surface-400 block mb-8">
        Preencha os campos a seguir.
      </span>

      <div class="flex mb-3 flex-col gap-3">
        <label for="username" class="font-semibold w-34">Paciente:</label>

        <Select
          v-model="selectedPaciente"
          :options="pacientesOptions"
          showClear
          optionLabel="name"
          placeholder="Selecione um Paciente"
          class="w-full"
        />
      </div>
      <div class="flex mb-3 flex-col gap-3">
        <label for="username" class="font-semibold w-34"
          >Motivo do Exame:</label
        >
        <InputText
          id="username"
          class="flex-auto"
          autocomplete="off"
          placeholder="Motivo"
          v-model="dataPayload.exame_descricao"
        />
      </div>

      <div class="flex flex-col gap-3 mb-[100px]">
        <label for="username" class="font-semibold w-34"
          >Horario do Exame:</label
        >
        <VueTimepicker />
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
