/**
 * 用户相关请求模块
 */
import { getItem } from '../utils/storage'
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

/**
 * 关注
 */

export const following = (data) => {
    return request({
        method: "put",
        url: "/user/following/" + data,
        // headers: { 'Authorization': getItem('user').token }
    })
}

/**
 * 取消关注
 */
export const cancelFollowing = data => {
    return request({
        method: "delete",
        url: "/user/following/" + data ,
        // headers: { 'Authorization': getItem('user').token }
    })
}

/**
 * 获取关注列表
 */
export const followingList = data => {
    return request({
        method: "get",
        url:"/user/"+data+"/following"
    })
}

/**
 * 获取用户粉丝列表
 */
export const followerList = data => {
    return request({
        method: "get",
        url:"/user/"+data+"/followers"
    })
}

/**
 * 获取用户详细信息
 */
export const getUserInfo = data => {
    return request({
        method: 'get',
        url: '/user/'+data
    })
}

/**
 * 修改用户信息
 */
export const modifyUserInfo = data => {
    return request({
        method: 'patch',
        url: '/user/' + data._id,
        data: {
            "username": data.username,
            "email": data.email,
            "gender": data.gender,
            "slogn": data.slogn,
            "business": data.business,
            "locations": data.locations,
            "password": '123123'
        }
    })
}

