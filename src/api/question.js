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

/**
 * 获取答案列表
 */
export const getAnswer = data => {
    return request({
        method: "get",
        url:"/questions/"+data+"/answerlist"
    })
}

/**
 * 回复问题(创建答案)
 */
export const createAnswer = data => {
    return request({
        method: "post",
        url: "/questions/"+data.questionId+"/answers",
        data:{
            content: data.content
        }
    })
}

/**
 * 创建问题
 */
export const createQuestion = data => {
    return request({
        method: "post",
        url: "/questions",
        data,
        // headers:{ 'Authorization': getItem('user').token }
    })
}


/**
 * 删除问题
 */
export const deleteQuestion = data => {
    return request({
        method: "delete",
        url: "/questions/"+data,
    })
}