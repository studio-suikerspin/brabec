<script lang="ts" setup>
import type { SettingsDocument } from '~~/prismicio-types';

const {settings} = defineProps<{
  settings: SettingsDocument
}>()
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <h1 class="logo">BRABEC</h1>
        
        <a href="javascript:;" class="menu-trigger">
          <i class="icon-menu" />
        </a>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }

  .menu-trigger {
    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 26px;
    line-height: 100%;
    
    border-radius: 100px;
    background: var(--white-30);
  }
}


</style>
