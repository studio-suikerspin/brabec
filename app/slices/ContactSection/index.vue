<script setup lang="ts">
import type { Content } from '@prismicio/client';

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.HeadlineFormImageSplitSlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
);

const form = ref(null);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="contact-section block-padding"
  >
    <div class="contact-section__container container">
      <SectionHeader>
        <SectionEyebrow>
          <PrismicRichText :field="slice.primary.subtitle" />
        </SectionEyebrow>
        <SectionTitle>
          <div class="contact-section__title">
            <PrismicRichText :field="slice.primary.title" />
          </div>
        </SectionTitle>
      </SectionHeader>

      <div class="contact-section__inner">
        <div class="contact-section__content">
          <div class="flex flex-col">
            <h3 class="contact-section__form-title">
              {{ slice.primary.form_title }}
            </h3>
            <div class="title-font contact-section__form-content">
              <PrismicRichText :field="slice.primary.form_content" />
            </div>
          </div>

          <form
            ref="form"
            class="contact-section__form"
          >
            <div class="field-wrap field-wrap--half">
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Voornaam"
                required
              />
            </div>

            <div class="field-wrap field-wrap--half">
              <input
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Achternaam"
                required
              />
            </div>

            <div class="field-wrap">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>

            <div class="field-wrap">
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Telefoonnummer"
              />
            </div>

            <div class="field-wrap">
              <textarea
                id="message"
                name="message"
                placeholder="Bericht"
              />
            </div>

            <button class="contact-section__submit">
              {{ slice.primary.button_text }}
            </button>
          </form>
        </div>

        <div class="image-wrap">
          <img
            :src="slice.primary.form_image.url"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.contact-section {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 40px;

    padding-inline: 16px;
  }

  &__title {
    text-wrap: balance;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 30px;

    background: var(--white);
    border-radius: 20px;
    padding: 20px;
    border: 2px solid rgba(10, 13, 23, 0.05);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

    padding-block: 40px;

    @media screen and (min-width: 992px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
      gap: 40px;

      padding-inline: 40px;
      padding-block: 60px;
    }

    @media screen and (min-width: 1200px) {
      padding-inline: 80px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 41px;

    @media screen and (min-width: 768px) {
      padding-inline: 40px;
    }
  }

  &__form-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  &__form-content {
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
  }

  &__form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .field-wrap {
    grid-column: span 2;

    &--half {
      grid-column: span 1;
    }

    input,
    textarea {
      display: flex;
      padding: 12px 14px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;
      flex: 1 0 0;
      width: 100%;

      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.05);
    }
  }

  &__submit {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: span 2;

    padding: 12px 24px;
    border-radius: 10px;
    font-size: 16px;
    line-height: 140%;
    color: var(--white);
    background-color: var(--accent_primary);
    width: 100%;
  }

  .image-wrap {
    height: auto;
    border-radius: 10px;
    overflow: hidden;
    margin-inline: auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
