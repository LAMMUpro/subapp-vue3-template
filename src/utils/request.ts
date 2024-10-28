import axios from 'axios';


const service = axios.create({
  baseURL: '/nest',
  timeout: 30000
})

/** 响应拦截器 */
service.interceptors.response.use(res => {
  if ((<any>res.config).isExport) {
    return res
  }
  let result = res.data;
  // 特殊处理一下数据流
  if (['arraybuffer', 'blob'].includes(res.config.responseType!)) {
    result = {
      code: 1,
      data: res.data
    }
  }
  return result;
}, error => {
  if (error.code === 'ERR_CANCELED') return Promise.reject(error)
  const tip = `${error}`;
  const sign = 'Request failed with status code';
  if (tip.includes(sign)) {

  } else if (tip.includes('timeout')) {

  } else if (tip.includes('Network Error')) {

  } else {

  }
  return {
    code: -1,
    msg: `${error}`,
    data: {}
  }
})

/**
 * 基础请求
 * @param method 请求方法
 * @param path 请求路径
 * @param data 请求数据
 * @param options `axios`请求配置，优先级最高
 */
export default function request(method: 'GET' | 'POST' | 'DELETE' | 'PUT', path: string, data?: any, options: any = {}) {
  // 默认设置`json`传参
  const header = (!options || !options.headers) ? {
    'codeMode': 'json',
  } : {};

  const params = {
    method: method,
    url: path,
    params: method === 'GET' ? data : {},
    data: method !== 'GET' ? data : {},
    // dataType: 'json', 默认就是，可写可不写，根据情况定
    headers: header,
    ...options,
    timeout: options.timeout
  }

  return service(params) as any;
}
