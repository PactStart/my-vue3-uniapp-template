import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

export default async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return defineConfig({
    plugins: [
      uni(),
      UnoCSS(),
    ],
  })
}