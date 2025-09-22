<script setup>
const headerRef = ref(null);

onMounted(() => {
  const header = headerRef.value;
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      header.classList.add('header--fixed');
    } 
    
    if (window.scrollY < 50) {
      header.classList.remove('header--fixed');
    }
  })
})
</script>

<template>
  <header class="header" ref="headerRef">
    <div class="container">
      <div class="header__inner">
        <h1 class="logo">BRABEC</h1>
        
        <a href="javascript:;" class="menu-trigger">
          <i class="icon-menu" />
        </a>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  width: 100%;
  position: absolute;
  top: 24px;

  transition: background 50ms ease-out;

  z-index: 10000;

  @media screen and (min-width: 992px) {
    top: 50px;
  }

  &--fixed {
    position: fixed;
    top: 0;

    background: #fff;

    transition: background 100ms ease-out;

    .header__inner {
      width: 100%;
    }

    @media screen and (min-width: 992px) {
      top: 0;
    }
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-inline: 36px;
    padding-block: 20px;
    height: 80px;

    @media screen and (min-width: 992px) {
      padding-inline: 20px;
    }
  }

  .logo {
    font-size: clamp(1.25rem, 1.1535rem + 0.396vw, 1.5rem);
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }

  .menu-trigger {
    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 26px;
    line-height: 100%;
    
    border-radius: 100px;
    background: var(--white-30);
  }
}


</style>
