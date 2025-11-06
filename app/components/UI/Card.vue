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
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

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
