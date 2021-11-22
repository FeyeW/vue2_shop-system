export default {
    namespaced: true,
    actions: {
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
    },
    mutations: {
        JIA(state, value) {
            state.sum += value
        },
        JIAN(state, value) {
            state.sum -= value
        },
    },
    state: {
        sum: 0,
        school: '广西科技大学',
        subject: '软件工程',
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    }
}