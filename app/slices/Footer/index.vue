<script setup lang="ts">
import type { Content } from '@prismicio/client';

const { data: settings } = useSettings().value;
const { data: socials } = useSocials().value;

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.CenteredHeroSlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
);
</script>

<template>
  <footer
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="footer"
  >
    <div class="footer__container">
      <div class="footer__inner">
        <AgendaStatus
          v-if="settings.agenda.length"
          :agenda="settings.agenda[0]"
        />

        <div class="footer__title">
          <PrismicRichText :field="slice.primary.title" />
        </div>

        <div class="footer__subtitle">
          <PrismicRichText :field="slice.primary.subtitle" />
        </div>

        <UIButton
          :scrollTo="slice.primary.button.url ? slice.primary.button.url : null"
          variant="white"
        >
          {{ slice.primary.button.text }}
        </UIButton>

        <div class="footer__bottom">
          <div class="text-logo">BRABEC</div>

          <div class="socials">
            <a
              v-for="(social, index) in socials.social_links"
              :key="index"
              :href="social.url"
              :target="social.target"
            >
              <i :class="`icon-${social.variant} socials__item`" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  width: 100%;

  &__container {
    margin-inline: auto;
    max-width: 1500px;
    padding-inline: 16px;
  }

  .agenda {
    margin-bottom: 24px;
  }

  &__inner {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;

    padding-inline: 20px;

    border: 2px solid #e9e9e9;
    border-radius: 60px;

    box-shadow: 0 32px 56px -12px rgba(113, 113, 113, 0.25);

    background: #fff;
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 218, 191, 1) 61%,
      rgba(255, 110, 2, 0.6) 100%
    );

    min-height: 90svh;
    padding-block-start: 75px;
    padding-block-end: 40px;
  }

  &__title {
    text-align: center;
    font-size: 48px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -1.296px;
    max-width: 1000px;

    @media screen and (min-width: 992px) {
      font-size: clamp(3rem, 0.7778rem + 7.1111vw, 7rem);
    }
  }

  &__subtitle {
    font-size: 16px;
    /* text-wrap: balance; */
    max-width: 460px;
    text-align: center;

    @media screen and (min-width: 992px) {
      font-size: 18px;
    }
  }

  &__bottom {
    padding-inline: 20px;
    padding-block: 24px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    justify-content: space-between;

    @media screen and (min-width: 992px) {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      padding-block: 40px;

      flex-direction: row;
      gap: unset;
      padding-inline: 80px;
    }

    .text-logo {
      color: var(--black);
      text-align: center;
      font-family: 'Work Sans';
      font-size: 18px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;

      @media screen and (min-width: 992px) {
        font-size: 24px;
      }
    }

    .socials {
      display: flex;
      gap: 16px;
      align-items: center;
      color: var(--white);

      &__item {
        font-size: 24px;
        padding: 12px;
        border-radius: 50%;
        border: 1px solid var(--white);
      }
    }
  }
}
</style>
