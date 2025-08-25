<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { gsap } from 'gsap';


// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.HeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
const b1 = "linear-gradient(217deg, rgba(255,0,0,.9), rgba(255,0,0,0) 70.71%),  linear-gradient(127deg, rgba(0,255,0,.9), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(0,0,255,.9), rgba(0,0,255,0) 70.71%)";
const b2 = "linear-gradient(17deg, rgba(255,0,0,.7), rgba(255,0,0,0) 70.71%), linear-gradient(200deg, rgba(0, 255, 0, .9), rgba(0,255,0,.2) 70.71%),  linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0.1) 70.71%)";

gsap.fromTo(".hero__inner", {background: b1}, {ease: "none", duration: 6, background: b2, repeat: -1, yoyo: true});
</script>

<template>
  <section
    :class="`hero hero--${slice.variation}`"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div class="hero__inner">
      {{ slice }}
    </div>
  </section>
</template>

<style lang="scss">
.hero {
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 16px);

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 60px;

    padding: 50px;

    height: 100%;
  }
}
</style>