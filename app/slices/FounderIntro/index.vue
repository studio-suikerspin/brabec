<script setup lang="ts">
import { PrismicRichText } from '#components';
import type { Content } from '@prismicio/client';

import SectionEyebrow from '@/components/Section/Eyebrow.vue';
import SectionTitle from '@/components/Section/Title.vue';

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.FounderIntroSlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
);
</script>

<template>
  <section
    id="about-brabec"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="block-padding founder-intro"
    data-parallax="trigger"
  >
    <div class="founder-intro__container">
      <div class="founder-intro__inner">
        <SectionHeader data-parallax="target">
          <PrismicRichText
            :field="slice.primary.subtitle"
            :components="{ paragraph: SectionEyebrow }"
          />

          <PrismicRichText
            :field="slice.primary.title"
            :components="{ heading2: SectionTitle }"
          />
        </SectionHeader>

        <div class="founder-intro__content">
          <div class="founder-intro__column">
            <div class="image-container">
              <div class="image-wrap">
                <img :src="slice.primary.portrait.url" alt="" />
              </div>
            </div>

            <div class="image-caption flex items-center justify-between">
              <div class="links">
                <template
                  v-for="link in slice.primary.contact_links"
                  :key="link.key"
                >
                  <PrismicLink :field="link" :class="link.variant">
                    <img
                      :src="`/${link.variant}.svg`"
                      class="w-5 h-5 inline-block mr-2"
                    />
                  </PrismicLink>
                </template>
              </div>

              <div class="founder">
                <div class="founder__name">
                  {{ slice.primary.name }}
                </div>

                <div class="founder__role">
                  {{ slice.primary.role }}
                </div>
              </div>
            </div>
          </div>

          <div class="founder-intro__column">
            <PrismicRichText :field="slice.primary.content" />

            <UIButton
              :variant="slice.primary.cta_button.variant"
              :href="
                slice.primary.cta_button.url
                  ? slice.primary.cta_button.url
                  : '#'
              "
            >
              {{ slice.primary.cta_button.text }}
            </UIButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.founder-intro {
  display: flex;
  flex-direction: column;
  gap: 80px;

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
      gap: 80px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media screen and (min-width: 992px) {
      display: grid;
      grid-template-columns: 1fr 500px;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    .btn {
      @media screen and (max-width: 992px) {
        width: 100%;

        &__inner {
          width: 100%;
        }
      }
    }
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .image-container {
    padding-block: 16px;
  }

  .image-wrap {
    rotate: -5deg;

    padding: 16px;
    border-radius: 16px;
    background: var(--white);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

    max-width: 800px;
    width: 100%;

    img {
      border-radius: 16px;
    }
  }

  .image-caption {
    padding-block: 8px;
    max-width: 90%;
    width: 100%;
    margin: 0 auto;
  }

  .founder {
    display: flex;
    flex-direction: column;
    gap: 12px;

    font-family: Inter;

    &__name {
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    &__role {
      font-size: 14px;
      font-style: italic;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>
