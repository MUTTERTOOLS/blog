<template>
  <card class="article-card w-[270px] overflow-hidden !rounded-2xl">
    <a
      class="block h-[330px] w-full"
      href="/article"
    >
      <!-- 文章图片 -->
      <div
        class="article-img relative h-[190px] w-full"
        style="clip-path: polygon(0 130px, 0 0, 100% 0, 100% 130px, 50% 100%);"
      >
        <div
          class="mask flex h-full w-full items-center justify-center"
          :style="`background-image: url(${article.pic})`"
        >
          <p
            style="z-index: 10;text-shadow: 1px 1px 2px rgb(0 0 0);"
          >
            「{{ article.slogan }}」
          </p>
        </div>
      </div>

      <!-- 标题 -->
      <div class="flex flex-col items-center justify-around p-4">
        <h4 class="line-clamp-1 w-full text-center font-black">
          {{ article.title }}
        </h4>
        <div class="article-meta text-center text-xs text-gray-400">
          <span class="top">置顶 | </span>
          <span class="calendar">{{ article.publish }} | </span>
          <span class="update">{{ article.update }} | </span>
          <span class="menu">{{ article.series }} | </span>
          <span class="tag">{{ article.tag }}</span>
        </div>
      </div>
    </a>
  </card>
</template>

<script setup lang='ts'>
import card from '@/composables/card.vue';
import { toRefs } from 'vue';

const props = defineProps({
  article: {
    type: Object,
    default: () => ({
      slogan: '🍈妖怪，也是童年的一种寄托',
      title: '中国奇谈 | 乡村巴士带走了王孩儿和神仙',
      publish: '发表于 1 个月前',
      update: '更新于 1 个月前',
      series: '中国奇谈',
      tag: 'Vue3',
      pic: '/img/art2.webp',
    }),
  },
});

const { article } = toRefs(props);
</script>

<style>
.article-card a {
  color: white;
  text-decoration: none;
}

.mask {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: all .4s ease-in-out;
}

.mask::before {
  position: absolute;
  top: 0;
  bottom: 0;

  /* z-index: 0; */
  display: block;
  background-color: rgb(0 0 0 / 60%);
  content: '';
  inset: 0;
}

.mask:hover {
  transform: scale(1.06);
}

.article-meta {
  line-height: 22px;
}

.article-meta > span {
  padding-right: 2px;
  padding-left: 18px;
  background-repeat: no-repeat;
  background-position: top -2px left 0;
  background-size:  14px 16px;
}

.top {
  background: url('../assets/img/图钉.svg');
}

.calendar {
  background: url('../assets/img/日历.svg');
}

.update {
  background: url('../assets/img/更新.svg');
}

.tag {
  background: url('../assets/img/标签.svg');
}

.menu {
  background: url('../assets/img/菜单.svg');
}
</style>
