<template>
  <div
    style="position: fixed;top: 0;width: 100%;"
  >
    <div id="navbar">
      <!-- 网站名 -->
      <a
        id="website"
        href="/"
      >
        BLOG🚀
      </a>

      <!-- 网站导航 -->
      <!-- <ul id="nav">
        <li>123</li>
        <li>123</li>
        <li>123</li>
      </ul> -->

      <!-- 网站设置 -->
      <div class="w-40">
        <ul class="flex">
          <li><switchMode /></li>
          <li>
            <setting v-if="showWinbox" />
            <svg
              @click="showWinbox = !showWinbox"
            ><image
              href="/img/设置.svg"
              width="30"
              height="30"
            />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import switchMode from '@/composables/switchMode.vue';
import { ref } from 'vue';
import setting from './setting.vue';

const showWinbox = ref(false);
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}

li {
  margin: 0 10px;
}

#navbar {
  position: relative;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#navbar ul {
  padding: 0;
}

#website {
  padding: 10px 20px;
  font-size: 24px;
  animation: 10s linear 0s infinite normal none running light_15px;
}

#nav {
  display: flex;

  /* align-self: center; */

  /* justify-self: center; */
}

</style>
