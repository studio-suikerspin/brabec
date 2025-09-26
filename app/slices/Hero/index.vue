<script setup lang="ts">
import { AgendaStatus } from "#components";
import type { Content } from "@prismicio/client";

const { gsap } = useGsap()

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

const bg1 = "linear-gradient(225deg, rgba(255,179,153,.8), rgba(255,179,153,0) 70.71%), linear-gradient(135deg, rgba(255,159,102,.7), rgba(255,159,102,0) 70.71%), linear-gradient(315deg, rgba(255,140,66,.9), rgba(255,140,66,0) 70.71%)";
const bg2 = "linear-gradient(200deg, rgba(255,165,102,.7), rgba(255,165,102,0) 70.71%), linear-gradient(120deg, rgba(255,143,51,.8), rgba(255,143,51,0.1) 70.71%), linear-gradient(340deg, rgba(255,119,34,.6), rgba(255,119,34,0) 70.71%)";

onMounted(() => {
  gsap.fromTo(".hero__inner", {
    background: bg1
  }, {
    ease: "none", 
    duration: 6, 
    background: bg2, 
    // repeat: -1, 
    yoyo: true
  });
})
</script>

<template>
  <section
    :class="`hero hero--${slice.variation}`"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
  <div class="hero__inner">
      <AppHeader />

      <AgendaStatus :agenda="slice.primary.agenda[0]"/>

      <PrismicRichText :field="slice.primary.heading" />

      <PrismicRichText :field="slice.primary.subtitle" wrapper="div" class="hero__subtitle" />

      <div class="button-group">
        <template v-for="link in slice.primary.ctas" :key="link.key">
          <UIButton 
            :href="link.url ? link.url : undefined" 
            variant="white">
            {{ link.text }}
          </UIButton>
        </template>

        <div class="trusted-by">
          <div class="avatars">

            <div class="circle-avatar">
              <img src="https://api.samplefaces.com/face?width=100">
            </div>
            <div class="circle-avatar">
              <img src="https://api.samplefaces.com/face?width=100">
            </div>
            <div class="circle-avatar">
              <img src="https://api.samplefaces.com/face?width=100">
            </div>
            <div class="circle-avatar">
              <img src="https://api.samplefaces.com/face?width=100">
            </div>
          </div>
          <span class="title">Trusted by leaders</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.hero {
  padding: 16px;
  background: var(--grey_block);
  
  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 24px;

    border-radius: 30px;

    padding-inline: 24px;

    height: 90svh;
    min-height: 500px;

    @media screen and (min-width: 992px) {
      border-radius: 60px;
      padding: 50px;
    }
  }

  h1 {
    font-size: clamp(2.25rem, 0.4158rem + 7.5248vw, 7rem);
    font-weight: 600;
    line-height: 100%;
    max-width: 966px;
    text-align: center;
  }

  &__subtitle {
    font-size: 18px;
    text-wrap: balance;
    max-width: 460px;
    text-align: center;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    @media screen and (min-width: 992px) {
      flex-direction: row;
    }
  }

  .trusted-by {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .avatars {
      display: flex;
      align-items: center;
    }

    .circle-avatar {
      margin-right: -5px;
      
      width: 27px;
      height: 27px;
      border-radius: 100px;
      overflow: clip;

      img {
        object-fit: cover;
        object-position: center;
      }
    }

    .title {
      font-size: 10px;
      opacity: 0.5;
    }
  }

  @media screen and (min-width: 992px) {
    padding: 22px;
  }
}
</style>