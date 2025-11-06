<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { Content } from '@prismicio/client';

import SectionEyebrow from '~/components/Section/Eyebrow.vue';
import SectionTitle from '~/components/Section/Title.vue';

import * as z from 'zod';

defineProps(
  getSliceComponentProps<Content.HeadlineFormImageSplitSlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
);

const form = ref();

const formSchema = z.object({
  firstname: z
    .string('Voornaam moet tussen 2 en 100 karakters lang zijn')
    .min(2, 'Voornaam moet minimaal 2 karakters lang zijn')
    .max(100, 'Voornaam moet maximaal 100 karakters lang zijn'),
  lastname: z
    .string('Achternaam moet tussen 2 en 100 karakters lang zijn')
    .min(2, 'Achternaam moet minimaal 2 karakters lang zijn')
    .max(100, 'Achternaam moet maximaal 100 karakters lang zijn'),
  email: z.email('Email moet een geldig emailadres zijn'),
  phone: z
    .string('Telefoonnummer moet een geldig telefoonnummer zijn')
    .min(10, 'Telefoonnummer moet minimaal 10 karakters lang zijn')
    .max(20, 'Telefoonnummer moet maximaal 20 karakters lang zijn'),
  message: z
    .string('Bericht moet tussen 10 en 500 karakters lang zijn')
    .min(10, 'Bericht moet minimaal 10 karakters lang zijn')
    .max(500, 'Bericht moet maximaal 500 karakters lang zijn'),
});

type Schema = z.output<typeof formSchema>;

const state = reactive<Partial<Schema>>({
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  phone: undefined,
  message: undefined,
});

const toast = useToast();

async function handleSubmit(event: FormSubmitEvent<Schema>): Promise<void> {
  try {
    const data = await $fetch('/api/contact', {
      method: 'POST',
      body: state,
    });

    toast.add({
      title: 'Success',
      description: data.message,
      color: 'success',
    });
    form.value.reset();
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'There was an error submitting the form: ' + error.message,
      color: 'error',
    });
  }
}
</script>

<template>
  <section
    id="contact"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="contact-section block-padding--end"
  >
    <div class="contact-section__container container">
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

          <UForm
            ref="form"
            :state="state"
            :schema="formSchema"
            class="contact-section__form"
            @submit.prevent="handleSubmit"
          >
            <UFormField class="field-wrap field-wrap--half" name="firstname">
              <UInput
                id="firstname"
                v-model="state.firstname"
                type="text"
                placeholder="Voornaam"
              />
            </UFormField>

            <UFormField class="field-wrap field-wrap--half" name="lastname">
              <UInput
                id="lastname"
                v-model="state.lastname"
                type="text"
                placeholder="Achternaam"
              />
            </UFormField>

            <UFormField class="field-wrap" name="email">
              <UInput
                id="email"
                v-model="state.email"
                type="email"
                placeholder="Email"
              />
            </UFormField>

            <UFormField class="field-wrap" name="phone">
              <UInput
                id="phone"
                v-model="state.phone"
                type="tel"
                placeholder="Telefoonnummer"
              />
            </UFormField>

            <UFormField class="field-wrap" name="message">
              <UTextarea
                id="message"
                v-model="state.message"
                placeholder="Bericht"
              />
            </UFormField>

            <button type="submit" class="contact-section__submit">
              {{ slice.primary.button_text }}
            </button>
          </UForm>
        </div>

        <div class="image-wrap">
          <img :src="slice.primary.form_image.url" alt="" />
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

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 30px;

    background: var(--white);
    border-radius: 20px;
    padding: 20px;
    border: 2px solid rgba(10, 13, 23, 0.05);
    box-shadow: 0 4px 6px 5px rgba(113, 113, 113, 0.05);

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

      &.ring-error {
        border-color: var(--error);
      }
    }

    .text-error {
      color: var(--error);
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
