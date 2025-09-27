<template>
  <h2 class="section-title"><slot /></h2>
</template>

<style lang="scss">
  .section-title {
    font-size: clamp(1.5rem, 0.7277rem + 3.1683vw, 3.5rem);
    font-weight: 700;
    font-style: normal;
    line-height: normal;
    text-align: center;
    color: var(--black);
  }
</style>