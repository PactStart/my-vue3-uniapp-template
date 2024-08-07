import { isH5 } from '@uni-helper/uni-env'

const isProduction = process.env.NODE_ENV === 'production'

export const appName = 'vite-uniapp-template'

// 项目主题色
export const primaryColor = '#028d71'

// 项目基础路径
export const appBasePath = isProduction ? './' : './'
// 请求地址
export const requestURL = () => process.env.VITE_APP_API_URL
export const requestPath = '/api'
export const requestFilePath = '/file'
// 是否开启代理
export const useProxy = isH5
// 代理路径
export const proxyPath = '/proxy'
// 代理端口号
export const proxyPort = 1996
// 是否开启加密
export const useEncrypt = false
// 主页面路径
export const homePage = 'pages/index/home/index'
