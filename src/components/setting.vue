<template>
  <winbox>
    <div
      class="w-full px-10 py-4"
    >
      <el-collapse
        v-model="activeName"
        accordion
      >
        <el-collapse-item
          title="切换 二次元 背景图片"
          name="1"
          class="w-full"
        >
          <div class="flex w-full flex-wrap justify-around">
            <div
              v-for="(i) in lightBgImgList"
              :key="i"
              class="pic"
              :style="`background-image: url(${i})`"
              @click="backgroundController.setBackgroundImg(i)"
            />
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="切换 风景 背景图片"
          name="2"
          class="w-full"
        >
          <div class="flex w-full flex-wrap justify-around">
            <div
              v-for="(i) in darkBgImgList"
              :key="i"
              class="pic"
              :style="`background-image: url(${i})`"
              @click="backgroundController.setBackgroundImg(i)"
            />
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="切换 渐变色 背景"
          name="3"
          class="w-full"
        >
          <div class="flex w-full flex-wrap justify-around">
            <div
              v-for="(i) in linearGradient"
              :key="i"
              class="pic"
              :style="`background-image: ${i}`"
              @click="backgroundController.setBackgroundImg(i)"
            />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </winbox>
</template>

<script setup lang='ts'>
import winbox from '@/composables/winbox.vue';
import { ref } from 'vue';
import backgroundController from '@/controllers/backgroundController';

const activeName = ref('1');

// 自动批量导入背景图片路径
const lightBgImgList = ref([]);
const lightBgUrls = Object.values(
  import.meta.glob('../assets/img/darkBg/*', { as: 'url' }),
).map((fn: any) => fn());
Promise.allSettled(lightBgUrls).then((urls) => {
  lightBgImgList.value = urls.map((url: any) => url.value);
});

const darkBgImgList = ref([]);
const darkBgUrls = Object.values(
  import.meta.glob('../assets/img/darkBg/*', { as: 'url' }),
).map((fn: any) => fn());
Promise.allSettled(darkBgUrls).then((urls) => {
  darkBgImgList.value = urls.map((url: any) => url.value);
});

// 渐变色背景
const linearGradient = ref([
  'linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)',
  'linear-gradient(to left, #654ea3, #eaafc8)',
  'linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)',
  'linear-gradient(to top, #d3959b, #bfe6ba)',
  'linear-gradient(to top, #8360c3, #2ebf91)',
  'linear-gradient(to top, #8360c3, #2ebf91)',
]);
</script>

<style scoped>

.el-collapse {
  --el-collapse-content-text-color: white;

  padding: 0;
  overflow: hidden;
  border: 1px solid rgb(136 220 214);
  border-radius: 4px;
}

.el-collapse:deep(.el-collapse-item__header) {
  padding-left: 1rem;
  font-weight: 700;
  background-color: rgb(162 175 178);
}

.el-collapse:deep(.el-collapse-item__wrap) {
  display: flex;
  color: white;
  background-color: rgb(44 45 45);
}

.el-collapse:deep(.el-collapse-item__content) {
  width: 100%;
  padding: 20px 0;
}

.pic {
  width: 240px;
  height: 120px;
  margin: 20px 0;
  background-position: center;
  background-size: cover;
  border-radius: 4px;
}
</style>
