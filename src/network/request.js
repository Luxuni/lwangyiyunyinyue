import axios from "axios";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import 'element-plus/dist/index.css';//引入element-plus样式文件
import {ElMessage} from "element-plus";//引入element-plus的ElMessage
export function request (config) {
    const instance = axios.create ({
        baseURL: "https://netease-cloud-music-api-wheat-chi.vercel.app/",
        withCredentials: true,  // 允许请求携带 cookie
        validateStatus: function (status) {
            // 配置可以放行的状态码
            return status <= 503;
        }
    });
    // 添加请求拦截器
    instance.interceptors.request.use (function (config) {
        // 在发送请求之前做些什么
        // NProgress.start ();
        return config;
    }, function (error) {
        // 对请求错误做些什么
        ElMessage({
            message: '似乎请求有点问题',
            grouping: true,
            type: 'error',
        })
        return Promise.reject (error);
    });
    // 添加响应拦截器
    instance.interceptors.response.use (function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        // NProgress.done ();
        return response;
    }, function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        ElMessage({
            message: '似乎响应有点问题',
            grouping: true,
            type: 'error',
        })
        return Promise.reject (error);
    });
    return instance (config);
}
