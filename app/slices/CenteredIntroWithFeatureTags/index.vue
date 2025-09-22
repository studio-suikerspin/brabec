<script setup lang="ts">
import type { Content } from "@prismicio/client";
import FeatureTag from "~/components/UI/FeatureTag.vue";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.CenteredIntroWithFeatureTagsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <section 
    class="centered-intro" 
    :data-slice-type="slice.slice_type" 
    :data-slice-variation="slice.variation"
    data-parallax="trigger"
  >
    <div class="container">
      <FeatureTag v-for="item in slice.primary.feature_tags" :key="item.key" :item="item" />

      <div class="centered-intro__inner">
        <PrismicRichText :field="slice.primary.title" />
      </div>
    </div>

  </section>
</template>

<style lang="scss">
.centered-intro {
  position: relative;
  background: white;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;

    padding-block: 200px 100px;

    h2 {
      font-size: clamp(1.5rem, 0.7277rem + 3.1683vw, 3.5rem);
      font-weight: 700;
      line-height: 130%;
      text-align: center;

      text-wrap: balance;
    }
  }

  .feature-tag {
    position: absolute;
    z-index: 5;
  }

  .feature-tag:nth-child(1) {
    top: 150px;
    left: 70px;
    rotate: -5deg;
  }

  .feature-tag:nth-child(2) {
    top: 150px;
    right: 50px;
    rotate: 2deg;
  }

  .feature-tag:nth-child(3) {
    bottom: 50px;
    left: 60px;
    rotate: -2deg;
  }

  .feature-tag:nth-child(4) {
    bottom: 40px;
    right: 75px;
    rotate: 7.5deg;
  }
}
</style>