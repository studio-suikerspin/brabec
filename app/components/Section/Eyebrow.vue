<template>
  <div class="section-eyebrow">
    <div class="section-eyebrow__line"/>
    <div class="section-eyebrow__text"><slot /></div>
    <div class="section-eyebrow__line"/>
  </div>
</template>

<style lang="scss">
  .section-eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;

    flex-wrap: nowrap;
    width: 100%;

    &__line {
      width: 100%;
      height: 1px;

      max-width: 115px;
      background-color: var(--black-20);
    }

    &__text {
      color: var(--black);
      text-align: center;
      font-family: Inter;
      font-size: 16px;
      font-style: italic;
      font-weight: 400;
      line-height: normal;
    }
  }
</style>