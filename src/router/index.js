import { createRouter, createWebHistory } from "vue-router";
import API from "@/api/api";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/pages/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/pages/RegisterView.vue"),
    },
    {
      path: "/home",
      component: () => import("../views/HomeView.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "/produtos",
          name: "produtos",
          component: () => import("../views/ProdutoView.vue"),
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/DashboardView.vue"),
        },
        {
          path: "/graficos",
          name: "graphics",
          component: () => import("../views/GraphicsView.vue"),
        },
        {
          path: "/comparar",
          name: "comparar",
          component: () => import("../views/RegrasView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !API.isAuthenticated()) {
    next("/");
  } else {
    next();
  }
});
export default router;
