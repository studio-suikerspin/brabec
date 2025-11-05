<script setup lang="ts">
import { components } from '~/slices';

const prismic = usePrismic();
const { data: page } = await useAsyncData('index', () =>
  prismic.client.getByUID('page', 'home'),
);

// Fetch settings once, shared with layout via useAsyncData cache
const { data: settings } = await useAsyncData('settings', () =>
  prismic.client.getSingle('settings'),
);

const { data: socials } = await useAsyncData('socials', () =>
  prismic.client.getSingle('social_links'),
);

// Store in global state for other components to access
const globalSettings = useState('settings', () => settings.value);
const globalSocials = useState('socials', () => socials.value);

useSeoMeta({
  title: page.value?.data.meta_title,
  ogTitle: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  ogDescription: page.value?.data.meta_description,
  ogImage: computed(() => prismic.asImageSrc(page.value?.data.meta_image)),
});
</script>

<template>
  <main class="main">
    <AppHeader :navigation="globalSettings?.data.navigation" />

    <SliceZone
      wrapper="main"
      :slices="page?.data.slices ?? []"
      :components="components"
    />
  </main>
</template>

<style lang="scss">
.main {
  padding-block-end: 24px;
}
</style>
