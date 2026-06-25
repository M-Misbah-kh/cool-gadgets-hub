import { defineConfig } from '@tanstack/react-start/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  tsr: {
    appDirectory: 'Src',
    routesDirectory: 'Src/routes',
    generatedRouteTree: 'Src/routeTree.gen.ts',
    quoteStyle: 'single',
    semicolons: false,
  },
  vite: {
    plugins: [
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
  server: {
    preset: 'cloudflare-pages',
  },
})
