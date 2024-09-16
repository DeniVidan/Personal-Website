<script setup>
import * as THREE from "three";
import { onMounted, onUnmounted, ref, render } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const animateCounter = () => {
  const counterElement = document.querySelector(".loader p");
  let currentValue = 0;
  const updateInterval = 300;
  const maxDuration = 2000;
  const endValue = 100;
  const startTime = Date.now();

  const updateCounter = () => {
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < maxDuration) {
      currentValue = Math.min(
        currentValue + Math.floor(Math.random() * 30) + 5,
        endValue
      );
      counterElement.textContent = currentValue;
      setTimeout(updateCounter, updateInterval);
    } else {
      counterElement.textContent = endValue;
      setTimeout(() => {
        gsap.to(counterElement, {
          y: -40,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut",
          onComplete: () => {
            console.log("gotov load");
          },
        });
      });
    }
  };
  updateCounter();
};

onMounted(() => {
  let text = document.querySelectorAll(".info");
  //console.log(text)

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".personal-info",
      pin: true, // pin the trigger element while active
      start: "center center", // when the top of the trigger hits the top of the viewport
      end: "+=2000", // end after scrolling 500px beyond the start
      scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      markers: true,
      pinSpacing: true,
      snap: {
        snapTo: 0.05,
        duration: { min: 0.55, max: 0.75 },
        delay: 0.1,
        ease: "power1.out",
      },
    },
  });
  /*   text.forEach((element, index) => {
    //console.log(element)
    tl2.fromTo(element, {
      opacity: 0,
      y: 500,
      duration: 1,
      
    }, {
      opacity: 1,
      ease: "power3.out",
      y: 0,
      duration: 3,
    }, "<").to(element, {
      y: -500,
      opacity: 0,
      ease: "power3.out",
      duration: 2,
      delay: 1
    })
  }); */
  text.forEach((element, index) => {
    //console.log(element)
    tl2
      .from(element, {
        opacity: 0,
        y: 500,
        duration: 1,
      })
      .to(element, {
        opacity: 1,
        ease: "power3.out",
        y: 0,
        duration: 3,
      })
      .to(element, {
        y: 0,
        duration: 1,
      })
      .to(element, {
        y: -500,
        opacity: 0,
        ease: "power3.out",
        duration: 2,
        delay: 1,
      });
  });

  /*   let aboutText = document.querySelector(".zoom-div p");

  let arrayText = aboutText.textContent.split(/^/gm);
  console.log(arrayText); */

  let tl = gsap.timeline({
    // yes, we can add it to an entire timeline!
    scrollTrigger: {
      trigger: ".start-div",
      pin: true, // pin the trigger element while active
      start: "top top", // when the top of the trigger hits the top of the viewport
      end: "+=1000", // end after scrolling 500px beyond the start
      scrub: 0.5, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      markers: false,
      pinSpacing: true,
      snap: {
        snapTo: "labels", // snap to the closest label in the timeline
        duration: { min: 0.5, max: 1 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        delay: 0.1, // wait 0.2 seconds from the last scroll event before doing the snapping
        ease: "power3.out", // the ease of the snap animation ("power3" by default)
        directional: false,
      },
    },
  });
  tl.to(".zoom-div", {
    backgroundColor: "black",
    height: 1100,
    scale: 2.5,
    width: 1000,
    duration: 1,
  })
    .to(".h1", {
      scale: 3,
      /*  x: 300, */
      delay: -0.8,
      duration: 1,
      ease: "power2.out",
    })
    .fromTo(
      ".zoom-div p",
      {
        opacity: 0,
        width: 200,
      },
      {
        opacity: 1,
        width: 400,
        delay: -1,
        ease: "power.in",
      }
    )
    .to(".zoom-div p", {
      scale: 1.2,

      duration: 1.5,
      delay: -0.5,
    })
    .to(".zoom-div p", {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      delay: -0.2,
    })
    .fromTo(
      ".contact-button",
      {
        opacity: 0,
        scale: 1,
        y: 0,
      },
      {
        opacity: 1,
        scale: 1.5,
        y: -400,
        delay: -2,
        duration: 0.5,
        ease: "power4.out",
        /* onStart: console.log("dadada"), */
      }
    )
    .to(".contact-button", {
      opacity: 0,
      y: -600,
      duration: 0.8,
      delay: -0.2,
      ease: "power4.out",
    });

  gsap.fromTo(
    ".loader p",
    {
      y: -300,
      opacity: 0,
    },
    {
      y: 0,
      duration: 1,
      ease: "power3.out",
      opacity: 1,
      delay: 0.3,
      onComplete: animateCounter,
    }
  );

  let sections = gsap.utils.toArray(".title");
  let images = gsap.utils.toArray(".image");

  const cursorBorder = document.querySelector("#cursor-border");
  const startTitle = document.querySelector("#h1");

  const cursorPos = { x: 0, y: 0 };
  const cursorBorderPos = { x: 0, y: 0 };

  document.addEventListener("mousemove", (e) => {
    cursorPos.x = e.clientX;
    cursorPos.y = e.clientY;

    cursorBorder.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  requestAnimationFrame(function loop() {
    const easting = 14;
    cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
    cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;

    cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;

    requestAnimationFrame(loop);
  });

  /* ADD EVENT LISTENERS */

  document.addEventListener("mouseover", (e) => {
    //console.log(e.target.textContent);
    if (
      e.target.tagName == "H1" ||
      e.target.tagName == "BUTTON" ||
      e.target.tagName == "P"
    ) {
      let text_mirror = e.target.textContent;
      /* console.log(text_mirror) */
      cursorBorder.style.setProperty("--size", "150px");
      cursorBorder.style.mixBlendMode = "difference";
      cursorBorder.style.background = `white`;
      cursorBorder.style.setProperty("--cursor-image", "none");
      //cursorBorder.style.setProperty("--tekst", "burek")
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (
      e.target.tagName == "H1" ||
      e.target.tagName == "P" ||
      e.target.tagName == "DIV"
    ) {
      cursorBorder.style.setProperty("--size", "50px");
      cursorBorder.style.background = `transparent`;
      cursorBorder.style.setProperty(
        "--cursor-image",
        `url(https://www.orthopedicare.com/wp-content/themes/socius/images/scroll-down.gif)`
      );
      //cursorBorder.style.setProperty("--tekst", "dada")
    }
  });

  gsap.from("#h1", {
    opacity: 0,
    y: 20,
    ease: "power2.out",
    stagger: 0.08,
    delay: 0.7,
  });
});

onUnmounted(() => {});
</script>

<template>
  <div class="flex-container">
    <!--     <div id="cursor"></div> -->
    <!-- <div id="cursor-border"></div> -->
    <div class="start-div">
      <h1 class="h1" id="h1">DENI's</h1>
      <div class="zoom-div">
        <p style="align-self: center">
          This is my personal portfolio— I ’m here to dominate the creative
          world—web design, branding, visuals—whatever it takes. Let’s go big.
        </p>
      </div>
      <h1
        class="h1"
        id="h1"
        style="font-family: moniquaItalic; font-size: 150px"
      >
        Portfolio
      </h1>
      <div class="loader"><p>0</p></div>

      <div class="contact-button">
        <button class=".button">CONTACT ME</button>
      </div>
    </div>
    <div class="personal-info">
      <div class="info">my name is Deni Vidan.</div>
      <div class="info">I'm 24 years old</div>
      <div class="info">I don't have any experience</div>
      <div class="info">just love learning</div>
      <div class="info">and being the best</div>
    </div>
    <div class="end-div">
      <h1>END</h1>
    </div>
  </div>
</template>

<style scoped>
.personal-info {
  margin: 100px 0px;
  padding: 100px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.info {
  font-size: 70px;
  font-family: regularMoniqua;
  position: absolute;
}
.contact-button {
  width: 100%;
  display: flex;
  justify-content: center;
}
button {
  padding: 10px 30px;
  position: absolute;
}
.flex-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  top: 0;
  width: 100vw;
  overflow-x: hidden !important;
}
#cursor {
  position: fixed;
  top: -5px;
  left: -5px;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  pointer-events: none;
  z-index: 999;
}
#cursor-border {
  --size: 50px;
  position: fixed;
  top: calc(var(--size) / -2);
  left: calc(var(--size) / -2);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  /* box-shadow: 0 0 0 1px white; */
  background: radial-gradient(
    circle at 18.7% 37.8%,
    rgb(250, 250, 250) 0%,
    rgb(225, 234, 238) 90%
  );
  pointer-events: none;
  transition: top 0.15s ease-out, left 0.15s ease-out, width 0.15s ease-out,
    height 0.15s ease-out, background-color 0.15s ease-out;
  z-index: 999;
}

.title {
  height: 500px;
  width: 100vw !important;
  background-color: rgb(8, 0, 56);
  display: flex;
  justify-content: center;
}

.title > h1,
.end-div > h1,
.start-div > h1 {
  /* position: absolute; */
  align-self: center;
  margin: 0;
}
.start-div {
  font-family: moniqua2;
  height: 1000px;
  background-color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h1 {
  font-size: 250px;
}
.zoom-div {
  display: flex;
  justify-content: center;
  height: 0px;
  width: 0%;
  align-self: center;
  background-color: red;
  z-index: 1;
}
.zoom-div > p {
  display: flex;

  align-items: center;
}
.loader {
  font-size: 40px;
}
.contact-button {
  z-index: 10;
  font-family: buttonFont;
  font-size: 1.2rem;
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
.end-div {
  height: 1000px;
  background-color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
}
.img-wrap {
  width: 100%;
  height: 300px;
  display: flex;
  /*   justify-content: center; */
}
.image {
  height: 300px;
  width: 200px;
  object-fit: cover;
  position: absolute;
}
</style>
