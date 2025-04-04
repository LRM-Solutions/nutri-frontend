export default (httpClient) => ({
  novoPaciente: (data) => {
    return httpClient.post("/cadastro-paciente", data);
  },
  listarPacientes: () => {
    return httpClient.get(`/listar-pacientes`);
  },
  deletarPacientes: (paciente_id) => {
    return httpClient.delete(`/deletar-paciente/${paciente_id}`);
  },
  editarPaciente: (paciente_id, data) => {
    return httpClient.put(`/editar-paciente/${paciente_id}`, data);
  },
});
