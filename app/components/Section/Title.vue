<script setup>
const { gsap, SplitText } = useGsap();

const title = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const titleSplit = SplitText.create(title.value, {
      type: 'words',
    });

    gsap.from(titleSplit.words, {
      delay: 0.2,
      duration: 0.3,
      autoAlpha: 0,
      stagger: 0.1,
      y: 20,
      scrollTrigger: {
        trigger: title.value.parentElement,
        start: 'top 70%',
        end: 'bottom 50%',
      },
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <h2 ref="title" class="section-title">
    <slot />
  </h2>
</template>

<style lang="scss">
.section-title {
  font-size: 36px;
  font-weight: 700;
  font-style: normal;
  line-height: normal;
  text-align: center;
  color: var(--black);
  /* text-wrap: balance; */

  padding-inline: 16px;

  @media screen and (min-width: 992px) {
    font-size: 56px;
  }
}
</style>
