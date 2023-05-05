import request from '../utils/request'

/**
 * 查询特定的话题
 */
export const Topic = data => {
    return request({
        method: "get",
        url: "/topics?keyword="+data,
    })

}

/**
 * 创造话题
 */
export const createTopic = data => {
    return request({
        method: "post",
        url: "topics",
        data
    })
}

/**
 * 获取话题列表
 */
export const TopicList = () => {
    return request({
        method: 'get',
        url: 'topics'
    })
}

/**
 * 获取每日热搜
 */
export const News = () => {
    return request({
        method: "get",
        url:"/news"
    })
}