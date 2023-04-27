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

/**
 * 获取分类列表
 */
export const categoryList = () => {
    return request({
        method: 'get',
        url:'/categories'
    })
}

/**
 * 模糊搜索
 */
export const search = (data) => {
    return request({
        method: 'get',
        url: '/articles/search/'+data,
    })
}