<script setup>
const headerRef = ref(null);

defineProps({
  navigation: {
    type: Array,
    required: true,
  },
});

const checkHeaderPosition = () => {
  const header = headerRef.value;
  if (window.scrollY >= 36) {
    header.classList.add('header--fixed');
  } else {
    header.classList.remove('header--fixed');
  }
};

onMounted(() => {
  checkHeaderPosition();
  window.addEventListener('scroll', checkHeaderPosition);
});
</script>

<template>
  <header ref="headerRef" class="header">
    <div class="header__container mx-auto">
      <div class="header__inner">
        <AppLogo />
        <AppHamburgerNavigation :navigation="navigation" />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  position: absolute;
  top: 36px;
  z-index: 10001;
  width: 100%;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10001;
  }

  &__container {
    max-width: 1500px;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-inline: 32px;
    padding-block: 16px;

    @media screen and (min-width: 768px) {
      padding-inline: 60px;
    }

    @media screen and (min-width: 992px) {
      padding-inline: 80px;
    }
  }
}
</style>
