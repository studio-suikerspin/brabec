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
  box-shadow: var(--card-shadow--sm);

  padding: 13px;

  @media screen and (min-width: 768px) {
    box-shadow: var(--card-shadow);
  }

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
