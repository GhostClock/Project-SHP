
import { v4 as uuidv4 } from 'uuid'
// 生成随机字符串，每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    // 先从本地存储获取，查看本地是否有
    let uuid_token = localStorage.getItem('UUID_TOKEN')
    // 如果没有，就生成一个, 并保存在本地
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('UUID_TOKEN', uuid_token)
    }
    return uuid_token
}

// 保持Token
export const saveToken = (token) => {
    localStorage.removeItem('Token')
    localStorage.setItem('Token', token)
}

// 获取Token
export const getToken = () => {
    const token = localStorage.getItem('Token')
    if (token) {
        return token
    }
    return ''
}