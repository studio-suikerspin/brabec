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
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.30);

  font-weight: 600;
  line-height: normal;

  &__inner {
    padding-inline: 24px;
    padding-block: 12px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border-radius: 50px;
  }

  &--primary {

  }

  &--white {
    .btn__inner {
      background: #fff;
    }
  }
}
</style>