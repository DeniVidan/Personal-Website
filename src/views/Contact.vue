<script setup>
import * as THREE from "three";
import { onMounted, onUnmounted, ref, render } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);
let progress_count = ref("001");
onMounted(() => {
  let progressSpan = document.querySelector(".progress-span");
  progressSpan.style.setProperty("--progress-width", "70%");
  let iteration = 0; // gets iterated when we scroll all the way to the end or start and wraps around - allows us to smoothly continue the playhead scrubbing in the correct direction.

  // set initial state of items
  gsap.set(".cards li", { xPercent: 250, opacity: 0, scale: 0 });
  gsap.set(".title", { opacity: 0, xPercent: 100 });

  const spacing = 0.2, // spacing of the cards (stagger)
    snapTime = gsap.utils.snap(spacing), // we'll use this to snapTime the playhead on the seamlessLoop
    cards = gsap.utils.toArray(".cards li"),
    // this function will get called for each element in the buildSeamlessLoop() function, and we just need to return an animation that'll get inserted into a master timeline, spaced
    animateFunc = (element, index) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { scale: 0.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
          immediateRender: false,
          onUpdate: () => {
            // Controlla se la card è al centro (xPercent vicino a 0)
            const progress = tl.progress();
            if (progress >= 0.33 && progress <= 0.55) {
              // Se la card è centrale, mostra il titolo
              gsap.to(element.querySelector(".title"), {
                xPercent: 0,
                opacity: 1,
                duration: 0.3,
              });
            } else if (progress <= 0.33) {
              gsap.to(element.querySelector(".title"), {
                opacity: 0,
                duration: 0.3,
                xPercent: 100,
              });
            } else if (progress >= 0.35) {
              gsap.to(element.querySelector(".title"), {
                opacity: 0,
                duration: 0.3,
                xPercent: -100,
              });
            }
          },
        }
      ).fromTo(
        element,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
        0
      );
      return tl;
    },
    seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc),
    playhead = { offset: 0 }, // a proxy object we use to simulate the playhead position, but it can go infinitely in either direction and we'll just use an onUpdate to convert it to the corresponding time on the seamlessLoop timeline.
    wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()), // feed in any offset (time) and it'll return the corresponding wrapped time (a safe value between 0 and the seamlessLoop's duration)
    scrub = gsap.to(playhead, {
      // we reuse this tween to smoothly scrub the playhead on the seamlessLoop
      offset: 0,
      onUpdate() {
        seamlessLoop.time(wrapTime(playhead.offset)); // convert the offset to a "safe" corresponding time on the seamlessLoop timeline
      },
      duration: 0.5,
      ease: "power3.out",
      paused: true,
    }),
    trigger = ScrollTrigger.create({
      start: 0,
      onUpdate(self) {
        let scroll = self.scroll();
        /* console.log(self.direction) */
        progress_count.value =
          "00" + Math.floor(Math.floor(self.progress * 100) / 14 + 1);
        progressSpan.style.setProperty(
          "--progress-width",
          Math.floor(self.progress * 100) + "%"
        );
        if (scroll > self.end - 1) {
          wrap(1, 2);
        } else if (scroll < 1 && self.direction < 0) {
          wrap(-1, self.end - 2);
        } else {
          scrub.vars.offset =
            (iteration + self.progress) * seamlessLoop.duration();
          scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
        }
      },
      end: "+=8000",
      pin: ".gallery",
    }),
    // converts a progress value (0-1, but could go outside those bounds when wrapping) into a "safe" scroll value that's at least 1 away from the start or end because we reserve those for sensing when the user scrolls ALL the way up or down, to wrap.
    progressToScroll = (progress) =>
      gsap.utils.clamp(
        1,
        trigger.end - 1,
        gsap.utils.wrap(0, 1, progress) * trigger.end
      ),
    wrap = (iterationDelta, scrollTo) => {
      iteration += iterationDelta;
      trigger.scroll(scrollTo);
      trigger.update(); // by default, when we trigger.scroll(), it waits 1 tick to update().
    };

  // when the user stops scrolling, snap to the closest item.
  ScrollTrigger.addEventListener("scrollEnd", () => {
    scrollToOffset(scrub.vars.offset);
  });

  // feed in an offset (like a time on the seamlessLoop timeline, but it can exceed 0 and duration() in either direction; it'll wrap) and it'll set the scroll position accordingly. That'll call the onUpdate() on the trigger if there's a change.
  function scrollToOffset(offset) {
    // moves the scroll playhead to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary.
    let snappedTime = snapTime(offset),
      progress =
        (snappedTime - seamlessLoop.duration() * iteration) /
        seamlessLoop.duration(),
      scroll = progressToScroll(progress);
    if (progress >= 1 || progress < 0) {
      return wrap(Math.floor(progress), scroll);
    }
    trigger.scroll(scroll);
  }

  /* document.querySelector(".next").addEventListener("click", () => scrollToOffset(scrub.vars.offset + spacing));
document.querySelector(".prev").addEventListener("click", () => scrollToOffset(scrub.vars.offset - spacing));
 */

  function buildSeamlessLoop(items, spacing, animateFunc) {
    let rawSequence = gsap.timeline({ paused: true }), // this is where all the "real" animations live
      seamlessLoop = gsap.timeline({
        // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
        paused: true,
        repeat: -1, // to accommodate infinite scrolling/looping
        onRepeat() {
          // works around a super rare edge case bug that's fixed GSAP 3.6.1
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
        onReverseComplete() {
          this.totalTime(this.rawTime() + this.duration() * 100); // seamless looping backwards
        },
      }),
      cycleDuration = spacing * items.length,
      dur,
      dur2; // the duration of just one animateFunc() (we'll populate it in the .forEach() below...

    // loop through 3 times so we can have an extra cycle at the start and end - we'll scrub the playhead only on the 2nd cycle
    items
      .concat(items)
      .concat(items)
      .forEach((item, i) => {
        let anim = animateFunc(items[i % items.length]);
        /* console.log(item.querySelector(".title")) */

        rawSequence.add(anim, i * spacing);

        dur || (dur = anim.duration());
      });

    // animate the playhead linearly from the start of the 2nd cycle to its end (so we'll have one "extra" cycle at the beginning and end)
    seamlessLoop.fromTo(
      rawSequence,
      {
        time: cycleDuration + dur / 2,
      },
      {
        time: "+=" + cycleDuration,
        duration: cycleDuration,

        ease: "none",
      }
    );

    return seamlessLoop;
  }

  // below is the dragging functionality (mobile-friendly too)...
  Draggable.create(".drag-proxy", {
    type: "x",
    trigger: ".cards",
    onPress() {
      this.startOffset = scrub.vars.offset;
    },
    onDrag() {
      scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
      scrub.invalidate().restart(); // same thing as we do in the ScrollTrigger's onUpdate
    },
    onDragEnd() {
      scrollToOffset(scrub.vars.offset);
    },
  });
});

onUnmounted(() => {});
</script>

<template>
  <div class="gallery">
    <div
      style="
        position: absolute;
        bottom: 15%;
        left: 5%;
        font-family: buttonFont;
        font-size: 20px;
      "
    >
      all projects
    </div>
    <div class="progress-section">
      <div class="progress-span"></div>
      <span>{{ progress_count }} / 007</span>
    </div>
    <ul class="cards">
      <li>
        <div class="title">PRVI RAD</div>
        <div class="content">
          <img src="https://picsum.photos/seed/picsum/500/300" alt="" />
        </div>
      </li>
      <li>
        <div class="title">DRUGI RAD</div>
        <div class="content">
          <img src="https://picsum.photos/seed/picsum/500/300" alt="" />
        </div>
      </li>
      <li>
        <div class="title">TREĆI RAD</div>
        <div class="content">
          <img src="https://picsum.photos/seed/picsum/500/300" alt="" />
        </div>
      </li>
      <li>
        <div class="title">ČETVRTI RAD</div>
        <div class="content">
          <img src="https://picsum.photos/seed/picsum/500/300" alt="" />
        </div>
      </li>
      <li>
        <div class="title">PETI RAD</div>
        <div class="content">
          <img src="https://picsum.photos/seed/picsum/500/300" alt="" />
        </div>
      </li>
      <li>
        <div class="title">ŠESTI RAD</div>
        <div class="content">
          <img src="https://picsum.photos/seed/picsum/500/300" alt="" />
        </div>
      </li>
      <li>
        <div class="title">SEDMI RAD</div>
        <div class="content">
          <img src="https://picsum.photos/seed/picsum/500/300" alt="" />
        </div>
      </li>
    </ul>
  </div>
  <div class="drag-proxy"></div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.progress-section {
  font-family: buttonFont;
  display: flex;
  gap: 10px;
  position: absolute;
  bottom: 15%;
  right: 5%;
  align-items: center;
}
.progress-span {
  --progress-width: 17px;
  display: flex;
  align-items: center;
  width: 70px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.158);

}
.progress-span::after {
  content: "";
  top: 50%;
  width: calc(var(--progress-width) + 14%);
  height: 2px;
  background-color: white;
  transition: all 0.5s ease-out;
}
.title {
  font-family: moniquaCardTitle;
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 10rem;
  left: -25%;
  font-weight: bold;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
  color: transparent;
  z-index: 1;
}
.content > img {
  filter: brightness(80%);
  z-index: 0;
  transition: all 0.25s ease-out;
}
.content {
  overflow: hidden;
  height: 100%;
}
li:hover img {
  transform: scale(1.15);
  overflow: hidden;
}

body {
  background: #111;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  /*   overflow-x: hidden; */
}
.gallery {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.cards {
  position: absolute;
  width: 500px;
  height: 300px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cards li {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 500px;
  height: 300px;
  text-align: center;
  font-size: 2rem;
  font-family: sans-serif;
  background-color: #9d7cce;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0.8rem;
}

a {
  color: #88ce02;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.drag-proxy {
  visibility: hidden;
  position: absolute;
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
