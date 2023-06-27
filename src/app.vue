<template>
  <div style="position: relative;">
    <div class="bg-pic" />
    <navbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">

// 组件
import navbar from './components/navbar.vue';
</script>

<style>
.bg-pic {
  position: fixed;
  top: 0;
  z-index: -999;
  width: 100vw;
  height: 100vh;
  background-image: url('/img/bg1.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.bg-pic::before {
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 70%);
  content: '';

}
</style>
