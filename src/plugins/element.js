import Vue from 'vue'
import {
    Button,
    Form,
    FormItem,
    Input,
    Message
} from 'element-ui'


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
    //在Vue的原型上写一个方法 
Vue.prototype.$message = Message