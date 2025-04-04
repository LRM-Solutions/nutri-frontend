export default (httpClient) => ({
  agendarExame: (data) => {
    return httpClient.post("/agendar-exame", data);
  },
  listarExames: () => {
    return httpClient.get(`/listar-exames`);
  },
  delertarExame: (exame_id) => {
    return httpClient.delete(`/deletar-exame/${exame_id}`);
  },
});
