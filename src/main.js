import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
// import '@/assets/styles/fonts.css';
// import '@/assets/styles/main.css';
// 样式
import '@/assets/styles/tailwind.css';
import '@/assets/styles/common.css';
import 'element-plus/dist/index.css';

import ElementPlus from 'element-plus';
import App from '@/app.vue';
import { routes } from '@/routes.js';
import { createPinia } from 'pinia';

import globalStore from './pinia.js';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PUBLIC_PATH),
  routes,
});

const app = createApp(App);

app.config.globalProperties = {
  path: '/',
  window: {
    path: '/',
  },
};

app.use(router)
  .use(ElementPlus)
  .use(createPinia());

app.mount('#app');

const store = globalStore();
window.console.log(store);

// globalThis.path = '/';
window.console.log(window);
