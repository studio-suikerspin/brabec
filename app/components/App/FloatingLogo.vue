<template>
  <div class="floating-logo">
    <h1 class="logo">BRABEC</h1>
  </div>
</template>

<style lang="scss">
.floating-logo {
  position: fixed;
  inset: 0;
  z-index: 10000;
  width: fit-content;
  height: fit-content;

  h1 {
    position: absolute;
    top: 2em;
    left: 7.5%;

    font-size: clamp(1.25rem, 1.1535rem + 0.396vw, 1.5rem);
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
}
</style>
