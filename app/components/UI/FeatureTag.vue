<script setup>
const { item } = defineProps({
  item: Object,
  required: true,
})
</script>

<template>
  <div class="feature-tag">
    <div class="feature-tag__inner">
      <PrismicImage :field="item.icon" />
      {{ item.label }}
    </div>
  </div>
</template>

<style lang="scss">
.feature-tag {
  padding-inline: 12px;
  padding-block: 8px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.30);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

  width: fit-content;

  &__inner {
    display: flex;
    justify-content: center;
    align-items: center;

    padding-block: 4px;
    padding-inline: 8px;

    border-radius: 100px;
    background: var(--white, #FFF);
  }
}
</style>