import { un } from '@uni-helper/uni-network';
import store from '@/store/index.js'
import qs from 'query-string'
import { baseURL, timeout } from '@/configs/request'

// 添加请求拦截器
un.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么

    // 解决 content-type 大小写覆盖问题
    if (config.headers['content-type']) {
      config.headers['Content-Type'] = config.headers['content-type']
      delete config.headers['content-type']
    }
    // 解决query无法传递数组的问题
    config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'bracket', })
    // 解决什么都不传某些接口会报错的问题
    if (!config['body']) {
      config['body'] = {}
    }
    // 将 Headers类型对象转换为普通对象
    const headers = config.headers.toString() === '[object Headers]'? Object.fromEntries(config.headers.entries()) : config.headers
    // 将 token 添加到请求头上
    const userStore = store.useUserStore()
    const token = userStore.token
    if (token) {
      headers.token = token
    }
     
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error);
  },
);

// 添加响应拦截器
un.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数
    // 对响应数据做点什么
    console.log('response', response)
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数
    // 对响应错误做点什么
    console.log('response', response)
    return Promise.reject(error);
  },
);

const service = (options = {}) => request.create({
  ...options,
  baseUrl: baseURL,
  headers: {
    'content-type': 'application/json;charset=utf-8',
  },
  // `validateStatus` 定义了对于给定的 HTTP 状态码该 resolve 还是 reject
  // 如果 `validateStatus` 返回 `true`、`null` 或 `undefined`
  // 则 promise 将会被 resolve，否则会被 reject
  validateStatus(...status) {
    return status >= 200 && status < 300;
  },
  timeout,
  xsrfHeaderName: 'token',
  paramsSerializer: (params) => {
    return Object.prototype.toString.call(params).includes('URLSearchParams')
      ? params.toString()
      : qs.stringify(params)
  },
})

const postFormData = (url,params,options = {}) => {
  const formParams = new FormData()
  Object.entries(params).forEach(([key, value]) => {
    formParams.append(key, value)
  })
  params = formParams
  return service({
    url,
    data: params,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...options,
  })
}

const postFormUrlEncoded = (url, params, options = {}) => {
  const queryParams = qs.stringify(params)
  params = queryParams
  return service({
    url,
    data: params,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...options,
  })
}

const get =  (url, params, options = {}) => {
  service({
    url,
    method: 'GET',
    params: params,
    ...options,
  })
}

export default {
  service,
  postFormData,
  postFormUrlEncoded,
  get
}