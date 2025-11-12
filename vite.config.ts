import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiRoot = mode === 'development' ? env.VITE_API_ROOT_DEV : env.VITE_API_ROOT_PROD

  console.log('API Root:', apiRoot)

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      __API_ROOT__: JSON.stringify(apiRoot),
    },
  }
})
