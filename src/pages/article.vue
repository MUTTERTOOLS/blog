<template>
  <suspense>
    <card style="width: 76%;margin: 120px auto;padding: 20px 40px;border-radius: 10px;">
      <H1>Typescript编程</H1>
      <div
        class="vditor"
        style="filter: invert(1)"
      >
        <div id="render-el" />
      </div>
    </card>
  </suspense>
</template>

<script lang="ts">
/* eslint-disable */
import axios from 'axios';
import card from '@/composables/card.vue';

export default {
  components: {
    card,
  },
  data() {
    return {
      md: '',
      rawmd: ''
    };
  },
  async mounted() {
    // debugger;
    let el = document.querySelector('#render-el');
    let opt = {
      mode: 'light',
      anchor: 2,
      theme: 'ant-design'
    }
    const { data } = await axios.get('/markdown/Typescript编程.md');
    console.log(this.$data.rawmd)
    // @ts-ignore
    window.Vditor.preview(el, data, opt);
  },
};
</script>

<style>
.vditor {
  border: 0;
}

.vditor-reset pre>code {
  padding: 1rem;
}
</style>
