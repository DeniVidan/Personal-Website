<script setup>
import * as THREE from "three";
import { onMounted, onUnmounted, ref, render } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HalfCircleSpinner } from "epic-spinners";

gsap.registerPlugin(ScrollTrigger);

let scene = new THREE.Scene();
let renderer;

let canvasRef = ref();



/* const textureLoader = new THREE.TextureLoader();
textureLoader.setPath( 'src/assets/images/' ); */

/* const texture = new THREE.TextureLoader().load('src/assets/images/MaskaDeni.png' ); 

const material = new THREE.MeshBasicMaterial( { map:texture } ); */

var textureLoader = new THREE.TextureLoader();

/* let videoTexture = new THREE.VideoTexture(video) */

let resizeCallback = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix;
};

document.onkeydown = function (e) {
  if (e.key === "p") {
    video.addEventListener("playing", (event) => {
      //console.log(event.type)
      return event.type;
    });
    video.play();
  } else if (e.key === "x") {
    video.addEventListener("pause", (event) => {
      console.log("video is pause", event.type);
    });
    video.pause();
  }
};

const manager = new THREE.LoadingManager();
onMounted(() => {
  manager.onLoad = function ( ) {
	console.log( 'Loading complete!');
};

  let video = document.getElementById("video");
  let videoTexture = new THREE.VideoTexture(video);
video.addEventListener('loadeddata', function() {
    console.log("video redy")
    document.getElementById("loading-screen").style.display = "none"
}, false);

  var texture0 = textureLoader.load("src/assets/images/MaskaDeni.png");
  var texture1 = textureLoader.load("src/assets/images/lagan.mp4");
  var texture2 = textureLoader.load("src/assets/images/MaskaDeni.png");
  var texture3 = textureLoader.load("src/assets/images/MaskaDeni.png");
  var texture4 = textureLoader.load("src/assets/images/MaskaDeni.png");
  var texture5 = textureLoader.load("src/assets/images/MaskaDeni.png");

  var materials = [
    new THREE.MeshBasicMaterial({ map: texture0 }),
    new THREE.MeshBasicMaterial({ map: videoTexture }),
    new THREE.MeshBasicMaterial({ map: texture2 }),
    new THREE.MeshBasicMaterial({ map: texture3 }),
    new THREE.MeshBasicMaterial({ map: texture4 }),
    new THREE.MeshBasicMaterial({ map: texture5 }),
  ];

  let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  let boxMaterial = new THREE.MeshStandardMaterial({ color: "#f5f39f" });

  let box = new THREE.Mesh(boxGeometry, materials);
  box.position.set(0, 0, -2);
  scene.add(box);

  //LIGHTS

  let ambientLight = new THREE.AmbientLight("white", 1);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight("red", 0.8);
  directionalLight1.position.set(-10, 10, 0);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight("blue", 0.8);
  directionalLight2.position.set(20, 30, 0);
  scene.add(directionalLight2);

  let camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.y = 1;
  camera.position.z = 2;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  scene.add(camera);

  let loop = () => {
    /* box.rotation.y += 0.001; */
    renderer.render(scene, camera);
  };

  const tl = gsap.timeline({
    scrollTrigger: {
      markers: true,
      scrub: 1,
      pin: true,
      trigger: ".canvas",
      start: "50% 50%",
      endTrigger: ".canvas-wrap",
      end: "70% 50%",
    },
  });


  tl.to(box.rotation, {
    y: /* box.position.y + */ 10,
    duration: 1
  });



  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);

  renderer.setAnimationLoop(loop);

  window.addEventListener("resize", resizeCallback);

  //console.log("renderer: ", renderer.domElement);

});

onUnmounted(() => {

  renderer.setAnimationLoop(null);
  window.removeEventListener("resize", resizeCallback);
});
</script>

<template>
  <div class="canvas-wrap" style="height: 500vh">
    <div id="loading-screen">
      <half-circle-spinner
        class="animation-div"
        :animation-duration="1000"
        :size="80"
        color="white"
      />
    </div>
    <canvas class="canvas" ref="canvasRef"></canvas>
    <div id="video-wrap" style="position: absolute; top: 0; left: 25%">
      <video
        id="video"
        class="video"
        ref="video"
        style="position: absolute; display: none"
        width="420"
        height="360"
        loop
        muted
        autoplay
      >
        <source src="../assets/images/lagan.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<style scoped>
  #loading-screen {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .animation-div {
    align-self: center;
  }
</style>
