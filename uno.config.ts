
import presetWeapp from 'unocss-preset-weapp'
import { defineConfig } from 'unocss'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { presetUni } from '@uni-helper/unocss-preset-uni'


export default defineConfig({
  presets: [
    // uno的小程序预设，内置transformer用于兼容小程序 https://www.npmjs.com/package/unocss-preset-weapp
    presetWeapp(),
    // 专为uniapp打造的uno预设 https://www.npmjs.com/package/@uni-helper/unocss-preset-uni
    // presetUni()
  ],
  transformers: [
    transformerAttributify(), // 支持属性化模式
    transformerClass(), // 转换转义类名，支持class写法
  ],
  shortcuts: {
    'center': 'flex items-center justify-center',
    'around': 'flex items-center justify-around',
    'between': 'flex items-center justify-between',
    'inset-center':'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
    'inset-x-center': 'absolute left-1/2 transform -translate-x-1/2',
    'inset-y-center': 'absolute top-1/2 transform -translate-y-1/2',
    'h-safe-bottom': 'h-[constant(safe-area-inset-bottom)] h-[env(safe-area-inset-bottom)]',
    'h-safe-top': 'h-[var(--status-bar-height)]',
  },
  // rules: [
  //   [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
  //   [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  // ],
})