<script setup>
const lenis = useLenis();

const scrollTo = (url) => {
  lenis.value.scrollTo(url);
};
</script>

<template>
  <a href="javascript:;" class="logo" @click="scrollTo('top')">
    <h1 class="logo">BRABEC</h1>
  </a>
</template>

<style lang="scss">
.logo {
  h1 {
    font-size: clamp(1.25rem, 1.1535rem + 0.396vw, 1.5rem);
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
}
</style>
