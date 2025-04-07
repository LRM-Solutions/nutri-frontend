import "./assets/main.css";
import "primeicons/primeicons.css";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ToastService from "primevue/toastservice";
import { Select } from "primevue";
// components
const app = createApp(App);

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { Toast } from "primevue";
// import components
import VueTimepicker from "vue3-timepicker";

// CSS
import "vue3-timepicker/dist/VueTimepicker.css";

app.component("Select", Select);
app.component("Toast", Toast);
app.component("VueTimepicker", VueTimepicker);
app.component("Button", Button);
app.component("InputText", InputText);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: "none",
      cssLayer: {
        name: "primevue",
        order: "tailwind-base, primevue, tailwind-utilities",
      },
    },
  },
});
app.use(createPinia());
app.use(router);
app.use(ToastService);
app.mount("#app");
