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
          title="切换背景图片"
          name="1"
          class="w-full"
        >
          <div class="flex w-full flex-wrap justify-around">
            <div
              v-for="(i) in bgImgList"
              :key="i"
              class="pic"
              :style="`background-image: url(${i})`"
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
const bgImgList = ref([]);
const modules = import.meta.glob('../../public/img/bg/*', { as: 'url' });
const imgUrls = Object.values(modules).map((fn) => fn());
Promise.allSettled(imgUrls).then((urls) => {
  bgImgList.value = urls.map((url) => url.value);
});
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
