/**
 * 文章相关请求模块
 */
import request from '../utils/request'
import { getItem } from '../utils/storage'

/**
 * 获取文章列表
 */

export const getArticleLists = (data) => {
    return request({
        method: "get",
        url: "/articles",
        params: data,
    })
}

/**
 * 创建文章
 */

export const createArticle = (data) => {
    return request({
        method: "post",
        url: "/articles",
        data,
        // headers: { 'Authorization': getItem('user').token }
    })
}

/**
 * 获取指定文章
 */
export const getArticle = data => {
    return request({
        method: "get",
        url:"/articles/"+data
    })
}