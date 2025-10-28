<template>
  <div class="avatar-wrap">
    <slot />
  </div>
</template>

<style>
.avatar-wrap {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
