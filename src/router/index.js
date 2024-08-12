import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import MyWork from "../views/MyWork.vue";
import Contact from "../views/Contact.vue";


/* eslint-disable */
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView
  },
  {
    path: "/mywork",
    name: "mywork",
    component: MyWork
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
