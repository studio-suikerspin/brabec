<template>
  <svg
    :class="`testimonials__card-corner testimonials__card-corner--${position}`"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
  >
    <path :d="pathData" stroke="#FF6E02" />
  </svg>
</template>

<script setup>
const props = defineProps({
  position: {
    type: String,
    required: true,
    validator: (value) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value),
  },
});

const cornerPaths = {
  'top-left': { width: 33, height: 30, d: 'M33 0.5H0.5V29.5' },
  'top-right': { width: 30, height: 33, d: 'M0.5 0V32.5H29.5' },
  'bottom-left': { width: 30, height: 33, d: 'M0.5 0V32.5H29.5' },
  'bottom-right': { width: 33, height: 30, d: 'M0 29H32.5V0' },
};

const { width, height, d: pathData } = cornerPaths[props.position];
</script>
