import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import CONSTS from './src/utils/CONSTS';
import path from 'path';

export default defineConfig({
  base: `/${CONSTS.PREFIX_URL}/`,
  resolve: {
    alias: {
      /** cdn位置 或 相对当前文件的位置 （本地运行时生效，打包external时不会替换关键词！！！） */
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue()],
  server: {
    port: CONSTS.PORT,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'build',
  },
});
