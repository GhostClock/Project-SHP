// 订单与支付的小仓库

import { reqAddressInfo, reqOrderInfo } from "@/api"

const state = {
    // 地址信息
    address: [],
    // 订单信息
    orderInfo: []
}

const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo()
        console.log('获取用户地址', result);
        if (result.code == 200) {
            commit('USER_ADDRESS', result.data)
        }
    },
    // 获取订单交易页信息
    async reqOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        console.log('获取订单交易页信息', result);
        if (result.code == 200) {
            commit('ORDER_INFO', result.data)
        }
    }
}

const mutations = {
    USER_ADDRESS(state, address) {
        state.address = address
    },
    ORDER_INFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}