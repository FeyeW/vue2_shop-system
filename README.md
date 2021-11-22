## ref属性
1.被用来给元素或子组件注册引用信息（id的替代者）
2.应用在html标签上的获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3.应用方式：
  打标识：<h1 ref="xxx">...</h1>或者 <School ref="xxx"></School>
  获取：this.$refs.xxx

##配置项props
  功能:让组件接收外部传过来的数据
  (1)传递数据：
     <Demo name="xxx"/>
  (2)接收数据：
     第一种方式（只接收）:
     props：['name']
    
     第二种方式（限制类型）：
     propos：{
       name：string
     }

     第三种方式（限制类型、限制必要性、指定默认值）：
     props：{
       name：{
         type：String，//类型
         required:true//必要性
         default:'123' //默认值
       }
     }

     备注：props是只读，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。


## mixin(混入)
  功能：可以把多个组件公用配置提取成一个混入对象
  使用方式：
    第一步定义混合，例如：
    {
      {
        data(){.....},
        methods:{.....}
        ....
      }
      第二步使用混入，例如：
       （1）使用局部混入：Vue.mixin(xxx)
        (2)局部混入：mixins['xxx']
    }
##   插件
   功能：用于增强Vue
   本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递数据。
   定义插件：
   对象.install=function(Vue,option)
   {
    //1.添加全局过滤器
    Vue.filter(...)

    //2.添加全局指令
    Vue.directive(....)

    //3.配置全局混入(合)
    Vue.mixin(....)

    //4.添加实例方法
    Vue.prototype.$myMethod=function(){...}
    Vue.prototype.$myProperty=xxxx
   }
   使用插件：Vue.use()

  ## TodoList案例
  1.组件化编码流程：
    （1）拆分静态组件：组件要按照功能点拆分，命名不要与html原色冲突。
    （2）实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一组组件在用：
      1）一个组件在用：放在组件自身即可。
      2）一些组件在用：放在它们共同的父组件上（状态提升）。
    （3）实现交互：从绑定事件开始
2.propos适用于：
    （1）父组件==>子组件 通信
    （2）子组件==>父组件 通信（要求父给子一个函数）
3.使用v-model时要切记：v-model绑定的值不能是propos传过来的值，因为propos是不可以修改的！
4.propos传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做

## Web存储
1.存储内容大小一般支持5MB左右（不同浏览器可能还不一样）
2.浏览器通过Window.sessionStorage和Window.localStorage
3.相关API：
1.xxxxxStorage.SetItem（'key','value');
该方法接收一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值
2.xxxxxStorage.getItem（'person')；
该方法接收一个键名作为参数，返回键名对应的值
3.xxxxxStroge.clear（）
该方法会清空存储中的所有数据
4.备注：
1.SessionStorage存储的内容会随着浏览器窗口关闭而消失
2.LocalStorage存储的内容，需要手动清除才会消失
3.xxxxStorage.getItem（xxx）如果xxx对应的value获取不到，那么getItem的返回值是null
4.JSON.parse（null）的结果依然是null


## 组件的自定义事件
1.一种组件间的通信方式：适用于：子组件==>父组件
2.使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）。
3.绑定自定义事件:
   1.第一种方式：在父组件中：<Demo @test='t'>或<Demo v-on:test='t'>
   2.第二种方式，在父组件中：
    <Demo ref='demo'/>
    ..........
    mounted()
    {
      this.&refs.xxx.$on('test',this.t)
    }
    3.若想让自定义事件只触发一次，可以使用once修饰符，或者$once方法
    4.触发自定义事件：this.$emit('test',数据)
    5.解绑自定义事件this.$off('test)
    6.组件上也可以绑定原生DOM事件，需要使用native修饰符
    7.注意：通过this.&refs.xxx.&on('test',回调)绑定自定义事件时，回调要么在配置在methods中，要么用箭头函数，否者this指向会出现问题.

## 全局事件总线(GlobalEventBus)
1.一种组件间通信的方式，适用于任意组件间的通信。
2.安装全局事件总线
new Vue({
  ..........
  beforeCreate()
  {
      Vue.prototype.$bus=this //安装全局事件总线，$bus就是当前应用的vm
  },
  ........
})
3.使用事件总线:
1.接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调在A组件自身
methods()
{
  demo(data)
  {
    ..........
  }
}
mounted()
{
  this.$bus.$on('xxx',this.demo)
}
2.提供数据：this.$bus.$emit('xxxx',数据)
4.最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件

##  消息订阅与发布 （pubsh）
1.一种组件间通信的方式，适用于任意组件间通信
2.使用步骤：
  1.安装pubsub：npm i pubsub-js
  2.引入：impor pubsub from 'pubsub-js'
  3.接收数据：A组件想接收数据，订阅的回调留在A组件自身。
  methods()
  {
    demo(data){.......}
  }
  .......
  mounted(){
    this.pid=pubsub.subscribe('xxx',this.demo) //订阅消息
  }
  4.提供数据：pubsub.publish('xxx',数据)
  5.最好在beforeDestroy钩子中，用Push.unsubscribe(pid)

  ## 
  1.语法：this.$nextTick(回调函数)
  2.作用：在下一次DOM更新结束后执行其指定的回调
  3.什么时候用：当改变数据后，要基于更新的新DOM进行某些操作时，要在nextTick所指定的回调函数中 

  ##  Vue封装的过渡与动画
  1.作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名
  2.v-enter-active v-leave-active
  3.写法：
    1.准备好样式：
      v-enter：进入的起点
      v-enter-active:进入过程中
      v-enter-to：进入的终点
      2.离开的样式
      v-leave：离开的起点
      v-leave-active：离开的过程中
      v-leave-to：离开的重点
    2.使用<transition>包裹要过渡的元素，并配置name属性：
    <transition name="hello">
       <h1 v-show="isShow">你好啊！</h1>
    </transition>
    3.备注：若有多个元素需要过渡，则需要使用：<transition-groud>,且每个元素都要指定key值


## <router-link>的replace属性
1.作用：控制路由跳转时操作浏览器历史记录的模式
2.浏览器的历史记录有两种写入方式：分别为push、replace、push是追加历史，replace是替换当前记录，默认为push
3.如何开启replace模式：<router-link replace.....>News</router-link>