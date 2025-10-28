<script setup lang="ts">
import type { Content } from '@prismicio/client';

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ImageStackSlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
);

const { gsap } = useGsap();

function initStackingCardsParallax() {
  const cards = document.querySelectorAll('[data-stacking-cards-item]');

  if (cards.length < 2) return;

  cards.forEach((card, i) => {
    // Skip the last card - it doesn't need animation
    if (i === cards.length - 1) return;

    // Find the image inside the current card
    const cardImage = card.querySelector('[data-stacking-cards-img]');

    // Use the next card as the trigger
    const nextCard = cards[i + 1];
    if (!nextCard) return;

    const tl = gsap.timeline({
      defaults: {
        ease: 'none',
        duration: 1,
      },
      scrollTrigger: {
        trigger: nextCard,
        start: 'top bottom',
        end: 'top center',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // Scale down and rotate the current card as next card comes in
    tl.fromTo(
      cardImage,
      { scale: 1, rotate: 0, yPercent: 0 },
      { scale: 0.95, rotate: -3, yPercent: -5 },
    );
  });
}

function makeMarqueeFixed() {
  const section = document.querySelector('.image-stack');
  const marquee = document.querySelector('.image-stack__marquee');

  if (!marquee || !section) return;

  window.addEventListener('scroll', () => {
    // const sectionTop = section.getBoundingClientRect().top > 0;
    // const sectionBottom = section.getBoundingClientRect().bottom - window.innerHeight < 0;
    // if (inViewport) {
    //   marquee.classList.remove("image-stack__marquee--fixed");
    // } else {
    //   marquee.classList.add("image-stack__marquee--fixed");
    // }
  });
}

onMounted(() => {
  initStackingCardsParallax();
  makeMarqueeFixed();
});
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="image-stack"
  >
    <div class="image-stack__inner">
      <div class="stacking-cards__collection">
        <div class="stacking-cards__list">
          <div
            v-for="(image, index) in slice.primary.images"
            :key="index"
            data-stacking-cards-item
            class="stacking-cards__item"
          >
            <img
              :src="image.image.url"
              :alt="image.image.alt || ''"
              data-stacking-cards-img
            />
          </div>
        </div>
      </div>
    </div>

    <div class="image-stack__marquee">
      <CSSMarquee>
        <div
          v-for="(item, index) in slice.primary.marquee_items"
          :key="index"
          class="marquee-css__item"
        >
          <p class="marquee-css__item-p">{{ item.marquee_text }}</p>
          <img
            class="marquee-css__item-svg"
            src="/assets/vectors/marquee-separator.svg"
            alt=""
          />
        </div>
      </CSSMarquee>
    </div>
  </section>
</template>

<style lang="scss">
.image-stack {
  position: relative;

  &__inner {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .stacking-cards__collection {
    width: 100%;
  }

  .stacking-cards__list {
    flex-flow: column;
    display: flex;
  }

  .stacking-cards__item {
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    display: flex;
    position: sticky;
    top: 0;

    img {
      max-width: 80vw;
      width: 400px;
      aspect-ratio: 3 / 4;
      will-change: transform;
    }
  }
}

.image-stack__marquee {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 50vh;

  width: 100%;

  .marquee-css {
    position: sticky;
    top: 50vh;
  }

  .marquee-css__item-p {
    color: rgba(0, 0, 0, 0.2);
    font-family: Inter;
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    text-transform: uppercase;
  }
}
</style>
