# 1、环境准备
```
npm install -g pnpm
```

# 2、根据模板创建项目
```
npx degit dcloudio/uni-preset-vue#vite my-vue3-uniapp-template
```

# 3、集成unocss (https://unocss.dev/)
```
pnpm add -D unocss unocss-preset-weapp @uni-helper/unocss-preset-uni
```

```js
#uno.config.ts


import presetWeapp from 'unocss-preset-weapp'
import { defineConfig } from 'unocss'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { presetUni } from '@uni-helper/unocss-preset-uni'


export default defineConfig({
  presets: [
    // uno的小程序预设，内置transformer用于兼容小程序 https://www.npmjs.com/package/unocss-preset-weapp
    presetWeapp(),
    // 专为uniapp打造的uno预设 https://www.npmjs.com/package/@uni-helper/unocss-preset-uni
    presetUni()
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
  rules: [
    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  ],
})
```
```js
#main.js
import 'uno.css'
import 'virtual:uno.css'
```
```js
#vite.config.js

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
```
```
其他：

VSCode安装UnoCSS插件
https://marketplace.visualstudio.com/items?itemName=antfu.unocss

交互式问答
https://unocss.dev/interactive

练习场
https://unocss.dev/play/
```

# 4、集成Pina (https://pinia.vuejs.org/zh/introduction.html)
```
pnpm i pinia pinia-plugin-persistedstate
```
```js
# src/store/index.js

import createPinia from 'pinia';
import { useUserStore } from './user/index.js'

export default {
    install(app) {
        app.use(createPinia())
        app.config.globalProperties.$store = {
            user : useUserStore()
        }
    }
}

# src/main.js

import store from './store/index'

app.use(store)

```
# 5、集成uni-network (https://www.npmjs.com/package/@uni-helper/uni-network)
```
pnpm add @uni-helper/uni-network
pnpm add query-string
pnpm add @uni-helper/uni-env
@uni-helper/uni-env

# src/utils/request/index.js


```

# 6、集成uniapp-router-next
```
pnpm add uniapp-router-next
pnpm add unplugin-uni-router
pnpm add lodash-es

```