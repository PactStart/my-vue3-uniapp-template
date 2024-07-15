import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from 'node:path'

export default async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return defineConfig({
    plugins: [
      uni(),
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '^@': path.resolve(__dirname, './src/'),
        '$uni-router': path.resolve(__dirname, './src/utils/uni-router/'),
      },
    },
  })
}