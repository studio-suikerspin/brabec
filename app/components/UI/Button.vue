<script setup>
import Lenis from 'lenis';

defineProps({
  href: {
    type: String,
    default: 'javascript:;',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  classes: {
    type: String,
    default: '',
  },
  scrollTo: {
    type: String,
    default: '',
  },
});

const { gsap } = useGsap();

function initElasticPulseButton() {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  document.querySelectorAll('[data-elastic-pulse-btn]').forEach((btn) => {
    const target = btn.querySelector('[data-elastic-pulse-target]') || btn;
    let hoverLocked = false;

    btn.addEventListener('mouseenter', () => {
      if (hoverLocked) return;
      hoverLocked = true;
      setTimeout(() => {
        hoverLocked = false;
      }, 500);

      const el = target;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      const stretch = 0.75 * fs;
      const sx = (w + stretch) / w;
      const sy = (h - stretch * 0.33) / h;

      if (el._pulseTl && el._pulseTl.kill) el._pulseTl.kill();
      el._pulseTl = gsap
        .timeline()
        .to(el, { scaleX: sx, scaleY: sy, duration: 0.1, ease: 'power1.out' })
        .to(el, {
          scaleX: 1,
          scaleY: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        });
    });
  });
}

const lenis = useLenis();

const handleScrollTo = (id) => {
  console.log('scrolling to', scrollTo);
  if (!lenis.value) return;

  lenis.value.scrollTo(id);
};

onMounted(() => {
  initElasticPulseButton();
});
</script>

<template>
  <a
    :class="`btn btn--${variant} ${classes}`"
    data-elastic-pulse-btn
    :href="href"
    @click="scrollTo ? handleScrollTo(scrollTo) : null"
  >
    <div class="btn__inner" data-elastic-pulse-target>
      <slot />
    </div>
  </a>
</template>

<style lang="scss">
.btn {
  display: flex;
  padding-inline: 12px;
  padding-block: 8px;
  gap: 10px;
  border-radius: var(--btn_border-radius);
  background: var(--white-30);

  font-weight: 600;
  line-height: normal;

  &__inner {
    padding-inline: 24px;
    padding-block: 12px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border-radius: var(--btn_border-radius);
  }

  &--primary {
    .btn__inner {
      background: var(--accent_primary);
      color: var(--white);
    }
  }

  &--full {
    background: var(--accent_primary);

    .btn__inner {
      background: var(--accent_primary);
      color: var(--white);
    }
  }

  &--white {
    .btn__inner {
      background: var(--white);
    }
  }
}
</style>
