// 登录和注册的仓库

import { reqGetCode, reqUserRegister, reqUserLogin } from "@/api";

const state = {
    // 验证码
    code: '',

    // name
    name: '',

    // nickName
    nickName: '',

    // token
    token: '',
}

const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 正常情况 应该是后台把验证码发到用户手机上
        let result = await reqGetCode(phone)
        console.log('验证码数据：', result);
        if (result.code == 200) {
            commit('GET_CODE', result.data)
            return true
        }
        console.log('获取验证码失败');
        return Promise.reject(new Error('获取验证码失败'))
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        console.log('用户注册', result);
        let code = result.code
        let message = result.message
        let ok = result.ok
        if (code == 200) {
            console.log('用户注册成功');
            return { ok, message }
        } 
        console.log('用户注册失败');
        return Promise.reject(new Error(message, ok))
    },
    // 用户登录
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user)
        console.log('用户登录', result);
        let code = result.code
        let message = result.message
        let ok = result.ok
        // token:用户唯一标识
        // 将来把token带给服务器请求数据
        if (code == 200) {
            console.log('登录成功');
            commit('USER_LOGIN', result.data.token)
            return { ok, message }
        } 
        console.log('登录失败');
        return Promise.reject(new Error(message, ok))
    }
}

const mutations = {
    GET_CODE(state, code) {
        state.code = code
    },
    USER_LOGIN(state, token) {
        state.token = token
    }
}

const getters = {
    
}

export default {
    state,
    actions,
    mutations,
    getters,
}