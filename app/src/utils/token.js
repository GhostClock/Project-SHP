// 本地持久化token

// 保存Token
export const setToken = (token) => {
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

// 清除本地存储的Token
export const remoteToken = () => {
    localStorage.removeItem('Token')
}