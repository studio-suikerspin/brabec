<script setup>
defineProps({
  classes: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div data-gsap-slider-item="" :class="`carousel__item ${classes.join(' ')}`">
    <slot />
  </div>
</template>

<style>
.carousel__item {
  width: calc(
    ((100% - 1px) - (var(--slider-spv) - 1) * var(--slider-gap)) /
      var(--slider-spv)
  );
  margin-right: var(--slider-gap);
  flex: none;
}
</style>
