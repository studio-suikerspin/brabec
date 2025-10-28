<script setup>
const { agenda } = defineProps({
  agenda: {
    type: Object,
    required: true,
  },
});

const spotsText = computed(() => {
  if (agenda.spots_available === 1) {
    return 'plek';
  }
  return 'plekken';
});
</script>

<template>
  <div class="agenda">
    <div
      :class="`agenda__dot agenda__dot--${agenda.spots_available ? 'green' : 'red'}`"
    />
    <div class="agenda__text">
      Agenda open - {{ agenda.spots_available_count }} {{ spotsText }}
    </div>
  </div>
</template>

<style lang="scss">
.agenda {
  display: flex;
  align-items: center;
  gap: 10px;

  padding-inline: 16px;
  padding-block: 12px;

  border: 1px solid var(--accent_primary);
  border-radius: 100px;

  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

  width: fit-content;

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 100%;

    &--green {
      background: #10b70b;
    }
  }
}
</style>
