import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/cookie';

// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css"
// start 进度条开始  done 进度条结束
const requests = axios.create({
    baseURL:"http://localhost:3000",
    // 代表请求超时的时间5s
    timeout:5000,
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    withCredentials: true
});
//请求拦截器
requests.interceptors.request.use((config)=>{
    //config 配置对象 对象有一个属性很重要 headers
    // const token = localStorage.getItem("TOKEN");
    // if(token){
    //   config.headers.token= token;  
    // }
    nprogress.start();
    //添加时间戳
    if (config.method == 'post') {
        config.data = {
          ...config.data,
          _t: Date.parse(new Date()) / 1000
        }
      } else if (config.method == 'get') {
        config.params = {
          _t: Date.parse(new Date()) / 1000,
          ...config.params
        }
      }
    return config;
},error => {
    console.log(error)
    return Promise.reject(error)
});

//响应拦截器
requests.interceptors.response.use((response)=>{
    //成功的回调函数，服务器响应数据回来以后
    nprogress.done(); 
    return response.data;
},(error)=>{
    console.log(error);
    return Promise.reject(new Error('faile'));
})


export default requests;