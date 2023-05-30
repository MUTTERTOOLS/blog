<template>
  <div>
    <!-- 首页slogan -->
    <slogan />
    <!-- 两列布局 -->
    <div class="flex px-4">
      <div class="w-[70vw]">
        <!-- 推荐文章轮播 -->
        <articleSlider data-aos="zoom-in" />

        <br>
        <br>
        <br>

        <!-- 文章列表 -->
        <div class="flex w-full items-center justify-between">
          <articleCard
            v-for="(i, index) in articleList"
            :key="index"
            data-aos="zoom-in"
            :article="i"
          />
        </div>
      </div>

      <div class="hidden w-[370px] pl-4 md:block">
        <!-- 博主卡片 -->
        <hostCard data-aos="zoom-in" />
      </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <div class="clear-both" />
    <br><br><br><br><br>
    <!-- 底部版权 -->
    <footBar />
  </div>
</template>

<script setup lang='ts'>
import slogan from '@/components/slogan.vue';
import articleSlider from '@/components/articleSlider.vue';
import articleCard from '@/components/articleCard.vue';
import hostCard from '@/components/hostCard.vue';
import footBar from '@/components/footBar.vue';

const articleList = [{
  slogan: '🍈妖怪，也是童年的一种寄托',
  title: '中国奇谈 | 乡村巴士带走了王孩儿和神仙',
  publish: '发表于 1 个月前',
  update: '更新于 1 个月前',
  series: '中国奇谈',
  tag: 'Vue3',
  pic: '/img/art1.webp',
},
{
  slogan: '🍈妖怪，也是童年的一种寄托',
  title: '中国奇谈 | 乡村巴士带走了王孩儿和神仙',
  publish: '发表于 1 个月前',
  update: '更新于 1 个月前',
  series: '中国奇谈',
  tag: 'Vue3',
  pic: '/img/art2.webp',
}, {
  slogan: '🍈妖怪，也是童年的一种寄托',
  title: '中国奇谈 | 乡村巴士带走了王孩儿和神仙',
  publish: '发表于 1 个月前',
  update: '更新于 1 个月前',
  series: '中国奇谈',
  tag: 'Vue3',
  pic: '/img/art3.webp',
}];

</script>

<style>

</style>
