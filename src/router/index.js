import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/home",
      component: () => import("../views/HomeView.vue"), // Componente layout pai
      meta: { requiresAuth: true },
      children: [
        {
          path: "/home",
          name: "dashboard",
          component: () => import("../views/DashboardView.vue"), // Página inicial do dashboard
        },
        {
          path: "/home/produtos", // Caminho relativo para rota filha
          name: "produtos",
          component: () => import("../views/ProdutosView.vue"),
        },
        // Outras rotas-filhas conforme necessário
      ],
    },
  ],
});

function isAuthenticated() {
  return !!localStorage.getItem("user"); // Verifica se o usuário está autenticado
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/");
  } else {
    next();
  }
});

export default router;
