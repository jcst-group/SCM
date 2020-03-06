import * as type from  '../mutation-type'
import {listCount} from '@/api/allApi'

const state = {
    token: '',
    count: 0,
    applynumber:0,
}

const getters = {
    token(state) {
        return state.token
    },
    count(state) {
        return state.count
    },
}

const mutations = {
    [type.GET_TOKEN](state) {
        state.token = window.localStorage.token
    },
    [type.CHANGE_COUNT](state) {
        state.count++
    },
    set_applynumber:(state,data)=>{
        state.applynumber=data
    },
}

const actions = {
    getapplynum({ commit },data) {
        listCount(data).then(res=>{
            const data = res.result
            commit('set_applynumber', data)
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
