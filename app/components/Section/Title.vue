<script setup>
const { gsap } = useGsap();

const title = ref(null);

onMounted(() => {
  gsap.from(title.value, {
    duration: 0.2,
    autoAlpha: 0,
    y: 50,
    scrollTrigger: {
      trigger: title.value.parentElement,
      start: 'top 70%',
      end: 'bottom 50%',
      scrub: 0.5,
    },
  });
});
</script>

<template>
  <h2 ref="title" class="section-title">
    <slot />
  </h2>
</template>

<style lang="scss">
.section-title {
  font-size: 35px;
  font-weight: 700;
  font-style: normal;
  line-height: normal;
  text-align: center;
  color: var(--black);
  text-wrap: balance;

  @media screen and (min-width: 992px) {
    font-size: 56px;
  }
}
</style>
