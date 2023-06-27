<template>
  <VueWinBox ref="winBox">
    <slot />
  </VueWinBox>
</template>

<script setup lang='ts'>
import VueWinBox from 'vue-winbox';
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});

const winBox = ref();
onMounted(() => {
  winBox.value.winbox.setTitle(props.title);
  winBox.value.winbox.move('center', 'center');
});
</script>

<style>
.winbox {
  /* top: 50%; */

  /* left: 50%; */
  overflow: hidden;
  border-radius: 10px;

  /* transform: translate(-50%, -50%); */
}

.wb-header {
  background-color: rgb(57 197 187);
}

.wb-body {
  background-color: rgb(51 51 51);
}
</style>
