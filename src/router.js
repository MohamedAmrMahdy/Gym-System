import Vue from "vue";
import Router from "vue-router";
import DashBoard from "./views/DashboardLayout.vue";
import LoginPage from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/login", name: "Login Page", component: LoginPage },
    {
      path: "/dashboard",
      name: "DashBoard Layout",
      component: DashBoard,
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
          path: "staff",
          name: "Staff",
          component: () => import("./views/Staff.vue")
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
