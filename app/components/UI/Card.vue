<script setup>
defineProps({
  classes: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div :class="`card ${classes}`">
    <div class="card__inner card__inner--grey">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.card {
  border-radius: var(--card_border-radius);
  background: var(--white);
  box-shadow: 0 4px 4px 5px rgba(113, 113, 113, 0.05);

  padding: 13px;

  &__inner {
    height: 100%;

    padding-block: 40px;
    padding-inline: 16px;

    border-radius: var(--card_border-radius);

    &--grey {
      background: var(--grey_block);
    }
  }
}
</style>
