import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user
    },
    // 严格模式，保证只有mutation改变state
    strict: debug,
    // vuex插件，打印state数据改变前后的值,用来追踪
    plugins: debug ? [createLogger()] : []
})