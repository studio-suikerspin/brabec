<script setup>
function initCSSMarquee() {
  const pixelsPerSecond = 75; // Set the marquee speed (pixels per second)
  const marquees = document.querySelectorAll('[data-css-marquee]');
  
  // Duplicate each [data-css-marquee-list] element inside its container
  marquees.forEach(marquee => {
    marquee.querySelectorAll('[data-css-marquee-list]').forEach(list => {
      const duplicate = list.cloneNode(true);
      marquee.appendChild(duplicate);
    });
  });

  // Create an IntersectionObserver to check if the marquee container is in view
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.querySelectorAll('[data-css-marquee-list]').forEach(list => 
        list.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'
      );
    });
  }, { threshold: 0 });
  
  // Calculate the width and set the animation duration accordingly
  marquees.forEach(marquee => {
    marquee.querySelectorAll('[data-css-marquee-list]').forEach(list => {
      list.style.animationDuration = (list.offsetWidth / pixelsPerSecond) + 's';
      list.style.animationPlayState = 'paused';
    });
    observer.observe(marquee);
  });
}

onMounted(() => {
  initCSSMarquee();
})
</script>

<template>
  <div data-css-marquee="" class="marquee-css">
    <div data-css-marquee-list="" class="marquee-css__list">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.marquee-css {
  position: relative;
  overflow: hidden;

  width: 100%;
  max-width: 42em;

  display: flex;
  gap: 20px;

  &__list {
    position: relative;

    display: flex;
    align-items: center;
    gap: 20px;

    flex: none;
  }

  &__item {
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    flex: 0;
    align-items: center;
    padding-top: 1em;
    padding-bottom: 1em;
    padding-right: 1em;
    display: flex;
  }

  &__item-p {
    white-space: nowrap;
    margin-bottom: 0;
    font-size: 1.5em;
    line-height: 1;
  }

  &__item-svg {
    width: 1em;
  }
}

@keyframes translateX {
  to {
    transform: translateX(-100%);
  }
}

[data-css-marquee-list] {
  animation: translateX 30s linear;
  animation-iteration-count: infinite;
  animation-play-state: paused;
}
</style>