<script setup>
import { Password } from "primevue";
import { RouterLink } from "vue-router";
import LoginImage from "@/components/LoginImage.vue";
</script>

<template>
  <div class="flex w-full h-screen justify-center relative">
    <div class="p-5 h-full flex flex-col justify-center">
      <div class="w-full flex justify-center">
        <img
          src="../../assets/png/Logo.svg"
          alt=""
          width="130px"
          draggable="false"
        />
      </div>

      <h1 class="text-large text-3xl mt-5 mb-5 font-medium">Cadastre-se</h1>
      <p class="text-base md:text-xl font-light mb-5">
        Preencha os campos abaixo e crie sua conta.
      </p>
      <div class="w-[100%] md:w-[500px]">
        <div class="flex flex-col w-full mb-3">
          <label>Nome de usuário:</label>
          <InputText placeholder="Insira seu nome de usuário." />
        </div>
        <div class="flex flex-col w-full mb-3">
          <label>Email:</label>
          <InputText type="email" placeholder="Insira seu email." />
        </div>
        <div class="flex flex-col w-full mb-3">
          <label>Senha:</label>
          <Password
            type="password"
            class="w-full"
            :feedback="true"
            placeholder="Insira sua senha."
          />
        </div>
        <div class="flex flex-col w-full mb-7">
          <label>Confirmar senha:</label>
          <Password
            type="password"
            class="w-full"
            :feedback="false"
            placeholder="Confirme sua senha."
          />
        </div>

        <Button class="w-full mb-3 bg-green-500 text-white" :disabled="false"
          >Entrar</Button
        >

        <RouterLink to="/login"
          >Já possui uma conta?
          <span class="text-green-500">Faça seu login</span></RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
