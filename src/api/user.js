/**
 * 用户相关请求模块
 */
import request from "@/utils/request";

/**
 * 登录/注册
 */
export const login = data => {
    return request({
        method: "post",
        url: "/user/login",
        data
    })
}