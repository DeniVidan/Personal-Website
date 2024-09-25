import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import MyWork from "../views/MyWork.vue";
import Contact from "../views/Contact.vue";
import RotatingCube from "../views/RotatingCube.vue";
import Model3D from "../views/Model3D.vue";

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
    component: AboutView,
  },
  {
    path: "/mywork",
    name: "mywork",
    component: MyWork,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/rotatingCube",
    name: "rotatingCube",
    component: RotatingCube,
  },
  {
    path: "/model3D",
    name: "model3D",
    component: Model3D,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
