/**
 * 本地存储封装模块
 */
export const getItem = (name) => {
    const data = window.localStorage.getItem(name)
    try {
        //如果 data  是json格式的
        return JSON.parse(data)
    } catch (err) {
        //如果不是 json 格式的，就直接返回
        return data
    }
}

export const setItem = (name,value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name,value)
}

export const removeItem = (name) => {
    window.localStorage.removeItem(name)
}