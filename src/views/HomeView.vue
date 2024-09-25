<script setup>
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { onMounted, onUnmounted, ref, render } from "vue";
import Scene3D from "../components/Scene3D.vue";
import { useRouter, useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(TextPlugin);

defineProps({});

const router = useRouter();
const route = useRoute();

onMounted(() => {
  let counterElement = document.querySelectorAll(".counter p");
  let loadingDiv = document.querySelector(".loading-div");

  document.addEventListener("scrollend", (e) => {
document.querySelector(".hero-title").style.setProperty("--line-height", "0px");
    
  });
  gsap.to(loadingDiv, {
    yPercent: -100,
    duration: 0.5,
    ease: "power3.in",
    delay: 0.4,
  });
  /*   gsap.to(".hero-title", {
    text: "VIDAN",
    delay: 2,
    duration: 2,
    repeat:-1,
    yoyo:true,
    preserveSpaces: false,
  }) */
  let heroSections = gsap.utils.toArray(".hero-title");
  console.log(heroSections);
  let heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapper",
      start: "top top",
      end: "=+1000",
      scrub: 0.5,
      pin: true,
      markers: true,
    },
  });

  heroSections.forEach((item, i) => {
    heroTimeline
      .to(
        item,
        {
          x: () => {
            if (i % 2 == 0) {
              return 1200 * (i + 1);
            } else return -1200 * (i + 1);
          },
          color: "transparent",
        },
        "<"
      )
      .to(
        item,
        {
          "--line-height": 500,
          "--x-height": -110,
          zIndex: i * -1,
        },
        "<"
      );
  });
  heroTimeline.to(
    ".image",
    {
      scale: 1,
      opacity: 1,
      duration: 0.1,
      /* onUpdate: () => console.log(heroTimeline) */
    },
    "0.1"
  ).to(".image", {x: 1000}, "0.2");

  /*   document.querySelector(".counter").addEventListener("mouseover", () => {
    gsap.to(counterElement, {
      y: -60,
      duration: 0.5,
      ease: "power4.out",
    });
  });
  document.querySelector(".counter").addEventListener("mouseleave", () => {
    gsap.to(counterElement, {
      y: -20,
      duration: 0.5,
      ease: "power4.out",
    });
  }); */
});
onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    <div class="loading-div"></div>
    <div class="hero">
      <div class="hero-title">DENI</div>
      <div class="hero-title">VIDAN</div>
      <div class="hero-title">Studio</div>
    </div>

    <div class="image">
      <img src="https://picsum.photos/seed/picsum/500/300" alt="" />
    </div>
    <!--     <div class="counter">
      <p>DENI</p>
      <p>DENI</p>
    </div> -->
    <!--     <div class="footer">
      <h1>FOTTER</h1>
    </div> -->
  </div>
</template>

<style scoped>
/* .footer {
  height: 500px;
  background-color: red;
  z-index: -2;
  position: absolute;
  bottom: 0%;
  width: 100%;
} */

.image {
  position: absolute;
  left: 0%;
  top: 0;
  scale: 0;
  width: 100%;
  opacity: 0;
}
.image > img {
  width: 50%;
}
.loading-div {
  background-color: rgb(8, 8, 8);
  width: 100vw;
  height: 100vh;
  z-index: 0;
}
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: -1;
}
.hero-title:before {
  content: "";
  position: absolute;
  width: 700%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--line-height);
  top: calc(50% + var(--x-height));
  background-color: black;
  
}
.hero-title {
  --x-height: 0%;
  --line-height: 0px;
  font-family: Sinera;
  font-size: 300px;
  line-height: 250px;
  display: flex;
  justify-content: center;
}
.counter {
  position: absolute;
  top: 50%;
  left: 50%;
  /* transform: translate(-50%, -50%); */
  width: 40px;
  height: 20px;
  text-align: center;
  overflow: hidden;
  z-index: 0;
  color: white;
}
.counter p {
  transform: translateY(-20px);
}

@font-face {
  font-family: Sinera;
  src: url(../assets/fonts/Sinera.ttf) format("truetype");
}
@font-face {
  font-family: Pavon;
  src: url(../assets/fonts/Pavon.otf) format("truetype");
}
@font-face {
  font-family: ExcaliburNouveau;
  src: url(../assets/fonts/Excalibur_Nouveau.ttf) format("truetype");
}
@font-face {
  font-family: RCDemo;
  src: url(../assets/fonts/R&C-Demo.otf) format("truetype");
}
@font-face {
  font-family: LazySketch;
  src: url(../assets/fonts/Lazy_Sketch.ttf) format("truetype");
}
@font-face {
  font-family: MonasDemo;
  src: url(../assets/fonts/Monas_Demo.ttf) format("truetype");
}
@font-face {
  font-family: moniqua;
  src: url(../assets/fonts/Variable-TT/font1.ttf) format("truetype");
}
@font-face {
  font-family: moniqua2;
  src: url(../assets/fonts/OpenType/Moniqa-ExtraBoldDisplay.ttf)
    format("truetype");
}
@font-face {
  font-family: moniquaItalic;
  src: url(../assets/fonts/OpenType/Moniqa-NarrowItalicDisplay.ttf)
    format("truetype");
}
@font-face {
  font-family: buttonFont;
  src: url(../assets/fonts/OpenType/Moniqa-BlackHeading.ttf) format("truetype");
}
@font-face {
  font-family: regularMoniqua;
  src: url(../assets/fonts/OpenType/Moniqa-MediumItalicParagraph.ttf)
    format("truetype");
}
@font-face {
  font-family: moniquaCardTitle;
  src: url(../assets/fonts/OpenType/Moniqa-BlackCondParagraph.ttf)
    format("truetype");
}
</style>
