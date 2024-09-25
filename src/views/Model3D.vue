<script setup>
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { onMounted, onUnmounted, ref, render } from "vue";
import Scene3D from "../components/Scene3D.vue"
import { useRouter, useRoute } from 'vue-router'

defineProps({
  msg: String,
});

const router = useRouter()
const route = useRoute()




  if(router.currentRoute.value.path == "/") {
    console.log("je / ruta")
  }


</script>

<template>
  <div style="height: 500vh; position: absolute; top: 0">

    <Scene3D />
  </div>
</template>

<style scoped>
.read-the-docs {
  color: white;
}

#progress-container {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#progress {
  font-size: 3em;
  color: white;
}

#load-animation {
    height: 100vh;
}
</style>
