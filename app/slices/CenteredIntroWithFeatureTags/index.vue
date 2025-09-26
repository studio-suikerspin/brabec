<script setup lang="ts">
import type { Content } from "@prismicio/client";

// Components
import FeatureTag from "~/components/UI/FeatureTag.vue";
import RevealType from "~/components/UI/RevealType.vue";

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
    class="centered-intro block-padding" 
    :data-slice-type="slice.slice_type" 
    :data-slice-variation="slice.variation"
    data-parallax="trigger"
  >
    <div class="container">
      <div class="centered-intro__inner">
        <FeatureTag v-for="(item, index) in slice.primary.feature_tags" :key="index" :item="item" />

        <PrismicRichText 
          :field="slice.primary.title" 
          :components="{
            heading2: RevealType
          }" 
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.centered-intro {
  background: var(--white);

  &__inner {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    padding-inline: 16px;

    .reveal-type {
      font-size: clamp(1.5rem, 0.7277rem + 3.1683vw, 3.5rem);
      font-weight: 700;
      line-height: 130%;
      text-align: center;

      text-wrap: balance;
    }
  }

  .feature-tag {
    display: none;

    position: absolute;
    z-index: 5;

    @media screen and (min-width: 992px) {
      display: flex;
    }
  }

  .feature-tag:nth-child(1) {
    top: -50px;
    left: 20px;
    rotate: -5deg;
  }

  .feature-tag:nth-child(2) {
    top: -50px;
    right: 50px;
    rotate: 2deg;
  }

  .feature-tag:nth-child(3) {
    bottom: -50px;
    left: 30px;
    rotate: -2deg;
  }

  .feature-tag:nth-child(4) {
    bottom: -60px;
    right: 0px;
    rotate: 7.5deg;
  }
}
</style>