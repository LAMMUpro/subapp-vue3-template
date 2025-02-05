import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import CONSTS from './src/utils/CONSTS';
import path from 'path';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  base: `/${CONSTS.PREFIX_URL}/`,
  resolve: {
    alias: {
      /** cdn位置 或 相对当前文件的位置 （本地运行时生效，打包external时不会替换关键词！！！） */
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue(), react(),UnoCSS(),],
  server: {
    port: CONSTS.PORT,
    host: '0.0.0.0',
    proxy: {
      /** request发起的请求都以/nest开头 */
      '/nest': {
        // target: 'http://localhost:9000', // 本地后端
        target: 'https://ali-lowcode.lammu.cn/nest/', // 后端直接连接线上测试环境
        changeOrigin: true,
        rewrite: path => path.replace(/^\/nest/,'')
      },
    },
  },
  build: {
    outDir: 'build',
  },
});
