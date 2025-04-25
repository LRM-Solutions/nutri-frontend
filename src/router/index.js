import { createRouter, createWebHistory } from "vue-router";
import beforeEach from "./beforeEach";

import TheContainer from "../components/TheContainer.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/auth/LoginView.vue"),
    },

    {
      path: "/register",
      name: "Cadastro",
      component: () => import("../views/auth/RegisterView.vue"),
    },
    {
      path: "/recover-password/:hash",
      name: "recover-password",
      component: () => import("../views/auth/RecoverPassword.vue"),
    },

    {
      path: "/",
      component: TheContainer,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/",
          name: "Agenda",
          component: () => import("../views/agenda/AgendaView.vue"),
        },
        {
          path: "/pacientes",
          name: "Pacientes",
          component: () => import("../views/pacientes/PacientesView.vue"),
        },
        {
          path: "/exames/:id",
          name: "Exames do Paciente",
          component: () => import("../views/exames/ExamesView.vue"),
        },
        {
          path: "/logout",
          name: "logout",
          component: () => import("../views/auth/LogoutView.vue"),
        },
      ],
    },
    {
      path: "/:catchAll(.*)*",
      component: () => import("../views/NotFound.vue"),
    },
  ],

  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(beforeEach);

export default router;
