<script setup>
const { gsap, SplitText } = useGsap();
const revealTypeRef = ref(null);

onMounted(() => {
  const revealTypeSplit = SplitText.create(revealTypeRef.value, {
    type: 'words',
  });
  gsap.from(revealTypeSplit.words, {
    duration: 0.2,
    autoAlpha: 0.2,
    y: 5,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.reveal-type',
      scrub: 0.5,
      start: 'top 75%',
      end: 'top 40%',
    },
  });
});
</script>

<template>
  <h2 ref="revealTypeRef" class="reveal-type">
    <slot />
  </h2>
</template>
