<script setup lang="ts">
import { components } from '~/slices';

const prismic = usePrismic();
const { data: page } = await useAsyncData('index', () =>
  prismic.client.getByUID('page', 'home'),
);

const { data: settings } = await useAsyncData('settings', () =>
  prismic.client.getSingle('settings'),
);

useState('settings', () => settings);

const { data: socials } = await useAsyncData('socials', () =>
  prismic.client.getSingle('social_links'),
);

useState('socials', () => socials);

useSeoMeta({
  title: page.value?.data.meta_title,
  ogTitle: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  ogDescription: page.value?.data.meta_description,
  ogImage: computed(() => prismic.asImageSrc(page.value?.data.meta_image)),
});
</script>

<template>
  <main>
    <AppHeader :navigation="settings?.data.navigation" />

    <SliceZone
      wrapper="main"
      :slices="page?.data.slices ?? []"
      :components="components"
    />
  </main>
</template>
