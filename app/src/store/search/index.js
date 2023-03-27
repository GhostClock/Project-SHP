// Search模块的小仓库
import {reqGetSearchInfo} from '@/api';

const state = {
    // 搜索页面的数据
    searchList: {}
}

const actions = {
    // 获取Search模块的数据
    async getSearchList({commit}, parmas = {}) {
        // 当前这个函数，在调用获取服务器数据的时候，至少传递一个参数，空对象{}
        // parmas形参：当用户派发action的时候，第二个参数传递过来，至少是一个空对象
        const result = await reqGetSearchInfo(parmas)
        console.log('搜索页面的数据：', result);
        if (result.code == 200) {
            commit('GET_SEARCH_LIST', result.data)
        }
    }
}

const mutations = {
    GET_SEARCH_LIST(state, searchList) {
        state.searchList = searchList
    }
}
// 计算属性，在项目中，为了简化数据而生 
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}