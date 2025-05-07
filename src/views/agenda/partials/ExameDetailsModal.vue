<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { Dialog, Button, InputText, useToast, Toast } from "primevue";
import { extrairHora } from "@/utils/date";
import { usePacienteStore } from "@/stores/paciente";
import { useExameStore } from "@/stores/exame";
import { useRouter } from "vue-router";

const exameStore = useExameStore();
const { agendarExame } = exameStore;

const pacienteStore = usePacienteStore();
const { listarPacientes } = pacienteStore;
const toast = useToast();

const router = useRouter();

const props = defineProps({
  modelValue: Boolean,
  info: Object,
  date: String,
});

const pacientesOptions = ref([]);
const selectedPaciente = ref(null);
const submitLoading = ref(false);
const selectedHour = ref(null);

const disabled = computed(() => {
  return (
    !dataPayload.value.exame_data ||
    !dataPayload.value.exame_descricao ||
    !dataPayload.value.paciente_id
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
    const response = await agendarExame(dataPayload.value);

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

watch(
  () => selectedHour.value,
  (newVal) => {
    if (newVal) {
      dataPayload.value.exame_data = new Date(
        `${props.date}T${newVal.HH}:${newVal.mm}:00`
      );
    } else {
      dataPayload.value.exame_data = null;
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
      :header="`Detalhes do Exame - ${
        props.info
          ? `${props.info.paciente_nome} - ${extrairHora(
              props.info.exame_data
            )}`
          : ''
      }`"
      style="width: 30rem; border-radius: 8px"
      @update:visible="(val) => emit('update:modelValue', val)"
    >
      <h1><b>Descrição:</b></h1>
      <p>
        {{ props.info.exame_descricao }}
      </p>

      <div class="card-bottom mt-5">
        <Button
          class="w-full mb-3 bg-green-500 text-white"
          :disabled="false"
          @click="router.push(`/realizar-exame/${props.info.exame_id}`)"
          >Realizar Consulta</Button
        >
      </div>
      <!-- Restante do conteúdo permanece igual -->
    </Dialog>
    <Toast position="bottom-right" class="z-50" />
  </div>
</template>
