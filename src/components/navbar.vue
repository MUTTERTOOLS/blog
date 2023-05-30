<template>
  <el-affix
    :offset="0"
    style="position: absolute; width: 100%; height: 0;"
  >
    <div id="navbar">
      <!-- 网站名 -->
      <div id="website">
        JUST BLOG🚀
      </div>

      <!-- 网站导航 -->
      <!-- <ul id="nav">
        <li>123</li>
        <li>123</li>
        <li>123</li>
      </ul> -->

      <!-- 网站设置 -->
      <div class="w-40">
        <ul class="flex">
          <!-- <li>123</li> -->
          <li><switchMode /></li>
        </ul>
      </div>
    </div>
  </el-affix>
</template>

<script setup lang='ts'>
import switchMode from '@/composables/switchMode.vue';
</script>

<style>
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
