
import { reqCartList } from '@/api';

const state = {}

const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        console.log("购物车列表数据: ", result);
    }
}

const mutations = {}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}