<script setup>
const props = defineProps({
  text: String,
  title: String,
});
</script>

<template>
  <v-alert
    class="alert"
    icon="$error"
    :text="props.text"
    :title="props.title"
    :type="props.type"
  ></v-alert>
</template>

<style scoped lang="scss">
.alert {
  transform: translateY(10px);
  animation: moveleft 0.15s linear forwards;
  background-color: red !important;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 15px;
  right: 15px;
}

.alert::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 5px;
  background-color: rgb(255, 112, 112);
  animation: anim 3s linear forwards;
}

@keyframes anim {
  100% {
    width: 0;
  }
}

@keyframes moveleft {
  100% {
    transform: translateY(0);
  }
}
</style>
