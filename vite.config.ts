import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src/shared'),
      },
    },

    plugins: [
      react(),
      tsconfigPaths(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/shared/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      nodePolyfills(),
    ],
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    server: {
      port: 3000,
      host: 'localhost',
      proxy: {
        '/api/v1': {
          target: env.VITE_DEV_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});
