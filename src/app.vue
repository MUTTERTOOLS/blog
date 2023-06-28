<template>
  <div style="position: relative;">
    <div
      class="bg-pic"
      :style="bgStyle"
    />
    <navbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import backgroundController from '@/controllers/backgroundController';
import navbar from './components/navbar.vue';

const bgStyle = backgroundController.getBackgroundStyle();
window.console.log(bgStyle);
</script>

<style>
.bg-pic {
  position: fixed;
  top: 0;
  z-index: -999;
  width: 100vw;
  height: 100vh;
}

.bg-pic::before {
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 70%);
  content: '';

}
</style>
