<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onMounted(() => {
  localStorage.removeItem("token-auth");
  router.push("/login");
});
</script>

<template>
  <div class="page-background">
    <h1>logout</h1>
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
