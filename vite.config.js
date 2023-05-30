import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import svgLoader from 'vite-svg-loader';
import { resolve } from 'path';
// import { Plugin as importToCDN } from 'vite-plugin-cdn-import';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_BASE_PUBLIC_PATH,
    plugins: [
      vue(),
      // importToCDN({
      //   modules: [{
      //     name: 'jquery',
      //     var: '$',
      //     path: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js',
      //   }],
      // }),
      eslint({ cache: false }),
      stylelint(),
      svgLoader(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  });
};
