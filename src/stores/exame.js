import { defineStore } from "pinia";
import api from "@/api";

export const useExameStore = defineStore("exame", () => {
  async function agendarExame(payload) {
    try {
      const response = await api.exameService.agendarExame(payload);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }

  async function listarExamesPorData(data) {
    try {
      const response = await api.exameService.listarExamesPorData(data);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
  async function listarExamesPorPaciente(paciente_id) {
    try {
      const response = await api.exameService.listarExamesPorPaciente(
        paciente_id
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }

  async function deletarExame(exame_id) {
    try {
      const response = await api.exameService.delertarExame(exame_id);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
  return {
    agendarExame,
    listarExamesPorData,
    listarExamesPorPaciente,
    deletarExame,
  };
});
