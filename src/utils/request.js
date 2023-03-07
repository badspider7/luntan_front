import axios from 'axios'
import { getItem } from '../utils/storage'

const request = axios.create({
    baseURL:"http://localhost:3000/api"
})

//请求拦截器
request.interceptors.request.use(function (config) {
    if (getItem("user")) {
        config.headers.Authorization = getItem('user').token
    }
    return config;
}, function (error) {
    return Promise.reject(error)
})

//响应拦截器
request.interceptors.response.use(function (config) {
    //请求响应成功
    return config
}, function (error) {
    //请求响应失败
    const status = error.response.status
    console.log(status);

    return Promise.reject(error)
}
)

export default request