<template>
  <div class="site-title flex flex-col">
    <span class="text-5xl">MUTTERTOOLS🍭</span>
    <br>
    <br>
    <span><span class="typed" /></span>
  </div>
</template>

<script setup>
/* eslint-disable */
import { onMounted } from 'vue'
let typed;
// onMounted(() => {
//   typed = new Typed('.typed', {
//     strings: [`Welcome to M.T ^1000 の Tiny Home!🤣🤣🤣`,
//       `Hope you have a nice day!🍭🍭🍭|`],
//     typeSpeed: 50,
//     backSpeed: 60,
//     loop: true,
//     // cursorChar: '🔥',  
//     // cursorChar: '🌈',  
//   });
// })
</script>

<style>
.site-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.site-title span {
  animation: 10s linear 0s infinite normal none running light_15px;
}

.typed,
.typed-cursor {
  font-size: 30px;
  animation: 10s linear 0s infinite normal none running light_15px;
}
</style>
