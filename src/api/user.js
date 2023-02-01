/**
 * 用户相关请求模块
 */
import request from "@/utils/request";

/**
 * 登录
 */
export const login = data => {
    return request({
        method: "post",
        url: "/user/login",
        data
    })
}

/**
 * 注册
 */

export const register = data => {
    return request({
        method: "post",
        url: "/user",
        data
    })
}

/**
 * 一言
 */
export const poetry = () => {
    return request({
        method: "get",
        url:"/getpoem"
    })
}