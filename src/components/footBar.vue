<template>
  <footer class="footBar">
    <ul class="flex flex-col items-center justify-center">
      <li>©2022-2023  By MUTTERTOOLS</li>
      <li>
        <img
          class="w-36"
          src="@/assets/img/E-rest.png"
          alt="E-rest"
        >
      </li>
      <li class="h-6 overflow-hidden">
        <span>小破站已艰难运行了 {{ day }} 天 {{ hour }} 小时 {{ minute }} 分 {{ second }} 秒</span>
        <span class="heartIcon"> 💓 </span>
      </li>
      <li>
        旅行者 1 号当前距离地球约 {{ distance }} 千米，约为 {{ (distance / 1.5e8).toFixed(6) }} 个天文单位 🚀
      </li>
      <li class="my-2 flex w-full justify-center">
        <img
          class="mx-2"
          src="https://img.shields.io/badge/frame-vue-rgb(74%2C181%2C133)?logo=Vue.js"
          alt="vue"
        >
        <img
          class="mx-2"
          src="https://img.shields.io/badge/build-vite-rgb(100%2C108%2C255)?logo=Vite"
          alt="vite"
        >
        <img
          class="mx-2"
          src="https://img.shields.io/badge/devTool-VSCode-rgb(0%2C138%2C211)?logo=Visual%20Studio%20Code"
          alt="vscode"
        >
        <img
          class="mx-2"
          src="https://img.shields.io/badge/repo-GitHub-rgb(31%2C35%2C40)?logo=GitHub"
          alt="GitHub"
        >
      </li>
    </ul>
  </footer>
</template>

<script setup lang='ts'>
import { ref, onMounted, onUnmounted } from 'vue';

const startDate = +new Date('2022-01-01');
const day = ref(0); const hour = ref(0); const minute = ref(0); const
  second = ref(0); const
  distance = ref(0);

// 设置定时器
let timer = 0;
onMounted(() => {
  timer = setInterval(() => {
    const now = +new Date();
    day.value = Math.floor((now - startDate) / 1000 / 60 / 60 / 24);
    hour.value = Math.floor(((now - startDate) / 1000 / 60 / 60) % 24);
    minute.value = Math.floor(((now - startDate) / 1000 / 60) % 60);
    second.value = Math.floor(((now - startDate) / 1000) % 60);
    distance.value = now;
  }, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style>
/* stylelint-disable-next-line selector-class-pattern */
.footBar {
  font-size: 14px;
}

.heartIcon {
  display: inline-block;
  width: 30px;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
0%,
100% {
  font-size: 14px;
}

10%,
30% {
  font-size: 12px;
}

20%,
40%,
60%,
80% {
  font-size: 14px;
}

50%,
70% {
  font-size: 14px;
}
}

/* @keyframes pulse {
0%,
100% {
  transform: scale(1);
}

10%,
30% {
  transform: scale(0.9);
}

20%,
40%,
60%,
80% {
  transform: scale(1.1);
}

50%,
70% {
  transform: scale(1.1);
}
} */
</style>
