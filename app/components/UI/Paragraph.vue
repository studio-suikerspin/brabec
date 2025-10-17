<script setup>
defineProps({
  classes: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <p :class="['paragraph', classes]">
    <slot></slot>
  </p>
</template>
