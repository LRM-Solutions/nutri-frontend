<script setup>
import DropdownIcons from "./DropdownIcons.vue";

const emit = defineEmits(["select"]);

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  whiteIcon: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "125px",
  },
  whiteIcon: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="dropdown" tabindex="1">
    <i class="ghost" tabindex="1"></i>
    <div class="dropdown-btn">
      <svg
        class="pointer hover-fx"
        width="22"
        height="22"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 2C7.45 2 7 2.45 7 3C7 3.55 7.45 4 8 4C8.55 4 9 3.55 9 3C9 2.45 8.55 2 8 2ZM8 12C7.45 12 7 12.45 7 13C7 13.55 7.45 14 8 14C8.55 14 9 13.55 9 13C9 12.45 8.55 12 8 12ZM8 7C7.45 7 7 7.45 7 8C7 8.55 7.45 9 8 9C8.55 9 9 8.55 9 8C9 7.45 8.55 7 8 7Z"
          :fill="props.whiteIcon ? '#fff' : 'black'"
        />
      </svg>
    </div>
    <div class="dropdown-content" :style="{ minWidth: props.width }">
      <div
        @click="emit('select', item)"
        v-for="item of props.options"
        :key="'dropdown-item-' + item.id"
        class="option flex align-center"
      >
        <div class="button-medium" style="margin-top: 5px">
          <i class="pi mr-2" :class="item.icon"></i>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  position: relative;
  z-index: 10;
  height: 24px;
  outline: none;
  width: 38px;
}

.dropdown-btn {
  color: #fff;
  position: absolute;
  cursor: pointer;

  z-index: 0;
}

.ghost {
  position: absolute;
  width: 30px;
}

.dropdown-content {
  position: absolute;
  top: -18px;
  right: 30px;
  background-color: #fff;
  box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2);
  border-radius: 8px;
  z-index: 9999 !important;
  display: none;
  opacity: 0;
  transition: 0.15s ease-out;
  max-height: 155px;
  overflow-y: auto;

  animation: slide-down 0.3s forwards;
}

.dropdown-content .option {
  padding: 0.5rem 1rem;
  padding-bottom: 0.8rem;
  transition: 0.35s ease-out;
  cursor: pointer;
  z-index: 99999;
}

.dropdown-content .option:hover {
  background-color: rgb(225, 225, 225);
}

.dropdown:focus .dropdown-content {
  outline: none;

  display: block;
  opacity: 1;
}

.dropdown .ghost {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: -1;
  cursor: pointer;
  display: none;
}

.dropdown:focus .ghost {
  display: inline-block;
}

.dropdown .ghost:focus .dropdown-content {
  outline: none;
  visibility: hidden;
  opacity: 0;
}

@keyframes slide-down {
  0% {
    opacity: 0; /* Começa invisível */
    transform: translateY(-20px); /* Começa deslocado para cima */
  }
  100% {
    opacity: 1; /* Torna-se visível */
    transform: translateY(0); /* Move para a posição original */
  }
}
</style>
