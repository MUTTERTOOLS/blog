import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
// import '@/assets/styles/fonts.css';
// import '@/assets/styles/main.css';
// 样式
import '@/assets/styles/tailwind.css';
import '@/assets/styles/common.css';
import 'element-plus/dist/index.css';
// import 'vditor/dist/index.css';

import ElementPlus from 'element-plus';
import App from '@/app.vue';
import { routes } from '@/routes.js';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PUBLIC_PATH),
  routes,
});

const app = createApp(App);

// app.config.globalProperties.$path = import.meta.env.PATH;
// window.$path = import.meta.env.PATH;
window.console.log(import.meta);

app.use(router)
  .use(ElementPlus);
app.mount('#app');
