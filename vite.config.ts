import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'

import { proxy } from './src/config/proxy'
import { wrapperEnv } from './src/utils/getEnv'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  console.log(viteEnv)

  const { VITE_APP_PORT, VITE_APP_PREVIEW, VITE_APP_DROP_CONSOLE } = viteEnv

  return {
    plugins: [vue(), tsconfigPaths()],
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
    server: {
      port: VITE_APP_PORT,
      open: VITE_APP_PREVIEW,
      proxy: proxy(),
    },
    esbuild: {
      pure: VITE_APP_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      chunkSizeWarningLimit: 1500,
    },
  }
})
