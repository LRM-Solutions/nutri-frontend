import { defineStore } from "pinia";
import api from "@/api";

export const usePacienteStore = defineStore("paciente", () => {
  async function novoPaciente(payload) {
    try {
      const response = await api.pacienteService.novoPaciente(payload);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }

  async function listarPacientes() {
    try {
      const response = await api.pacienteService.listarPacientes();
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }

  async function editarPaciente(paciente_id, data) {
    try {
      const response = await api.pacienteService.editarPaciente(
        paciente_id,
        data
      );

      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }

  async function deletarPaciente(paciente_id) {
    try {
      const response = await api.pacienteService.deletarPacientes(paciente_id);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
  return {
    novoPaciente,
    listarPacientes,
    editarPaciente,
    deletarPaciente,
  };
});
