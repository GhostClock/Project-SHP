
import { reqCartList } from '@/api';

const state = {
    cartList: []
}

const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        console.log("购物车列表数据: ", result);
        if (result.code == 200) {
            commit('GET_CART_LIST', result.data)
        }
    }
}

const mutations = {
    GET_CART_LIST(state, cartList) {
        state.cartList = cartList
    }
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
    // 真正购物车里面的数据
    cartInfoList(state) {
        return state.cartList[0]?.cartInfoList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}