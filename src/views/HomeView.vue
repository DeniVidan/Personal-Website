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
    document
      .querySelector(".hero-title")
      .style.setProperty("--line-height", "0px");
  });
  gsap.to(loadingDiv, {
    yPercent: -100,
    duration: 0.5,
    ease: "power3.in",
    delay: 0.4,
  });
  /*   let heroSections = gsap.utils.toArray(".hero-title");
  console.log(heroSections); */
  /* let heroTimeline = gsap.timeline({
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
      // onUpdate: () => console.log(heroTimeline) 
    },
    "0.1"
  ).to(".image", {x: 1000}, "0.2");
 */
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
  let divider = gsap.timeline({
    scrollTrigger: {
      trigger: ".divider",
      start: "center bottom",
      end: "bottom top",
      scrub: 1,
      markers: true,
      yoyo: true,
      
    }
  })
  let dividers = gsap.utils.toArray(".divider-image img")
  dividers.forEach((element, index) => {
    divider.to(element, {
    rotateZ: () => {
      if(index%2==0) {
        return 180
      } else return -180
    },
  }, "<")
  });
  


  let heroSections = gsap.utils.toArray(".hero .hero-title");
  heroSections.forEach((element, index) => {
    gsap.from(element, {
      x: () => {
          if(index == 0) {
            return -1200
          }
          else return 1200
        },
        opacity: 0,
        duration: 0.8,
        delay: 1,
        ease: "back.out(1)"
    })
  });


  console.log(heroSections)
  let heroScroller = gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapper",
      start: "top top",
      end: "=+800",
      scrub: 1,
      pinSpacer: true,
      /* markers: true, */
    },
  });
  heroSections.forEach((element, index) => {
    heroScroller.to(
      element,
      {
        /* y: -100 * (index + 1), */
        x: () => {
          if(index == 0) {
            return -1200
          }
          else return 1200
        },
        opacity: 0,
        ease: "none"
      },
      "<"
    );
  });

  gsap.from(".content", {
    y: 200,
    duration: 1,
    ease: "power3.out",
    stagger: 1,
    opacity: 0,
    scrollTrigger: {
      trigger: ".content h1",
      start: "top bottom",
      end: "top bottom-=250px",
      toggleActions: "play pause resume reset"

      /* markers: true */
    },
  });

  ScrollTrigger.create({
    trigger: ".footer",
    pin: true,
    start: "center-=100px bottom-=250px",
    end: "+=70%",
    scrub: 1,
    /* markers: true, */
    pinSpacer: true,
    pinSpacing: true,
  });

  let spans = gsap.utils.toArray(".content span");
  /* console.log(spans); */

  spans.forEach((span, index) => {
    gsap.to(span, {
      backgroundPositionX: 0,
      ease: "none",
      zIndex: 1,
      scrollTrigger: {
        trigger: span,
       /*  markers: true, */
        scrub: 1,
        start: "top center+=150px",
        end: "bottom+=50px center+=150px",
      },
    });
  });
});

onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    <!-- <div class="loading-div"></div> -->
    <div class="hero">
      <div class="hero-title" style="transform: translate(-200px, 0px)">
        <div style="display: flex">
          <span>DENI</span>
          <img
            class="image-1"
            src="../assets/images/deni_landscape.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="hero-title" style="transform: translate(200px, 0px)">
        <span>VIDAN</span>
        <img class="image-2" src="../assets/images/deni_nog.jpg" alt="" />
      </div>
      <!--       <div class="image"></div> -->
      <!--       <div class="pattern">
        <img src="../assets/images/pattern.jpg" alt="" />
      </div> -->
      <!--<div class="hero-title">Studio</div>-->
    </div>

    <div class="divider">
<!--       <div class="divider-line">
        
      </div> -->
      <div class="divider-image">
        <img src="../assets/images/wind-rose.png" alt="">
      </div>
            <div class="divider-image">
        <img src="../assets/images/wind-rose.png" alt="">
      </div>
    </div>

    <div class="content">
      <h1>
        <span>Lorem ipsum dolor sit amet consectetur</span><br />
        <span>elit. Vitae, sit suscipit nescinut veniam</span><br />
        <span>voluptatibus soluta obcaecati aliquam</span><br />
        <span>explicabo temporibus deleniti unde hic sed</span><br />
        <span>veniam sapiente, expedita voluptatum</span><br />
        <span>dignissimos sequi illum doloremque</span><br />
        <span>architecto nesciunt saepe animi qui dicta, id</span><br />
        <span>repellat. Corporis laudantium, voluptatum</span><br />
        <span>rem, repudiandae quam accusantium</span><br />
        <span>sapiente voluptas tenetur laborum enim vel</span><br />
        <span>unde pariatur ratione obcaecati error nam</span><br />
        <span>itaque, dolor optio neque nobis nemo quo.</span><br />
        <span>Vero, eaque inventore qui iste cum minus!</span><br />
        <span>Maxime eius officiis repellat impedit</span><br />
        <span>suscipit, delectus eveniet, animi at aliquid,</span><br />
        <span>iure placeat similique aspernatur ratione</span><br />
        <span>assumenda.</span>
      </h1>
    </div>

    <!--     <div class="counter">
      <p>DENI</p>
      <p>DENI</p>
    </div> -->
    <div class="footer">
      <div class="footer-wrap">
        <div class="big-letters">
          <span>D</span>
          <span>E</span>
          <span>N</span>
          <span>I</span>
        </div>
        <div class="footer-content">
          <h1>FOTTER</h1>
          <h1>FOTTER</h1>
          <h1>FOTTER</h1>
          <h1>FOTTER</h1>
          <h1>FOTTER</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content > h1 > span {
  background: linear-gradient(
    to right,
    rgb(255, 255, 255) 50%,
    rgb(37, 37, 37) 50%
  );
  background-size: 200% 100%;
  background-position-x: 100%;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  /*   margin-bottom: -250px; */
  /*   outline: 6px dotted teal; */
  line-height: 2;
  font-size: 70px;
}
.divider {
  display: flex;
}
.divider-line{
  position:absolute;
  height: 1px;
  top:105%;
  width: 100%;
  background-color: white;

}
.divider-image {
  width: 100px;
  height: 100px;
  margin: auto;
  background-color: black;
}
.divider-image img {
  opacity: 0.5;
}
.footer {
  height: 450px;
  background-color: darkblue;
  z-index: -2;
  width: 100%;
  position: relative;
  padding-bottom: 50px;
  margin: 0;
  margin-top: -550px;
}
.footer-wrap {
  display: flex;
  width: 100%;
}
.big-letters {
  font-family: RCDemo;
  font-size: 30rem;
  line-height: 1;
  letter-spacing: -30px;
}
.content {
  margin-top: 50px;
  z-index: 0;
  background-color: black;
}
.content h1 {
  opacity: 0.6;
  line-height: 5.5rem;
  margin: 0px 20px;
  text-align: start;
}
.image {
  position: absolute;
  top: 200px;
  left: 0%;
  width: 100%;
  z-index: 1;
}
.pattern {
  position: absolute;
  top: 23%;
  width: 100%;
  height: 400px;
  z-index: -2;
}
.pattern > img {
  opacity: 0.05;
  width: 80%;
  height: 120%;
  border-radius: 100%;
}

.hero-title img {
  position: absolute;
  top: 0;
  border-radius: 10px;
  width: 15rem;
  height: 15rem;
  z-index: -1;
  opacity: 1;
  mask-image: linear-gradient(
    to bottom,
    rgb(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 0) 120%
  );
}
.image-1 {
  transform: translate(670px, 0px);
    mask-image: linear-gradient(
    to bottom,
    rgb(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 0) 110%
  ) !important;
  transition: 2s all;
}

.image-2 {
  transform: translate(-500px, 0px);
  mask-image: linear-gradient(
    to bottom,
    rgb(0, 0, 0, 0.1) 10%,
    rgba(0, 0, 0, 1) 110%
  ) !important;
  transition: 2s all;
  transform-origin: center !important;
}

.loading-div {
  position: relative;
  background-color: rgb(8, 8, 8);
  width: 100vw;
  height: 100vh;
  z-index: 3;
}
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  top: 0;
  z-index: 0;
}
/* .hero-title:before {
  content: "";
  position: absolute;
  width: 700%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--line-height);
  top: calc(50% + var(--x-height));
  background-color: black;
  
} */
.hero-title {
  --x-height: 0%;
  --line-height: 0px;
  font-family: Glamora;
  font-size: 300px;
  line-height: 250px;
  display: flex;
  justify-content: center;
  z-index: 0;
  padding: 10px;
}
.hero-title span {
  opacity: 0.7;
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
  font-family: Glamora;
  src: url(../assets/fonts/GLAMORA.otf) format("truetype");
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
