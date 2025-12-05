<script setup>
const prismic = usePrismic();
const { gsap } = useGsap();

const { data: settings } = await useAsyncData('settings', () =>
  prismic.client.getSingle('settings'),
);

// Store in global state for other components to access
const globalSettings = useState('settings', () => settings.value);

useSeoMeta({
  title: globalSettings.value?.data.site_title,
  ogTitle: globalSettings.value?.data.site_title,
  description: globalSettings.value?.data.meta_description,
  ogDescription: globalSettings.value?.data.meta_description,
  ogImage: computed(() =>
    prismic.asImageSrc(globalSettings.value?.data.meta_image),
  ),
});

function initGlobalParallax() {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isMobile: '(max-width:479px)',
      isMobileLandscape: '(max-width:767px)',
      isTablet: '(max-width:991px)',
      isDesktop: '(min-width:992px)',
    },
    (context) => {
      const { isMobile, isMobileLandscape, isTablet } = context.conditions;

      const ctx = gsap.context(() => {
        document
          .querySelectorAll('[data-parallax="trigger"]')
          .forEach((trigger) => {
            // We disable parallax on mobile devices and tablets
            if (isMobile || isMobileLandscape || isTablet) {
              return;
            }

            // Optional: you can target an element inside a trigger if necessary
            const target =
              trigger.querySelector('[data-parallax="target"]') || trigger;

            // Get the direction value to decide between xPercent or yPercent tween
            const direction =
              trigger.getAttribute('data-parallax-direction') || 'vertical';
            const prop = direction === 'horizontal' ? 'xPercent' : 'yPercent';

            // Get the scrub value, our default is 'true' because that feels nice with Lenis
            const scrubAttr = trigger.getAttribute('data-parallax-scrub');
            const scrub = scrubAttr ? parseFloat(scrubAttr) : true;

            // Get the start position in %
            const startAttr = trigger.getAttribute('data-parallax-start');
            const startVal = startAttr !== null ? parseFloat(startAttr) : 20;

            // Get the end position in %
            const endAttr = trigger.getAttribute('data-parallax-end');
            const endVal = endAttr !== null ? parseFloat(endAttr) : -20;

            // Get the start value of the ScrollTrigger
            const scrollStartRaw =
              trigger.getAttribute('data-parallax-scroll-start') ||
              'top bottom';
            const scrollStart = `clamp(${scrollStartRaw})`;

            // Get the end value of the ScrollTrigger
            const scrollEndRaw =
              trigger.getAttribute('data-parallax-scroll-end') || 'bottom top';
            const scrollEnd = `clamp(${scrollEndRaw})`;

            gsap.fromTo(
              target,
              { [prop]: startVal },
              {
                [prop]: endVal,
                ease: 'none',
                scrollTrigger: {
                  trigger,
                  start: scrollStart,
                  end: scrollEnd,
                  scrub,
                },
              },
            );
          });
      });

      return () => ctx.revert();
    },
  );
}

const mainRef = ref(null);

onMounted(() => {
  initGlobalParallax();

  gsap.to(mainRef.value, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
    delay: 3,
  });
});
</script>

<template>
  <div>
    <AppLoader />
    <main ref="mainRef" class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
main {
  opacity: 0;
}
</style>
