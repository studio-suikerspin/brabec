<script setup lang="ts">
// Types & modules
import { PrismicRichText, SectionEyebrow, SectionTitle } from "#components";
import { asText, type Content } from "@prismicio/client";

const { gsap } = useGsap();

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ProcessStepsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

function initMomentumBasedHover() {

  // If this device can’t hover with a fine pointer, stop here
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {return;}
  
  // Configuration (tweak these for feel)
  const xyMultiplier       = 30;  // multiplies pointer velocity for x/y movement
  const rotationMultiplier = 20;  // multiplies normalized torque for rotation speed
  const inertiaResistance  = 200; // higher = stops sooner

  // Pre-build clamp functions for performance
  const clampXY  = gsap.utils.clamp(-1080, 1080);
  const clampRot = gsap.utils.clamp(-60, 60);

  // Initialize each root container
  document.querySelectorAll('[data-momentum-hover-init]').forEach(root => {
    let prevX = 0, prevY = 0;
    let velX  = 0, velY  = 0;
    let rafId = null;

    // Track pointer velocity (throttled to RAF)
    root.addEventListener('mousemove', e => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        velX = e.clientX - prevX;
        velY = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;
        rafId = null;
      });
    });

    // Attach hover inertia to each child element
    root.querySelectorAll('[data-momentum-hover-element]').forEach(el => {
      el.addEventListener('mouseenter', e => {
        const target = el.querySelector('[data-momentum-hover-target]');
        if (!target) return;

        // Compute offset from center to pointer
        const { left, top, width, height } = target.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        // Compute raw torque (px²/frame)
        const rawTorque = offsetX * velY - offsetY * velX;

        // Normalize torque so rotation ∝ pointer speed (deg/sec)
        const leverDist    = Math.hypot(offsetX, offsetY) || 1;
        const angularForce = rawTorque / leverDist;

        // Calculate and clamp velocities
        const velocityX        = clampXY(velX * xyMultiplier);
        const velocityY        = clampXY(velY * xyMultiplier);
        const rotationVelocity = clampRot(angularForce * rotationMultiplier);

        // Apply GSAP inertia tween
        gsap.to(target, {
          inertia: {
            x:        { velocity: velocityX,        end: 0 },
            y:        { velocity: velocityY,        end: 0 },
            rotation: { velocity: rotationVelocity, end: 0 },
            resistance: inertiaResistance
          }
        });
      });
    });
  });
}

onMounted(() => {
  initMomentumBasedHover()
})
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="process-steps block-padding"
  >
    <div class="process-steps__inner">
      <SectionHeader>
        <SectionEyebrow>
          {{ slice.primary.eyebrow }}
        </SectionEyebrow>

        <PrismicRichText 
          :field="slice.primary.title" 
          :components="{
            heading1: SectionTitle
          }"
        />
      </SectionHeader>

      <div class="process-steps__steps-wrap">
        <UICard v-for="(item, index) in slice.primary.steps" :key="index" :classes="'process-card'">
          <span class="process-card__number title-font">{{ index + 1 }}</span>
          <div class="process-card__content">
            <div class="process-card__title title-font">{{ item.step_title }}</div>
            <div class="process-card__description">
              {{ asText(item.step_description) }}
            </div>
          </div>
        </UICard>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .process-steps {
    &__inner {
      display: flex;
      flex-direction: column;
    }

    &__steps-wrap {
      display: flex;
      align-items: center;

      padding-block: 80px;
    }

    .process-card {
      max-width: 360px;
      min-width: 300px;
      width: 100%;
      height: 100%;
      aspect-ratio: 3 / 4;

      .card__inner {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      &__number {
        font-size: 40px;
        font-weight: 800;
        line-height: normal;
        color: var(--black);
      }

      &__content {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      &__title {
        font-size: 21px;
        font-weight: 600;
        font-style: normal;
        line-height: normal;
        color: var(--black);
      }

      &__description {
        font-size: 18px;
        font-weight: 500;
        font-style: normal;
        line-height: normal;
        color: var(--black);
      }
    }
  }
</style>
