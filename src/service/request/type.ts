import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface YRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface YRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YRequestInterceptors<T>
  showLoading?: boolean
}
