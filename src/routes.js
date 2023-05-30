// import Index from '@/pages/index.vue';
import NotFound from '@/pages/not-found.vue';

export const routes = [
  { path: '/', component: () => import('@/pages/home.vue') },
  { path: '/article', component: () => import('@/pages/article.vue') },
  { path: '/:path(.*)', component: NotFound },
];

export default routes;
