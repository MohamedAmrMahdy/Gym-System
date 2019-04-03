import Vue from "vue";
import Router from "vue-router";
import DashBoard from "./views/DashboardLayout.vue";
import LoginPage from "./views/Login.vue";
import store from './store/index';

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    { path: "/", 
      redirect: '/dashboard',
      meta: {
        requiresAuth: true
      } 
    },
    { path: "/login", name: "Login Page", component: LoginPage },
    {
      path: "/dashboard",
      component: DashBoard,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "/",
          name: "Dashboard",
          component: () => import("./views/DashBoard.vue")
        },
        {
          path: "profile",
          name: "Profile",
          component: () => import("./views/Profile.vue")
        },
        {
          path: "customers",
          name: "Customers",
          component: () => import("./views/Customers.vue")
        },
        {
          path: "subscriptions",
          name: "Subscriptions",
          component: () => import("./views/Subscriptions.vue")
        },
        {
          path: "cashiers",
          name: "Cashiers",
          component: () => import("./views/Cashier.vue")
        },
        {
          path: "documentation",
          name: "Documentation",
          component: () => import("./views/Documentation.vue")
        },
        {
          path: "contact",
          name: "Contact",
          component: () => import("./views/ContactUs.vue")
        },
        {
          path: "about",
          name: "About System",
          component: () => import("./views/About.vue")
        },
        {
          path: "settings",
          name: "Settings",
          component: () => import("./views/Settings.vue")
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['apiAuth/isLoggedIn'] && localStorage.getItem("token")) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
