import { defineStore } from 'pinia';

// eslint-disable-next-line no-undef

const globalStore = defineStore('global', {
  // 其它配置项,主要为state、getters、actions
  state() {
    return {
      path: import.meta.env.MODE === 'production' ? '/' : '/pictures/',
    };
  },

});
export default globalStore;
// userUsersStore是一个函数，返回store对象
