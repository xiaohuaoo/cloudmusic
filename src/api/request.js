import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

const request = axios.create({
  baseURL: 'http://101.35.235.36:3000/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 启动进度条
  nprogress.start()
  // 时间戳
  // console.log(config)
  if (config.method === 'post') {
    config.data = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000
    }
  } else if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: Date.parse(new Date()) / 1000
    }
  }
  return config
}, (error) => {
  console.log(error)
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response) => {
  // 成功的回调函数，服务器响应数据回来以后
  nprogress.done()
  return response.data
}, (error) => {
  console.log(error)
  return Promise.reject(error)
})

export default request
