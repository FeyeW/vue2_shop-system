import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
Vue.use(Vuex);
//准备actions-用于响应组件中的动作
const actions = {
        jia(context, value) {
            context.commit('JIA', value)
        },
        jian(context, value) {
            context.commit('JIAN', value)
        },
        jiaOdd(context, value) {
            if (context.state.sum % 2) {
                if (context.state.sum % 2) {
                    context.commit('JIA', value)
                }
            }
        },
        jiaSet(context, value) {
            setTimeout(() => {
                context.commit('JIA', value)
            }, 500);
        }
    }
    //准备mutations-用于操作数据（state）
const mutations = {
        JIA(state, value) {
            state.sum += value
        },
        JIAN(state, value) {
            state.sum -= value
        },
    }
    //准备state——用于存储数据
const state = {
        sum: 0,
        school: '广西科技大学',
        subject: '软件工程'
    }
    //逻辑复杂并且还需要不断复用
const getters = {
    bigSum(state) {
        return state.sum * 10
    }
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})