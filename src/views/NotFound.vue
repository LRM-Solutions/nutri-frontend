<script setup></script>

<template>
  <div>
    <h1>Página não encontrada</h1>
    <router-link to="/" class="mt-4"> Voltar para o menu </router-link>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .body-huge {
    width: 490px;
    color: var(--neutral-700);
  }
}
</style>
