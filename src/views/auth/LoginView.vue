<script setup>
import { Password, Toast } from "primevue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { computed, ref } from "vue";
import { useToast } from "primevue";

const authStore = useAuthStore();

const { nutricionistaLogin } = authStore;

const loading = ref(false);

const toast = useToast();

const router = useRouter();

const payload = ref({
  nutricionista_email: "",
  nutricionista_senha: "",
});

const disabled = computed(() => {
  if (
    !payload.value.nutricionista_email ||
    !payload.value.nutricionista_senha
  ) {
    return true;
  } else {
    return false;
  }
});

const handleKeyPress = (event) => {
  if (event.key === "Enter" && !disabled.value) {
    handleLogin();
  }
};

const handleLogin = async () => {
  loading.value = true;
  const response = await nutricionistaLogin(payload.value);
  if (response) {
    router.push("/");
  } else {
    toast.add({
      severity: "error",
      summary: "Falha ao Fazer o Login!",
      detail: "Usuário ou Senha Incorretos.",
      life: 3000,
    });
  }
  console.log(response);
  loading.value = false;
};
</script>

<template>
  <div class="flex w-full h-screen justify-center relative">
    <div class="p-5 flex flex-col justify-center w-full items-center">
      <div class="w-full flex justify-center">
        <img
          src="../../assets/png/Logo.svg"
          alt=""
          width="150px"
          draggable="false"
        />
      </div>

      <div class="w-[100%] md:w-[500px]">
        <h1 class="text-large text-3xl mt-5 mb-5 font-medium">Login</h1>

        <p class="text-base md:text-xl font-light mb-5">
          Preencha seus dados corretamente para acessar.
        </p>
      </div>
      <div class="w-[100%] md:w-[500px]">
        <div class="flex flex-col w-full mb-3">
          <label>Email:</label>
          <InputText
            v-model="payload.nutricionista_email"
            @keydown="handleKeyPress"
          />
        </div>
        <div class="flex flex-col w-full mb-2">
          <label>Senha:</label>
          <Password
            type="password"
            class="w-full"
            toggleMask
            v-model="payload.nutricionista_senha"
            :feedback="false"
            @keydown="handleKeyPress"
          />
        </div>
        <div class="w-full text-end mb-3">
          <RouterLink to="/recover-password" class="text-green-500"
            >Esqueceu sua Senha?</RouterLink
          >
        </div>
        <Button
          :label="loading == true ? '' : 'Entrar'"
          class="w-full mb-3 bg-green-500 text-white"
          :disabled="disabled"
          @click="handleLogin"
          :loading="loading"
        />

        <div class="w-full mb-4">
          <RouterLink to="/register"
            >Não possui uma conta?
            <span class="text-green-500">Cadastre-se</span></RouterLink
          >
        </div>

        <Toast position="bottom-right" class="z-50" />
      </div>
    </div>
    <div class="w-full hidden md:flex items-center justify-center bg-black">
      <!--<LoginImage />-->
      <img
        class="w-full h-full object-cover opacity-30"
        src="../../assets/png/login-image-background.jpg"
        alt="background"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.p-password) {
  width: 100%; /* Força o componente a ocupar toda a largura */
}
</style>
