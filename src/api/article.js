/**
 * 文章相关请求模块
 */
import request from '../utils/request'

/**
 * 获取文章列表
 */
export const getArticleLists = (data) => {
    return request({
        method: "get",
        url: "/articles",
        params:data
    })
}

/**
 * 创建文章
 */

export const createArticle = () => {
    
}