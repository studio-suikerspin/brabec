<script setup>
defineProps({
  avatars: {
    type: Array,
    required: false,
    default: () => [{ avatar: 'https://api.samplefaces.com/face?width=100' }],
  },
});
</script>

<template>
  <div class="trusted-by">
    <div class="avatars">
      <div v-for="(item, index) in avatars" :key="index" class="circle-avatar">
        <PrismicImage :field="item.avatar" />
      </div>
    </div>
    <span class="title">Trusted by leaders</span>
  </div>
</template>

<style lang="scss">
.trusted-by {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .avatars {
    display: flex;
    align-items: center;
  }

  .circle-avatar {
    margin-right: -5px;

    width: 27px;
    height: 27px;
    border-radius: 100px;
    overflow: clip;

    img {
      object-fit: cover;
      object-position: center;
    }
  }

  .title {
    font-size: 10px;
    opacity: 0.5;
  }
}
</style>
