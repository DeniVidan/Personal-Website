<script setup>
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { HalfCircleSpinner } from "epic-spinners";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const router = useRouter();
const route = useRoute();
gsap.registerPlugin(ScrollTrigger);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(90, 35, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.minDistance = 20;
controls.maxDistance = 40;
controls.minPolarAngle = 0.7;
controls.maxPolarAngle = 1.3;
controls.autoRotate = false;
controls.autoRotateSpeed = 0.5;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const spotLight = new THREE.SpotLight(0xffffff, 3000, 500, 1.22, 2);
spotLight.position.set(10, 20, 30);
spotLight.castShadow = false;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const loader = new GLTFLoader().setPath("src/assets/3D/room_model/");
loader.load(
  "proba.gltf",
  (gltf) => {
    const mesh = gltf.scene;
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    mesh.position.set(0, 1.05, -1);
    scene.add(mesh);

    document.getElementById("progress-container").style.display = "none";
  },
  (xhr) => {
    console.log(`loading ${(xhr.loaded / xhr.total) * 100}%`);
  },
  (error) => {
    console.error(error);
  }
);

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

scene.addEventListener("load", (event) => {
  console.log("asd ", event);
});
/* function applyGsap() {
        const tl = gsap.timeline({
    scrollTrigger: {
      markers: true,
      scrub: 1,
      pin: true,
      trigger: "canvas",
      start: "top 50%",
      endTrigger: ".canvas-wrap",
      end: "bottom 50%",
    },
  });

    tl.to(scene.children[1].children[1].position, {
    x:  5,
    duration: 1
  });
}
 */
  gsap.to(camera.position, {
    scrollTrigger: {
      markers: true,
      scrub: 1,
      pin: true,
      trigger: "canvas",
      start: "50% 50%",
      endTrigger: ".canvas-wrap",
      end: "50% 50%",
    },
    x: /* box.position.y + */ 10,
    duration: 1,
  });
onMounted(() => {
  document.body.appendChild(renderer.domElement);
  animate();


});

onUnmounted(() => {
  // Cleanup Three.js scene and renderer
  window.removeEventListener("resize", onWindowResize);
  controls.dispose();
  renderer.dispose();
  scene.clear();
  document.body.removeChild(renderer.domElement);
});

defineProps({
  msg: String,
});
</script>

<template>
  <div>
    <!-- <canvas class="model-3d"> </canvas> -->
    <div id="progress-container">
      <half-circle-spinner
        :animation-duration="1000"
        :size="80"
        color="white"
      />
      <!-- <div id="load-animation">DENI JE VIDAN</div> -->
    </div>
  </div>
</template>

<style scoped>
#progress-container {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

#progress {
  font-size: 3em;
  color: white;
}

#load-animation {
  position: absolute;
}
canvas {
  height: 500vh;
}
</style>
