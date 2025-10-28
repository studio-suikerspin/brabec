<script setup lang="ts">
import type { Content } from '@prismicio/client';

import { SectionEyebrow, SectionTitle } from '#components';

defineProps(
  getSliceComponentProps<Content.TestimonialCarouselSlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
);
</script>

<template>
  <section
    :id="`testimonial-carousel-${index}`"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="testimonials block-padding"
  >
    <div class="testimonials__inner">
      <SectionHeader>
        <PrismicRichText
          :field="slice.primary.subtitle"
          :components="{ paragraph: SectionEyebrow }"
        />

        <PrismicRichText
          :field="slice.primary.title"
          :components="{ heading2: SectionTitle }"
        />
      </SectionHeader>

      <div class="testimonials__main-wrap">
        <div class="avatars flex items-center gap-4 mx-auto">
          <UIAvatar
            v-for="({ author_avatar }, index) in slice.primary.testimonials"
            :key="index"
          >
            <PrismicImage :field="author_avatar" />
          </UIAvatar>
        </div>

        <SliderWrapper>
          <SliderItem
            v-for="(item, index) in [
              ...slice.primary.testimonials,
              ...slice.primary.testimonials,
              ...slice.primary.testimonials,
            ]"
            :key="index"
            :classes="['testimonials__carousel-item']"
          >
            <div class="testimonials__card-wrap">
              <svg
                class="testimonials__card-corner testimonials__card-corner--top-left"
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="30"
                viewBox="0 0 33 30"
                fill="none"
              >
                <path d="M33 0.5H0.5V29.5" stroke="#FF6E02" />
              </svg>
              <svg
                class="testimonials__card-corner testimonials__card-corner--top-right"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="33"
                viewBox="0 0 30 33"
                fill="none"
              >
                <path d="M0.5 0V32.5H29.5" stroke="#FF6E02" />
              </svg>
              <UICard class="testimonials__card">
                <PrismicRichText :field="item.text" />

                <div class="flex items-center gap-2">
                  <UIAvatar>
                    <PrismicImage :field="item.author_avatar" />
                  </UIAvatar>
                  <p class="text-sm">
                    {{ item.author_name }}, {{ item.author_role }}
                  </p>
                </div>
              </UICard>

              <svg
                class="testimonials__card-corner testimonials__card-corner--bottom-left"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="33"
                viewBox="0 0 30 33"
                fill="none"
              >
                <path d="M0.5 0V32.5H29.5" stroke="#FF6E02" />
              </svg>
              <svg
                class="testimonials__card-corner testimonials__card-corner--bottom-right"
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="30"
                viewBox="0 0 33 30"
                fill="none"
              >
                <path d="M0 29H32.5V0" stroke="#FF6E02" />
              </svg>
            </div>
          </SliderItem>

          <template #controls>
            <div class="testimonials__carousel-controls">
              <SliderControl
                type="prev"
                :classes="['testimonials__carousel-control']"
              >
                <i class="icon-arrow-left"></i>
              </SliderControl>
              <SliderControl
                type="next"
                :classes="['testimonials__carousel-control']"
              >
                <i class="icon-arrow-right"></i>
              </SliderControl>
            </div>
          </template>
        </SliderWrapper>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.testimonials {
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media screen and (min-width: 992px) {
      gap: 80px;
    }
  }

  &__main-wrap {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media screen and (min-width: 992px) {
      gap: 40px;
    }
  }

  &__carousel-item {
    width: calc(
      ((100% - 1px) - (var(--slider-spv) - 1) * var(--slider-gap)) /
        var(--slider-spv)
    );
    opacity: 0.5;
    transition: opacity 0.3s ease;
    height: 100%;
  }

  [data-gsap-slider-item-status='active'] {
    opacity: 1;
    transition: opacity 0.3s ease;

    .testimonials__card-corner {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  }

  &__card-wrap {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 16px;

    @media screen and (min-width: 992px) {
      padding: 24px;
    }
  }

  &__card .card__inner {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__card-corner {
    opacity: 0;
    position: absolute;
    width: 30px;
    height: 33px;

    transition: opacity 0.3s ease;

    &--top-left {
      top: 0;
      left: 0;
    }

    &--top-right {
      top: 0;
      right: 0;
      rotate: 180deg;
    }

    &--bottom-left {
      bottom: 0;
      left: 0;
    }

    &--bottom-right {
      bottom: 0;
      right: 0;
    }
  }

  &__carousel-controls {
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 16px;
  }

  &__carousel-control {
    display: flex;
    justify-content: center;
    align-items: center;

    aspect-ratio: 1 / 1;

    width: 48px;
    height: 48px;

    border-radius: 4px;
    background-color: var(--grey_block);
    color: var(--black);

    font-size: 24px;

    transition: opacity 0.3s ease;

    &:hover {
      color: var(--accent_primary);
    }

    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
      transition: opacity 0.3s ease;
    }
  }
}
</style>
