// service 统一出口

import YRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const yRequest = new YRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败拦截')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('响应成功拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应失败拦截')
      return err
    }
  }
})

export default yRequest
