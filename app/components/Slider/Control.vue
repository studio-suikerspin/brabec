<script setup>
defineProps({
  classes: {
    type: Array,
    default: () => [''],
  },
  type: {
    type: String,
    default: 'next',
  },
});
</script>

<template>
  <button
    :data-gsap-slider-control="type"
    :class="`carousel__control ${classes.join(' ')}`"
  >
    <slot />
  </button>
</template>

<style>
.carousel__control {
  cursor: pointer;
}
</style>
