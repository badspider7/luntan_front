/**
 * 文章相关请求模块
 */
import request from '../utils/request'

/**
 * 获取文章列表
 */
export const getArticleLists = () => {
    return request({
        method: "get",
        url:"/articles"
    })
}

/**
 * 创建文章
 */

export const createArticle = () => {
    
}