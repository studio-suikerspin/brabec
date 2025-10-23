<script setup>
const headerRef = ref(null);

defineProps({
  navigation: {
    type: Array,
    required: true,
  },
});

onMounted(() => {
  const header = headerRef.value;
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      header.classList.add('header--fixed');
    }

    if (window.scrollY < 50) {
      header.classList.remove('header--fixed');
    }
  });
});
</script>

<template>
  <header
    ref="headerRef"
    class="header"
  >
    <AppFloatingLogo />

    <AppHamburgerNavigation :navigation="navigation" />
  </header>
</template>

<style lang="scss"></style>
