<script setup lang="ts">
import type { Content } from '@prismicio/client';

import { SectionEyebrow, SectionTitle } from '#components';

const props = defineProps(
  getSliceComponentProps<Content.TestimonialCarouselSlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
);

// Ref to the slider wrapper component
const sliderWrapperRef = ref(null);

// Track active testimonial index (mapped to original array, not tripled)
const activeTestimonialIndex = ref(0);

// Navigate to a specific testimonial when avatar is clicked
function navigateToTestimonial(avatarIndex: number) {
  if (!sliderWrapperRef.value) return;

  // Calculate the center set index (since testimonials are tripled)
  const totalTestimonials = props.slice.primary.testimonials.length;
  const centerSetStartIndex = totalTestimonials;
  const targetSlideIndex = centerSetStartIndex + avatarIndex;

  // Call the goToSlide method exposed by SliderWrapper
  sliderWrapperRef.value.goToSlide(targetSlideIndex);
}

// Handle active slide change from slider
function handleActiveSlideChange(slideIndex: number) {
  const totalTestimonials = props.slice.primary.testimonials.length;
  // Map slide index back to original testimonial index
  activeTestimonialIndex.value = slideIndex % totalTestimonials;
}
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
            v-for="({ author_avatar }, avatarIndex) in slice.primary
              .testimonials"
            :key="avatarIndex"
            :class="[
              'testimonials__avatar',
              {
                'testimonials__avatar--active':
                  avatarIndex === activeTestimonialIndex,
              },
            ]"
            @click="navigateToTestimonial(avatarIndex)"
          >
            <PrismicImage :field="author_avatar" />
          </UIAvatar>
        </div>

        <SliderWrapper
          ref="sliderWrapperRef"
          @active-slide-change="handleActiveSlideChange"
        >
          <!-- Triple the testimonials array for seamless infinite scroll -->
          <SliderItem
            v-for="(item, index) in slice.primary.testimonials.concat(
              slice.primary.testimonials,
              slice.primary.testimonials,
            )"
            :key="`testimonial-${index}`"
            :classes="['testimonials__carousel-item']"
          >
            <div class="testimonials__card-wrap">
              <UICardCorner position="top-left" />
              <UICardCorner position="top-right" />
              <UICard class="testimonials__card">
                <PrismicRichText :field="item.text" />

                <div class="flex items-center gap-2">
                  <UIAvatar>
                    <PrismicImage :field="item.author_avatar" />
                  </UIAvatar>
                  <p class="text-sm flex-1">
                    {{ item.author_name }}, {{ item.author_role }}
                  </p>
                </div>
              </UICard>

              <UICardCorner position="bottom-left" />
              <UICardCorner position="bottom-right" />
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

  &__avatar {
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0.6;

    &:hover {
      opacity: 0.8;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }

    &--active {
      opacity: 1;
      transform: scale(1.1);
      box-shadow: 0 0 0 3px var(--accent_primary);
      border-radius: 50%;

      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }
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

  .card {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }

  [data-gsap-slider-item-status='active'] {
    opacity: 1;
    transition: opacity 0.3s ease;

    .card {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

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
