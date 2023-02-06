/**
 * 问题相关请求模块
 */
import request from '../utils/request'

/**
 * 获取问题列表
 */
export const getQuestionList = (data) => {
    return request({
        method: "get",
        url: "/questions",
        params: data
    })
}

/**
 * 查询指定问题
 */
export const getQuestion = (data) => {
    return request({
        method: "get",
        url: "/questions"+"/"+data,
        
    })
}