<template>
  <h2 class="section-title"><slot /></h2>
</template>

<style lang="scss">
  .section-title {
    font-size: 35px;
    font-weight: 700;
    font-style: normal;
    line-height: normal;
    text-align: center;
    color: var(--black);

    @media screen and (min-width: 992px) {
      font-size: 56px;
    }
  }
</style>