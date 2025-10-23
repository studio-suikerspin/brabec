<script setup lang="ts">
import type { Content } from '@prismicio/client';

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.FaqWithCtaCardSlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
);

function initAccordionCSS() {
  document
    .querySelectorAll('[data-accordion-css-init]')
    .forEach((accordion) => {
      const closeSiblings =
        accordion.getAttribute('data-accordion-close-siblings') === 'true';

      accordion.addEventListener('click', (event) => {
        const toggle = event.target.closest('[data-accordion-toggle]');
        if (!toggle) return;

        const singleAccordion = toggle.closest('[data-accordion-status]');
        if (!singleAccordion) return;

        const isActive =
          singleAccordion.getAttribute('data-accordion-status') === 'active';
        singleAccordion.setAttribute(
          'data-accordion-status',
          isActive ? 'not-active' : 'active',
        );

        if (closeSiblings && !isActive) {
          accordion
            .querySelectorAll('[data-accordion-status="active"]')
            .forEach((sibling) => {
              if (sibling !== singleAccordion)
                sibling.setAttribute('data-accordion-status', 'not-active');
            });
        }
      });
    });
}

onMounted(() => {
  initAccordionCSS();
});
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="faq-section block-padding"
    data-parallax-trigger="true"
  >
    <div class="faq-section__container">
      <div class="faq-section__inner">
        <SectionHeader>
          <SectionEyebrow>
            {{ slice.primary.subtitle }}
          </SectionEyebrow>
          <SectionTitle>
            {{ slice.primary.title }}
          </SectionTitle>
        </SectionHeader>

        <div class="faq-section__content">
          <div class="faq-section__card-wrap">
            <UICard>
              <div class="faq-section__card-inner">
                <div class="faq-section__card-header">
                  <div class="faq-section__card-avatar">
                    <PrismicImage :field="slice.primary.cta_image" />
                  </div>
                  <div class="faq-section__card-header-wrap">
                    <div class="faq-section__card-title">
                      <PrismicRichText :field="slice.primary.cta_title" />
                    </div>

                    <div class="faq-section__card-description">
                      <PrismicRichText :field="slice.primary.cta_description" />
                    </div>
                  </div>
                </div>

                <UIButton
                  :href="slice.primary.cta_button.url"
                  variant="white"
                >
                  {{ slice.primary.cta_button.text }}
                </UIButton>

                <div class="faq-section__card-link">
                  <PrismicRichText :field="slice.primary.cta_link_text" />
                </div>

                <TrustedBy />
              </div>
            </UICard>
          </div>

          <div
            data-accordion-close-siblings="true"
            data-accordion-css-init=""
            class="accordion-css"
          >
            <ul class="accordion-css__list">
              <template
                v-for="(item, index) in slice.primary.faq_items"
                :key="index"
              >
                <li
                  :data-accordion-status="index === 0 ? 'active' : 'not-active'"
                  class="accordion-css__item"
                >
                  <div
                    data-hover=""
                    data-accordion-toggle=""
                    class="accordion-css__item-top"
                  >
                    <div class="accordion-css__item-title">
                      <PrismicRichText :field="item.question" />
                    </div>
                    <div class="accordion-css__item-icon">
                      <i class="icon-plus"></i>
                    </div>
                  </div>
                  <div class="accordion-css__item-bottom">
                    <div class="accordion-css__item-bottom-wrap">
                      <div class="accordion-css__item-bottom-content">
                        <PrismicRichText :field="item.answer" />
                      </div>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.faq-section {
  &__container {
    max-width: 1400px;
    margin-inline: auto;
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
    gap: 24px;

    @media screen and (min-width: 992px) {
      flex-direction: row;
      gap: 60px;
    }
  }

  &__card-wrap {
    flex: 1;
  }

  .card {
    rotate: -2deg;

    @media screen and (min-width: 992px) {
      rotate: -4deg;
      transform-origin: top right;
    }
  }

  .card__inner {
    padding-inline: 24px;
    padding-block: 16px;
  }

  &__card-inner {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__card-header {
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media screen and (min-width: 992px) {
      align-items: center;

      flex-direction: row;
      gap: 48px;
    }
  }

  &__card-avatar {
    width: 100px;
    height: 100px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    padding: 8px;
    background: var(--white);

    @media screen and (min-width: 992px) {
      width: 100px;
      height: 100px;
    }

    img {
      border-radius: 50%;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &__card-header-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__card-title {
    font-size: 18px;
    font-weight: 600;

    @media screen and (min-width: 992px) {
      font-size: 24px;
    }
  }

  &__card-description {
    font-size: 16px;
    font-weight: 400;
    text-wrap: nowrap;

    @media screen and (min-width: 992px) {
      font-size: 18px;
    }
  }

  .btn {
    width: 100%;

    &__inner {
      width: 100%;
    }
  }

  &__card-link {
    text-align: center;
    color: var(--black);

    strong {
      font-weight: 400;
      color: var(--accent_primary);
    }
  }

  .trusted-by {
    margin-inline: auto;
  }
}

.accordion-css {
  flex: 1;
  max-width: 650px;
  position: relative;

  &__list {
    grid-column-gap: 0.5em;
    grid-row-gap: 0.5em;
    flex-flow: column;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    display: flex;
    position: static;
  }

  &__item {
    border-top: 1px solid #efeeec;
    padding-block: 40px 16px;
    list-style: none;
  }

  &__item-top {
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    display: flex;

    padding-bottom: 24px;
  }

  &__item-bottom {
    transition: grid-template-rows 0.6s cubic-bezier(0.625, 0.05, 0, 1);
    grid-template-rows: 0fr;
    display: grid;
    position: relative;
    overflow: hidden;
  }

  &__item-bottom-wrap {
    flex-flow: column;
    height: 100000%;
    display: flex;
    position: relative;
    overflow: hidden;
  }

  &__item-title {
    font-size: 24px;
    font-weight: 500;
    color: var(--black);
  }

  &__item-icon {
    transition: transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
    border-radius: 50%;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 2em;
    height: 2em;
    display: flex;
    transform: rotate(180deg);
    color: var(--accent_primary);
    font-size: 24px;
  }

  &__item-p {
    color: var(--black);
    opacity: 0.6;
    margin-bottom: 0;
    font-size: 16px;
  }

  [data-accordion-status='active'] {
    .accordion-css__item-bottom {
      grid-template-rows: 1fr;
    }

    .accordion-css__item-icon {
      transform: rotate(45deg);
    }
  }
}
</style>
