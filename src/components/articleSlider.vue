<template>
  <div
    class="articles w-full !rounded-2xl"
    style="border: 2px solid grey !important;"
  >
    <el-carousel
      class=" rounded-2xl bg-white"
      direction="vertical"
      :autoplay="true"
    >
      <el-carousel-item
        v-for="i in articles"
        :key="i.title"
      >
        <a
          class="block"
          :href="i.href"
        >
          <card
            class="flex h-[280px] w-[70vw] items-center justify-center rounded-2xl !border-0 p-7"
          >
            <div class="h-full align-middle">
              <img
                :src="i.pic"
                class="slider-img"
              >
            </div>
            <div
              style="padding: 14px"
              class="flex h-full flex-1 flex-col justify-around"
            >
              <h4 class="article-title">
                {{ i.title }}
              </h4>

              <div>{{ i.date }}</div>

              <div
                class="intro line-clamp-3 indent-[2em]"
              >
                {{ i.desc }}
              </div>
            </div>
          </card>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang='ts'>
import card from '@/composables/card.vue';

const articles = [{
  title: '浏览器渲染机制',
  date: '2023-4-10',
  desc: '页面渲染优化前，首先需要搞清楚浏览器的渲染原理，然后主要是在代码层面进行优化。我分了3个部分：优化html代码，优化js和css代码，优化动画效果。',
  href: '/article',
  pic: '/img/slider1.webp',
}, {
  title: '浏览器渲染机制',
  date: '2023-4-10',
  desc: '页面渲染优化前，首先需要搞清楚浏览器的渲染原理，然后主要是在代码层面进行优化。我分了3个部分：优化html代码，优化js和css代码，优化动画效果。',
  href: '/article',
  pic: '/img/slider2.webp',
}, {
  title: '浏览器渲染机制',
  date: '2023-4-10',
  desc: '页面渲染优化前，首先需要搞清楚浏览器的渲染原理，然后主要是在代码层面进行优化。我分了3个部分：优化html代码，优化js和css代码，优化动画效果。',
  href: '/article',
  pic: '/img/slider3.webp',
}, {
  title: '浏览器渲染机制',
  date: '2023-4-10',
  desc: '页面渲染优化前，首先需要搞清楚浏览器的渲染原理，然后主要是在代码层面进行优化。我分了3个部分：优化html代码，优化js和css代码，优化动画效果。',
  href: '/article',
  pic: '/img/slider4.webp',
}];
</script>

<style>

.articles .el-carousel__container {
  height: 280px;
}

.article-title {
  /* color: white; */
  font-weight: 1000;
  font-size: 20px;
}

/* .article-title:hover,
.intro:hover {
  color: white;
} */

.intro {
  /* color: white; */
}

.slider-img {
  width: 27vw;

  /* height: 200px; */

  height: 100%;
  border-radius: 10px;
}

</style>
