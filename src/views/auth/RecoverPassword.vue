<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const { userLogin } = authStore;

const router = useRouter();

const email = ref(null);
const password = ref(null);

const handleSubmit = async () => {
  const payload = {
    email: email.value,
    password: password.value,
  };

  const login = await userLogin(payload);
  console.log("a", login);

  if (login) {
    localStorage.setItem("token-auth", login.token);
    localStorage.setItem("user_id", login.user_id);

    router.push({ path: "/home" });
  }
};
</script>

<template>
  <div class="base-padding">
    <h1>login</h1>
    <div class="flex column">
      <label>Email</label>
      <input
        type="text"
        placeholder="Insira seu email"
        :value="email"
        @input="(ev) => (email = ev.target.value)"
      />
    </div>
    <div class="flex column">
      <label>Senha</label>
      <input
        type="text"
        placeholder="Insira seu email"
        :value="password"
        @input="(ev) => (password = ev.target.value)"
      />
    </div>
    <button @click="handleSubmit">Enviar</button>
  </div>
</template>

<style scoped>
.main {
  transition: all ease-in-out 0.4s;
  padding-top: 2rem;
}
.page {
  margin-left: 200px;
}
@media (min-width: 0px) and (max-width: 768px) {
  .page {
    margin-left: 0px;
  }
}
</style>
