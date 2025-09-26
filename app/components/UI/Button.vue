<script setup>
defineProps({
  href: {
    type: String,
    default: 'javascript:;'
  },
  variant: {
    type: String,
    default: 'primary',
  },  
  classes: {
    type: String,
    default: '',
  }
})
</script>

<template>
  <a :class="`btn btn--${variant} ${classes}`" :href="href">
    <div class="btn__inner">
      <slot />
    </div>
  </a>
</template>

<style lang="scss">
.btn {
  display: flex;
  padding-inline: 12px;
  padding-block: 8px;
  gap: 10px;
  border-radius: var(--btn_border-radius);
  background: var(--white-30);

  font-weight: 600;
  line-height: normal;

  &__inner {
    padding-inline: 24px;
    padding-block: 12px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border-radius: var(--btn_border-radius);
  }

  &--primary {

  }

  &--white {
    .btn__inner {
      background: var(--white);
    }
  }
}
</style>