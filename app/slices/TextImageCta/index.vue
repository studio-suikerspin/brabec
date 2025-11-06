<script setup lang="ts">
import type { Content } from '@prismicio/client';

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.TextImageCtaSlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="text-image block-padding--end"
    data-parallax="trigger"
  >
    <div class="text-image__container">
      <div class="text-image__inner">
        <div class="text-image__content">
          <PrismicRichText :field="slice.primary.content" />

          <UIButton
            :href="slice.primary.cta?.url || undefined"
            :variant="`primary`"
          >
            {{ slice.primary.cta.text }}
          </UIButton>
        </div>

        <div class="image-wrap">
          <img :src="slice.primary.media.url" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.text-image {
  &__container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding-inline: 16px;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media screen and (min-width: 992px) {
      flex-direction: row;
      gap: 80px;
    }
  }

  &__content {
    position: sticky;
    top: 48px;

    order: 2;
    display: flex;
    flex-direction: column;
    gap: 24px;

    max-width: 530px;
    height: fit-content;

    @media screen and (min-width: 992px) {
      order: 1;
    }
  }

  .btn {
    @media screen and (max-width: 992px) {
      width: 100%;

      &__inner {
        width: 100%;
      }
    }
  }

  .image-wrap {
    order: 1;

    padding: 16px;
    border-radius: 16px;
    background: var(--white);
    box-shadow: 0 4px 6px 5px rgba(113, 113, 113, 0.05);
    max-width: 300px;
    margin-inline: auto;
    width: 100%;

    @media screen and (min-width: 768px) {
      max-width: 690px;
    }

    @media screen and (min-width: 992px) {
      order: 2;
    }

    img {
      border-radius: 16px;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
