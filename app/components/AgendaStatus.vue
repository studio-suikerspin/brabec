<script setup>
const {agenda} = defineProps({
  agenda: Object,
}); 
</script>

<template>
    <div class="agenda">
      <div :class="`agenda__dot agenda__dot--${agenda.open ? 'green' : 'red'}`" />
      <div class="agenda__text">
        Agenda open - {{ agenda.spots_available }} {{ agenda.spots_text }}
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
  
  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 100%;

    &--green {
      background: #10B70B;
    }
  }
}
</style>