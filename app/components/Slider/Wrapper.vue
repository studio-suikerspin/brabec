<script setup>
const { gsap, Draggable } = useGsap();

defineProps({
  controls: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['activeSlideChange']);

// Store slider state for external access
const sliderState = ref({
  snapPoints: [],
  activeIndex: 0,
  track: null,
  items: [],
  centerIndex: 0,
  updateStatus: null,
  isReady: false,
});

function initBasicGSAPSlider() {
  document.querySelectorAll('[data-gsap-slider-init]').forEach((root) => {
    if (root._sliderDraggable) root._sliderDraggable.kill();

    const collection = root.querySelector('[data-gsap-slider-collection]');
    const track = root.querySelector('[data-gsap-slider-list]');
    const items = Array.from(root.querySelectorAll('[data-gsap-slider-item]'));
    const controls = Array.from(
      root.querySelectorAll('[data-gsap-slider-control]'),
    );

    // Inject aria attributes
    root.setAttribute('role', 'region');
    root.setAttribute('aria-roledescription', 'carousel');
    root.setAttribute('aria-label', 'Slider');
    collection.setAttribute('role', 'group');
    collection.setAttribute('aria-roledescription', 'Slides List');
    collection.setAttribute('aria-label', 'Slides');
    items.forEach((slide, i) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'Slide');
      slide.setAttribute('aria-label', `Slide ${i + 1} of ${items.length}`);
      slide.setAttribute('aria-hidden', 'true');
      slide.setAttribute('aria-selected', 'false');
      slide.setAttribute('tabindex', '-1');
    });
    controls.forEach((btn) => {
      const dir = btn.getAttribute('data-gsap-slider-control');
      btn.setAttribute('role', 'button');
      btn.setAttribute(
        'aria-label',
        dir === 'prev' ? 'Previous Slide' : 'Next Slide',
      );
      btn.disabled = true;
      btn.setAttribute('aria-disabled', 'true');
    });

    // Determine if slider runs
    const styles = getComputedStyle(root);
    const statusVar = styles.getPropertyValue('--slider-status').trim();
    let spvVar = parseFloat(styles.getPropertyValue('--slider-spv'));
    const rect = items[0].getBoundingClientRect();
    const marginRight = parseFloat(getComputedStyle(items[0]).marginRight);
    const slideW = rect.width + marginRight;
    if (isNaN(spvVar)) {
      spvVar = collection.clientWidth / slideW;
    }
    const spv = Math.max(1, Math.min(spvVar, items.length));
    const sliderEnabled = statusVar === 'on' && spv < items.length;
    root.setAttribute(
      'data-gsap-slider-status',
      sliderEnabled ? 'active' : 'not-active',
    );

    if (!sliderEnabled) {
      // Teardown when disabled
      track.removeAttribute('style');
      track.onmouseenter = null;
      track.onmouseleave = null;
      track.removeAttribute('data-gsap-slider-list-status');
      root.removeAttribute('role');
      root.removeAttribute('aria-roledescription');
      root.removeAttribute('aria-label');
      collection.removeAttribute('role');
      collection.removeAttribute('aria-roledescription');
      collection.removeAttribute('aria-label');
      items.forEach((slide) => {
        slide.removeAttribute('role');
        slide.removeAttribute('aria-roledescription');
        slide.removeAttribute('aria-label');
        slide.removeAttribute('aria-hidden');
        slide.removeAttribute('aria-selected');
        slide.removeAttribute('tabindex');
        slide.removeAttribute('data-gsap-slider-item-status');
      });
      controls.forEach((btn) => {
        btn.disabled = false;
        btn.removeAttribute('role');
        btn.removeAttribute('aria-label');
        btn.removeAttribute('aria-disabled');
        btn.removeAttribute('data-gsap-slider-control-status');
      });
      return;
    }

    // Track hover state
    track.onmouseenter = () => {
      track.setAttribute('data-gsap-slider-list-status', 'grab');
    };
    track.onmouseleave = () => {
      track.removeAttribute('data-gsap-slider-list-status');
    };

    //Ccalculate bounds and snap points
    const vw = collection.clientWidth;
    const tw = track.scrollWidth;

    // Calculate centerOffset based on slides per view to maintain peek effect
    let centerOffset;
    if (spv === 1 || spv >= 3) {
      // Full centering for mobile (no peek) or desktop
      centerOffset = vw / 2 - slideW / 2;
    } else if (spv >= 2) {
      // Tablet: reduced offset to maintain peek
      centerOffset = slideW * 0.2;
    } else {
      // Mobile with peek (1 < spv < 2): minimal offset
      centerOffset = slideW * 0.05;
    }

    const maxX = centerOffset;
    const minX = centerOffset - (items.length - 1) * slideW;
    const snapPoints = [];
    for (let i = 0; i < items.length; i++) {
      snapPoints.push(centerOffset - i * slideW);
    }

    const centerIndex = Math.floor((items.length - 1) / 2);
    let activeIndex = centerIndex;
    const setX = gsap.quickSetter(track, 'x', 'px');
    let collectionRect = collection.getBoundingClientRect();

    // Store in sliderState for external access
    sliderState.value.snapPoints = snapPoints;
    sliderState.value.activeIndex = activeIndex;
    sliderState.value.track = track;
    sliderState.value.items = items;
    sliderState.value.centerIndex = centerIndex;

    function updateStatus(x) {
      const previousActiveIndex = activeIndex;
      if (x > maxX || x < minX) {
        return;
      }

      // Clamp and find closest snap
      const calcX = x > maxX ? maxX : x < minX ? minX : x;
      let closest = snapPoints[0];
      snapPoints.forEach((pt) => {
        if (Math.abs(pt - calcX) < Math.abs(closest - calcX)) {
          closest = pt;
        }
      });
      activeIndex = snapPoints.indexOf(closest);

      // Update sliderState and emit event if changed
      sliderState.value.activeIndex = activeIndex;
      if (previousActiveIndex !== activeIndex) {
        emit('activeSlideChange', activeIndex);
      }

      // Calculate viewport center
      const viewportCenter = collectionRect.width / 2;

      // Find the slide closest to center (first loop)
      let closestToCenterIndex = 0;
      let closestToCenterDistance = Infinity;

      items.forEach((slide, i) => {
        const r = slide.getBoundingClientRect();
        const leftEdge = r.left - collectionRect.left;
        const slideCenter = leftEdge + r.width / 2;

        // Calculate distance from slide center to viewport center
        const distanceToCenter = Math.abs(slideCenter - viewportCenter);
        if (distanceToCenter < closestToCenterDistance) {
          closestToCenterDistance = distanceToCenter;
          closestToCenterIndex = i;
        }
      });

      // Update Slide Attributes (second loop)
      items.forEach((slide, i) => {
        const r = slide.getBoundingClientRect();
        const leftEdge = r.left - collectionRect.left;
        const slideCenter = leftEdge + r.width / 2;
        const inView = slideCenter > 0 && slideCenter < collectionRect.width;

        const status =
          i === closestToCenterIndex
            ? 'active'
            : inView
              ? 'inview'
              : 'not-active';

        slide.setAttribute('data-gsap-slider-item-status', status);
        slide.setAttribute(
          'aria-selected',
          i === closestToCenterIndex ? 'true' : 'false',
        );
        slide.setAttribute('aria-hidden', inView ? 'false' : 'true');
        slide.setAttribute('tabindex', i === closestToCenterIndex ? '0' : '-1');
      });

      // Update Controls
      controls.forEach((btn) => {
        const dir = btn.getAttribute('data-gsap-slider-control');
        const can =
          dir === 'prev'
            ? activeIndex > 0
            : activeIndex < snapPoints.length - 1;

        btn.disabled = !can;
        btn.setAttribute('aria-disabled', can ? 'false' : 'true');
        btn.setAttribute(
          'data-gsap-slider-control-status',
          can ? 'active' : 'not-active',
        );
      });
    }

    controls.forEach((btn) => {
      const dir = btn.getAttribute('data-gsap-slider-control');
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        const delta = dir === 'next' ? 1 : -1;
        const target = activeIndex + delta;
        gsap.to(track, {
          duration: 0.4,
          x: snapPoints[target],
          onUpdate: () => updateStatus(gsap.getProperty(track, 'x')),
        });
      });
    });

    // Initialize Draggable
    root._sliderDraggable = Draggable.create(track, {
      type: 'x',
      // cursor: 'inherit',
      // activeCursor: 'inherit',
      inertia: true,
      bounds: { minX, maxX },
      throwResistance: 2000,
      dragResistance: 0.05,
      maxDuration: 0.6,
      minDuration: 0.2,
      edgeResistance: 0.75,
      snap: { x: snapPoints, duration: 0.4 },
      onPress() {
        track.setAttribute('data-gsap-slider-list-status', 'grabbing');
        collectionRect = collection.getBoundingClientRect();
      },
      onDrag() {
        setX(this.x);
        updateStatus(this.x);
      },
      onThrowUpdate() {
        setX(this.x);
        updateStatus(this.x);
      },
      onThrowComplete() {
        setX(this.endX);
        updateStatus(this.endX);
        track.setAttribute('data-gsap-slider-list-status', 'grab');
      },
      onRelease() {
        setX(this.x);
        updateStatus(this.x);
        track.setAttribute('data-gsap-slider-list-status', 'grab');
      },
    })[0];

    // Store updateStatus for external access
    sliderState.value.updateStatus = updateStatus;

    // Initial state - start at center
    const initialX = snapPoints[centerIndex];
    setX(initialX);
    updateStatus(initialX);

    // Emit initial active slide change event
    emit('activeSlideChange', activeIndex);

    // Mark slider as ready
    sliderState.value.isReady = true;
  });
}

// Method to navigate to a specific slide index
function goToSlide(targetIndex) {
  if (!sliderState.value.isReady) {
    console.warn('Slider not ready yet');
    return;
  }

  const { snapPoints, track, updateStatus } = sliderState.value;

  if (targetIndex < 0 || targetIndex >= snapPoints.length) {
    console.warn('Invalid slide index:', targetIndex);
    return;
  }

  gsap.to(track, {
    duration: 0.4,
    x: snapPoints[targetIndex],
    onUpdate: () => updateStatus(gsap.getProperty(track, 'x')),
  });
}

// Expose methods for parent components
defineExpose({
  goToSlide,
  sliderState,
});

// Debouncer: For resizing the window
function debounceOnWidthChange(fn, ms) {
  let last = innerWidth,
    timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (innerWidth !== last) {
        last = innerWidth;
        fn.apply(this, args);
      }
    }, ms);
  };
}

onMounted(() => {
  window.addEventListener(
    'resize',
    debounceOnWidthChange(initBasicGSAPSlider, 200),
  );

  initBasicGSAPSlider();
});
</script>

<template>
  <div
    aria-label="Slider"
    data-gsap-slider-init=""
    role="region"
    aria-roledescription="carousel"
    class="gsap-slider"
  >
    <div data-gsap-slider-collection="" class="gsap-slider__collection">
      <div data-gsap-slider-list="" class="gsap-slider__list">
        <slot />
      </div>
    </div>

    <div data-gsap-slider-controls="" class="gsap-slider__controls">
      <slot name="controls" />
    </div>
  </div>
</template>

<style>
.gsap-slider {
  grid-column-gap: 3em;
  grid-row-gap: 3em;
  flex-flow: column;
  align-items: center;
  width: 100%;
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  position: relative;
  overflow: hidden;
}

.gsap-slider__collection {
  width: 100%;
  max-width: 72em;
}

.gsap-slider__list {
  -webkit-user-select: none;
  user-select: none;
  will-change: transform;
  touch-action: pan-y;
  backface-visibility: hidden;
  display: flex;
}

.demo-card {
  background-color: #2c2c2c;
  border: 1px solid #2c2c2c;
  border-radius: 1.5em;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
}

.before__125 {
  padding-top: 125%;
}

.osmo-icon-svg {
  opacity: 0.1;
  width: 40%;
  position: absolute;
}

.demo-card__tag {
  position: absolute;
  top: 2em;
  left: 2em;
}

.demo-card__tag-p {
  margin-bottom: 0;
  font-size: 2em;
  line-height: 1;
}

/* Setup */

[data-gsap-slider-init] {
  --slider-status: on; /* Turn slider on/off */
  --slider-spv: 3; /* Slides per view */
  --slider-gap: 24px; /* Slides Gap */
}

@media screen and (max-width: 991px) {
  [data-gsap-slider-init] {
    --slider-status: on; /* Turn slider on/off */
    --slider-spv: 2.25; /* Slides per view */
    --slider-gap: 16px; /* Slides Gap */
  }
}

@media screen and (max-width: 767px) {
  [data-gsap-slider-init] {
    --slider-status: on; /* Turn slider on/off */
    --slider-spv: 1; /* Slides per view */
    --slider-gap: 8px; /* Gap */
  }
}

[data-gsap-slider-item]:last-child {
  margin-right: 0;
}

/* Controls */

.gsap-slider__controls {
  grid-column-gap: 0.5em;
  grid-row-gap: 0.5em;
  justify-content: center;
  align-items: center;
  display: flex;
}

.gsap-slider__control {
  color: #efeeec;
  background-color: #131313;
  border: 1px solid #2c2c2c;
  border-radius: 0.25em;
  padding: 0.75em 1.5em;
  font-size: 1em;
}

[data-gsap-slider-status='not-active'] [data-gsap-slider-controls] {
  display: none;
}

[data-gsap-slider-control-status='not-active'] {
  opacity: 0.2;
  pointer-events: none;
}

/* Customization */

.gsap-slider__control {
  transition: opacity 0.3s ease;
}

.demo-card {
  transition: all 0.3s ease;
}

[data-gsap-slider-item-status='not-active'] .demo-card {
  background-color: #131313;
}

.demo-card__tag {
  transition: all 0.3s ease;
}

[data-gsap-slider-item-status='not-active'] .demo-card__tag {
  opacity: 0;
}
</style>
