<script setup>
defineProps({
  navigation: {
    type: Array,
    required: true,
  },
});

const hamburgerNav = ref(null);
const lenis = useLenis();

const toggleNavigation = () => {
  hamburgerNav.value.dataset.navigationStatus =
    hamburgerNav.value.dataset.navigationStatus === 'active'
      ? 'closed'
      : 'active';

  if (hamburgerNav.value.dataset.navigationStatus === 'active') {
    lenis.value.stop();
  } else {
    lenis.value.start();
  }
};

const scrollTo = (url) => {
  lenis.value.start();
  lenis.value.scrollTo(url);
  hamburgerNav.value.dataset.navigationStatus = 'closed';
};
</script>

<template>
  <div ref="hamburgerNav" class="hamburger-nav" data-navigation-status="closed">
    <a
      href="javascript:;"
      class="hamburger-nav__toggle"
      @click="toggleNavigation"
    >
      <div class="hamburger-nav__toggle-bar"></div>
      <div class="hamburger-nav__toggle-bar"></div>
    </a>

    <nav class="hamburger-nav__menu">
      <div class="hamburger-nav__bg"></div>
      <div class="hamburger-nav__group">
        <p class="hamburger-nav__menu-p">Menu</p>
        <ul class="hamburger-nav__ul">
          <li
            v-for="(item, index) in navigation"
            :key="index"
            class="hamburger-nav__li"
          >
            <a
              aria-current="page"
              class="hamburger-nav__a"
              :title="`Go to ${item.text}`"
              href="javascript:;"
              @click="() => scrollTo(item.url)"
            >
              <p class="hamburger-nav__p">
                {{ item.text }}
              </p>
              <div class="hamburger-nav__dot"></div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <div class="hamburger-nav__bg-dark" @click="toggleNavigation"></div>
</template>

<style lang="scss">
.hamburger-nav {
  position: relative;
  width: 50px;
  height: 50px;

  &__bg {
    position: absolute;
    top: 0;
    right: 0;

    width: 50px;
    height: 50px;
    background-color: var(--white);
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    transition: all 0.7s cubic-bezier(0.5, 0.5, 0, 1);
  }

  &__menu {
    position: absolute;
    border-radius: 1.5em;
    position: absolute;
    top: 0;
    right: 0;
  }

  &__group {
    visibility: hidden;
    opacity: 0;
    transform: scale(0.15) rotate(0.001deg);

    position: relative;
    display: flex;
    padding: 24px 50px 20px 20px;
    flex-flow: column;
    transform-origin: 100% 0;
    pointer-events: none;
    grid-row-gap: 16px;
    grid-column-gap: 16px;
    transition:
      all 0.5s cubic-bezier(0.5, 0.5, 0, 1),
      transform 0.7s cubic-bezier(0.5, 0.5, 0, 1);
  }

  &__ul {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    flex-flow: column;
    margin: 0;
  }

  &__li {
    margin: 0;
    padding: 0;
    list-style: none;

    transition: all 0.2s cubic-bezier(0.5, 0.5, 0, 1);

    :hover {
      opacity: 0.6;
      transition: all 0.2s cubic-bezier(0.5, 0.5, 0, 1);
    }
  }

  &__p {
    white-space: nowrap;
    font-size: 20px;
  }

  &__toggle {
    position: absolute;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;

    color: var(--black);
    background: var(--white);
    transform: translate(0em, 0em) rotate(0.001deg);
    transition: all 0.7s cubic-bezier(0.5, 0.5, 0, 1);

    &-bar {
      position: absolute;
      display: block;
      width: 40%;
      height: 2px;
      border-radius: 2px;
      background: var(--black);

      transform: translateY(-0.15em) rotate(0.001deg);
      transition: transform 0.7s cubic-bezier(0.5, 0.5, 0, 1);

      &:nth-child(2) {
        transition: transform 0.7s cubic-bezier(0.5, 0.5, 0, 1);
        transform: translateY(0.15em) rotate(0.001deg);
      }
    }
  }

  &[data-navigation-status='active'] {
    .hamburger-nav__bg {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }

    .hamburger-nav__group {
      transform: scale(1) rotate(0.001deg);
      pointer-events: auto;
      opacity: 1;
      visibility: visible;
    }

    .hamburger-nav__toggle {
      transform: translate(-8px, 8px) rotate(0deg);
    }

    .hamburger-nav__toggle-bar {
      transform: translateY(0em) rotate(45deg);

      &:nth-child(2) {
        transform: translateY(0em) rotate(-45deg);
      }
    }
  }

  &:not([data-navigation-status='active']) .hamburger-nav__toggle:hover {
    background-color: rgba(255, 255, 255, 0.1);

    .hamburger-nav__toggle-bar {
      transform: translateY(0.15em) rotate(0);

      &:nth-child(2) {
        transform: translateY(-0.15em) rotate(0);
      }
    }
  }
}

.hamburger-nav__bg-dark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  transition: opacity 0.7s cubic-bezier(0.5, 0.5, 0, 1);
  pointer-events: none;
}

[data-navigation-status='active'] ~ .hamburger-nav__bg-dark {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  cursor: pointer;
  transition:
    opacity 0.7s cubic-bezier(0.5, 0.5, 0, 1),
    visibility 0s 0s;
}

[data-navigation-status='closed'] ~ .hamburger-nav__bg-dark {
  opacity: 0;
}
</style>
