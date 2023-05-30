<template>
  <card class="host-card h-[70vh] w-[24vw] px-6 pb-6">
    <ul class="flex  h-full w-full flex-col items-center justify-around">
      <!-- 头像 -->
      <li>
        <el-avatar
          :size="100"
          src="/img/avatar.jpg"
          data-theme="dark"
        />
      </li>
      <!-- 昵称和简介 -->
      <li>
        <div class="text-center">
          MUTTERTOOLS
        </div>
        <div class="text-center">
          HELLO，欢迎光临 我的世界 🚀
        </div>
      </li>
      <!-- 文章 标签 分类 -->
      <li class="w-full">
        <ul class="flex justify-around">
          <li>
            <div class="text-center">
              文章
            </div>
            <div class="text-center">
              11
            </div>
          </li>
          <li>
            <div class="text-center">
              文章
            </div>
            <div class="text-center">
              11
            </div>
          </li>
          <li>
            <div class="text-center">
              文章
            </div>
            <div class="text-center">
              11
            </div>
          </li>
        </ul>
      </li>
      <!-- github首页 -->
      <li>
        <el-button
          type="primary"
          size="large"
        >
          Github Home Page
        </el-button>
      </li>
      <!-- 联系方式 -->
      <li class="connection flex w-full items-center justify-between px-10">
        <a
          v-for="item in connections"
          :key="item.title"
          class="qq-icon animated-hover"
          :href="item.href"
          :title="item.href"
          :class="item.class"
        />
      </li>
    </ul>
  </card>
</template>

<script setup lang='ts'>
import card from '@/composables/card.vue';

const connections = [{
  href: 'https://res.abeim.cn/api/qq/?qq=2407491760',
  title: 'QQ',
  class: 'qq-icon',
}, {
  href: '#',
  title: '微信',
  class: 'wx-icon',
}, {
  href: '#',
  title: '钉钉',
  class: 'dd-icon',
}, {
  href: '#',
  title: 'Github',
  class: 'github-icon',
}];
</script>

<style>
.host-card {
  background: url("/img/aurora.webp"), rgb(0 0 0 / 90%);
  background-repeat: no-repeat,
    no-repeat;
  background-position: center,
    center;
  background-size: cover;
  border-radius: 16px;
}

.connection a {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.qq-icon {
  background: url('../assets/img/QQ.svg');
}

.wx-icon {
  background: url('../assets/img/微信.svg');
}

.dd-icon {
  background: url('../assets/img/钉钉.svg');
}

.github-icon {
  background: url('../assets/img/Github.svg');
  filter: invert(1);
}
</style>
