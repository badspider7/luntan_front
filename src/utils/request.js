import axios from 'axios'

import Message from '../utils/message'

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 10*1000,
})

//请求前过滤器
instance.interceptors.request.use()

//请求后过滤器
instance.interceptors.response.use()

const request = (config) => {
    
}

export default request;