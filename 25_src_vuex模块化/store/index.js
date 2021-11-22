import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import countOption from '../count'
import personOption from '../person'
Vue.use(Vuex);

//求和相关配置





//创建并暴露store
export default new Vuex.Store({
    modules: {
        countAbout: countOption,
        personAbout: personOption
    }
})