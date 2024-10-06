import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import CONSTS from './src/utils/CONSTS';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: `/${CONSTS.PREFIX_URL}/`,
  resolve: {
    alias: {
      /** cdn位置 或 相对当前文件的位置 （本地运行时生效，打包external时不会替换关键词！！！） */
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue(), react(),],
  server: {
    port: CONSTS.PORT,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      plugins: [],
      /** 打包排除这些依赖，保持import { xxx } from 'vue';这种导入 */
      external: ['react', 'react-dom'],
      output: {
        format: 'esm', // 打包模式
        /**
         * 从对应网络路径中加载依赖
         * 对于external排除的依赖，直接从'vue'导入是无效的路径，所以需要配置对应资源路径
         */
        paths: {
          react: `/micromain/js/react.cd730000_h.js`,
          'react-dom': `/micromain/js/react-dom.4bcc0000_h.js`,
        },
        /** 分包 */
        manualChunks: {
          // 'micro-app': ['@micro-zoe/micro-app'],
        },
        /** 入口文件输出格式 */
        entryFileNames: 'js/[name].[hash]_h.js',
        /** js文件输出格式 */
        chunkFileNames: 'js/[name].[hash]_h.js',
        /** 资源文件输出格式 */
        assetFileNames: (assetInfo) => {
          /** 默认输出格式 */
          const defaultFormat = '[ext]/[name].[hash]_h.[ext]';
          /** 图片后缀 */
          const imageExts = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'ico'];
          /** 字体后缀 */
          const fontExts = ['ttf', 'woff', 'woff2'];
          /** 当前文件后缀 */
          const fileExt = assetInfo.name?.split('.').slice(-1)[0];
          /** 提取文件后缀异常处理 */
          if (!fileExt) {
            console.warn('>>> 文件后缀异常: ', assetInfo);
            return defaultFormat;
          }
          /** 图片资源 */
          if (imageExts.includes(fileExt)) {
            return 'img/[name].[hash]_h.[ext]';
          } else if (fontExts.includes(fileExt)) {
            return 'font/[name].[hash]_h.[ext]';
          }
          /** 其它资源 */
          return defaultFormat;
        },
      },
    },
  },
});
