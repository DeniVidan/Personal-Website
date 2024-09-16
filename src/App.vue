<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const route = useRoute();
let navImages = [
  "https://images.pexels.com/photos/866398/pexels-photo-866398.jpeg?cs=srgb&dl=pexels-ralph-chang-260364-866398.jpg&fm=jpg",
  "https://c4.wallpaperflare.com/wallpaper/292/446/516/ultra-wide-photography-wallpaper-preview.jpg",
  "https://www.adobe.com/creativecloud/photography/discover/media_14a70d05518088731e4ca4904415f2cec8641d72a.png?width=750&format=png&optimize=medium",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtojl7Nry10DrNratv8CWMdwGHE_5U04RvA&s",
];
onMounted(() => {
  let links = document.querySelectorAll(".navbar-anim");

  function proba () {
     let activeLink = document.getElementsByClassName("router-link-exact-active");
     //console.log(activeLink[0])
  }
 
/*   links.forEach(element => {
    element.classList.forEach(e => {
      console.log(e)
      if (e == "router-link-exact-active") {
        activeLink = element
      }
    });
  }); */
  proba()

  links.forEach((link, index) => {
    link.addEventListener("mouseover", (e) => {
      if (link.classList.length == 2) {
        link.style.setProperty("--before-width", "120%");
        link.style.setProperty(
          "--before-rotation",
          `${Math.floor(Math.random() * 11) - 5}deg`
        );
      }

      let classlist = link.classList;

      cursorBorder.style.setProperty("--size", "150px");
      cursorBorder.style.mixBlendMode = "difference";
      cursorBorder.style.background = "white";
      cursorBorder.style.setProperty("--cursor-image", `none`);

      gsap.to(link, {
        scale: 1.2,
        duration: 0.2,
        ease: "power3.out",
      });
    });

    link.addEventListener("mouseout", (e) => {
      link.style.setProperty("--before-width", "0%");
      cursorBorder.style.setProperty("--size", "50px");
      cursorBorder.style.background = `transparent`;
      cursorBorder.style.setProperty(
        "--cursor-image",
        `url(https://www.orthopedicare.com/wp-content/themes/socius/images/scroll-down.gif)`
      );

      if (link.classList.length == 2) {
        gsap.to(link, {
          scale: 1,
          duration: 0.2,
          ease: "power3.out",
        });
      }
    });
  });

  let nav_items = gsap.utils.toArray(".navbar-anim");

  const cursorBorder = document.querySelector("#cursor-border");

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
    //console.log(cursorBorderPos.x, cursorBorderPos.y)
    requestAnimationFrame(loop);
  });

  for (let i = 0; i < 4; i++) {
    document.querySelectorAll(".link")[i].firstChild.style.fontSize = "20px";
    document.querySelectorAll(".link")[i].lastChild.style.fontSize = "80px";
    document.querySelectorAll(".link")[i].firstChild.style.fontWeight = "500";
    document.querySelectorAll(".link")[i].lastChild.style.fontWeight = "700";
    document.querySelectorAll(".link")[i].firstChild.style.display = "contents";
  }
});

function hamburgerClick() {
  const icon = document.querySelector("#hamburgerIcon");
  const navigationLinks = document.querySelector(".links-container.mobile");

  icon.classList.toggle("open");
  navigationLinks.classList.toggle("open");
  gsap.fromTo(
    ".navbar-anim",
    {
      x: -500,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      stagger: {
        amount: 0.08,
        from: "start",
        ease: "power4.out",
      },
    }
  );
}
</script>

<template>
  <nav>
    <div class="brand-container">
      <div class="brand-logo">
        
      </div>
      <div class="brand-name">denividan@gmail.com</div>
    </div>
    <div class="links-container desktop">
      <ul>
        <a href=""><li>link</li></a>
        <a href=""><li>link</li></a>
        <a href=""><li>link</li></a>
        <a href=""><li>link</li></a>

        <!-- premade sections -->
        <!--             <a href="#section1"><li>link</li></a>
            <a href="#section2"><li>link</li></a>
            <a href="#section3"><li>link</li></a>
            <a href="#section4"><li>link</li></a> -->
      </ul>
    </div>

    <a id="hamburgerIcon" @click="hamburgerClick()" class="navbar-hamburger">
      <span aria-hidden="true"></span>
    </a>
    <!-- Navigation for mobile (initially hidden) -->
  </nav>
  <div class="links-container mobile">
    <ul>
      <RouterLink @click="hamburgerClick()" to="/" class="link navbar-anim">
        <div>001</div>
        <div>HOME</div>
      </RouterLink>
      <RouterLink
        @click="hamburgerClick()"
        to="/about"
        class="link navbar-anim"
      >
        <div>002</div>
        <div>ABOUT</div>
      </RouterLink>
      <RouterLink
        @click="hamburgerClick()"
        to="/mywork"
        class="link navbar-anim"
      >
        <div>003</div>
        <div>MY WORK</div>
      </RouterLink>
      <RouterLink
        @click="hamburgerClick()"
        to="/contact"
        class="link navbar-anim"
      >
        <div>004</div>
        <div>CONTACT</div>
      </RouterLink>

      <!-- premade sections -->
      <!-- 
            <a href="#section1"><li>link</li></a>
            <a href="#section2"><li>link</li></a>
            <a href="#section3"><li>link</li></a>
            <a href="#section4"><li>link</li></a>
             -->
    </ul>
  </div>
  <main style="width: 100vw">
    <div id="cursor-border"></div>
    <RouterView />
  </main>
</template>

<style scoped>
/* .router-link-active {
  color: #646cff
} */
/* *{
  cursor: none;
 } */

:root {
  --cursor-content: url(https://www.orthopedicare.com/wp-content/themes/socius/images/scroll-down.gif);
}
#cursor-border {
  /* mix-blend-mode: difference; */
  --size: 50px;
  --cursor-image: url(https://www.orthopedicare.com/wp-content/themes/socius/images/scroll-down.gif);
  position: fixed;
  top: calc(var(--size) / -2);
  left: calc(var(--size) / -2);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  /* box-shadow: 0 0 0 1px white; */
  background: transparent;

  pointer-events: none;
  transition: top 0.15s ease-out, left 0.15s ease-out, width 0.15s ease-out,
    height 0.15s ease-out, background-color 0.15s ease-out;
  z-index: 999;
}
#cursor-border::before {
  content: "";
  --cursor-content: var(--cursor-image);
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  position: absolute;
  color: red;
  mix-blend-mode: difference;
  background-image: var(--cursor-content);
  background-size: 100%;
  background-size: contain; /* Ensure the image covers the element */
  background-repeat: no-repeat;
  border-radius: 100%;
  transition: background-image 200ms ease;
}
#cursor-border.no-image::before {
  background-image: none;
}
@keyframes example {
  from {
    font-size: 5px;
  }
  to {
    font-size: 15px;
  }
}
.link.router-link-exact-active,
.link.router-link-active {
  color: #646cff;
  background-image: url("https://cc-prod.scene7.com/is/image/CCProdAuthor/wide-angle-lens_P6_720x264?$pjpeg$&jpegSize=200&wid=720");
  background-repeat: no-repeat;
  background-position: center; /* Center the image */
  background-size: cover;
  padding: 50px;
  background-color: rgba(0, 0, 0, 0.85);
  background-blend-mode: multiply;
  transform: scale(1.2);
}
.link.router-link-exact-active:nth-child(1),
.link.router-link-active:nth-child(1) {
  background-image: url("https://images.pexels.com/photos/866398/pexels-photo-866398.jpeg?cs=srgb&dl=pexels-ralph-chang-260364-866398.jpg&fm=jpg");
}
.link.router-link-exact-active:nth-child(2),
.link.router-link-active:nth-child(2) {
  background-image: url("https://c4.wallpaperflare.com/wallpaper/292/446/516/ultra-wide-photography-wallpaper-preview.jpg");
}
.link.router-link-exact-active:nth-child(3),
.link.router-link-active:nth-child(3) {
  background-image: url("https://www.adobe.com/creativecloud/photography/discover/media_14a70d05518088731e4ca4904415f2cec8641d72a.png?width=750&format=png&optimize=medium");
}
.link.router-link-exact-active:nth-child(4),
.link.router-link-active:nth-child(4) {
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtojl7Nry10DrNratv8CWMdwGHE_5U04RvA&s");
}
.link::before {
  position: absolute;
  content: "";
  width: var(--before-width, 0%);
  height: 5px;
  border-radius: 100%;
  top: 50%;
  background-color: red;
  transform: rotate(var(--before-rotation));
  transition: 150ms ease-in-out;
}
.link {
  color: #adadadff;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
:root {
  --navColor: #1f1f1fe5;
  --mainBackground: #222222;
}
body {
}

* {
  padding: 0;
  margin: 0;
}

header {
  position: absolute;
  max-height: 400px;
  min-height: 60px;
  display: flex;
  align-self: center;
}
nav {
  top: 0;
  left: 0;
  z-index: 1;
  position: fixed;
  height: 60px;
  color: white;
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(15px);
}
.brand-container {
  display: flex;
  gap: 10px;
}
.brand-name {
  font-size: 13px;
  align-self: center;
  cursor: pointer;
}
.brand-logo {
  align-self: center;
}
.brand-logo > img {
  display: flex;
  cursor: pointer;
}

.links-container {
  align-self: center;
}

ul {
  display: flex;
  gap: 20px;
  list-style-type: none;
}
/* li {
  cursor: pointer;
  color: #adadadff;
}
li:hover {
  cursor: pointer;
  color: #e6e6e6;
} */
ul > a > li {
  position: relative;
}

ul a li::after {
  content: "";
  position: absolute;
  width: 0;
  height: 4px;
  bottom: -7px;
  left: 50%;
  /* Start from the middle */
  transform: translateX(-50%); /* Center the line */
  background-color: #61ff61;
  transition: width 200ms ease-out, left 200ms ease-out;
}

ul a:hover li::after {
  width: 100%;
  /* Move to the left edge */
}

a {
  text-decoration: none;
}

.link {
  display: flex;
  justify-content: space-between;
  font-family: "DM Serif Display";
  font-weight: 400;
  font-style: italic;
  text-transform: lowercase;
}

.navbar-hamburger {
  display: flex;
  cursor: pointer;
  position: relative;
  width: 70px;
  justify-content: center;
}
.navbar-hamburger > span {
  position: absolute;
  width: 35%;
  height: 2px;
  background-color: white;
  top: 50%;
  border-radius: 2px;
}
.navbar-hamburger > span::before {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: white;
  top: -450%;
  left: 0;
  content: "";
  border-radius: 2px;
  transition: transform 0.3s ease-in-out;
}
.navbar-hamburger > span::after {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: white;
  top: 450%;
  left: 0;
  content: "";
  border-radius: 2px;
  transition: transform 0.3s ease-in-out;
}
.navbar-hamburger.open > span {
  transform: rotate(180deg);
  background-color: transparent;
  transition: transform 0.3s ease-in-out;
}
.navbar-hamburger.open > span::before {
  transform: translateY(9px) rotate(45deg);
}
.navbar-hamburger.open > span::after {
  transform: translateY(-9px) rotate(-45deg);
}

.links-container.mobile {
  top: 0;
  left: 0;
  display: flex;
  z-index: 0;
}
.links-container.desktop {
  display: none;
}

@media (max-width: 2025px) {
  .navbar-hamburger {
    display: flex;
  }
  .links-container.mobile {
    background-color: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(15px);
    width: 100%;
    /* transform: translateY(-100px); */
    opacity: 0;
    top: -100vh;
    position: fixed;
    display: flex;
    justify-content: center;
    transition: 300ms ease-out;
    z-index: 1;
  }
  .links-container.mobile > ul {
    display: flex;
    flex-direction: column;
    /* transition: 200ms ease-out; */
  }

  .links-container.mobile.open {
    display: flex;
    top: 0vh;
    height: calc(
      100vh - 60px
    ); /* Adjust the max-height to your content height */
    transform: translateY(60px);
    opacity: 1;
    transition: 0.4s ease-out;
  }
  .links-container.mobile.open > ul {
    align-self: center;
    font-size: 80px;
    font-weight: bolder;
  }
  .links-container.mobile.open > ul > a {
    font-weight: bolder;
    align-self: flex-start;
    gap: 50px;
    width: 100%;
  }

  .links-container.desktop {
    display: none;
  }
  nav {
    justify-content: space-between;
  }
  .brand-container {
    margin-left: 20px;
  }
  .navbar-hamburger {
  }
}
</style>
