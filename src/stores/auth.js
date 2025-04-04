import { defineStore } from "pinia";
import api from "@/api";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({});

  async function nutricionistaLogin(payload) {
    try {
      const response = await api.auth.nutricionistaLogin(payload);
      localStorage.setItem("token-auth", response.data.token);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function registerUser(payload) {
    try {
      const response = await api.auth.registerUser(payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function userInfo() {
    try {
      const response = await api.auth.userInfo();
      user.value = response.data;
      return response.data;
    } catch (error) {}
  }
  return {
    user,
    nutricionistaLogin,
    userInfo,
    registerUser,
  };
});
