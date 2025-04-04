import axios from "axios";
import { useRouter } from "vue-router";

import AuthService from "./services/auth";
import pacienteService from "./services/paciente";
import exameService from "./services/exame";

const baseURL = import.meta.env.VITE_URL_API;
const httpClient = axios.create({ baseURL });

// Interceptor de requisição (já existente)
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token-auth");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Novo: Interceptor de resposta para tratar erros de autenticação
httpClient.interceptors.response.use(
  (response) => {
    return response; // Se a resposta for bem-sucedida, apenas retorne
  },
  (error) => {
    if (error.response) {
      // Token inválido ou expirado (status 401 - Unauthorized)
      if (error.response.status === 401) {
        localStorage.removeItem("token-auth"); // Remove o token inválido

        // Redireciona para a página de login
        // Se estiver usando Vue Router dentro do setup:
        const router = useRouter();
        router.push("/login");

        // Alternativa se não estiver no setup:
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default {
  auth: AuthService(httpClient),
  pacienteService: pacienteService(httpClient),
  exameService: exameService(httpClient),
};
