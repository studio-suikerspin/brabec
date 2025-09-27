<template>
  <div class="section-header">
    <slot/>
  </div>
</template>

<style lang="scss">
  .section-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }
</style>