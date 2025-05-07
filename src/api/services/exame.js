import paciente from "./paciente";

export default (httpClient) => ({
  agendarExame: (data) => {
    return httpClient.post("/agendar-exame", data);
  },
  listarExamesPorData: (data) => {
    return httpClient.post(`/listar-exames`, data);
  },
  listarExamesPorPaciente: (paciente_id) => {
    return httpClient.get(`/listar-exames-por-paciente/${paciente_id}`);
  },
  delertarExame: (exame_id) => {
    return httpClient.delete(`/deletar-exame/${exame_id}`);
  },
});
