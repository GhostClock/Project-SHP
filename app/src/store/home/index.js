// Home模块的小仓库

import { reqCategoryList } from "@/api";

const state = {
    // state中的默认初始值别瞎写，服务器返回的是什么格式就应该是什么格式
    categoryList: []
}

const actions = {
    // 通过api接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({commit}) {
        const result = await reqCategoryList()
        console.log(result);
        if (result.code == 200) {
            commit('CATEGORY_LIST', result.data)
        }
    }
}

const mutations = {
    CATEGORY_LIST(state, categoryList) {
        state.categoryList = categoryList
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}