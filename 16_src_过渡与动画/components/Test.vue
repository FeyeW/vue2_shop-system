<template>
  <div class="Demo">
      <button @click="isShow=!isShow">点击我显示和隐藏</button>
      <!-- <transition appear>
            <h2 v-show="isShow">你好啊</h2>
      </transition> -->
      <!-- <transition name="name" appear>
            <h2 v-show="isShow">你好啊</h2>
      </transition> -->
      <!-- <transition name="name" appear>
      <h2 v-show="isShow">你好啊</h2>
      </transition> -->
      <!-- //多个动画 -->
      <!-- <transition-group  name="name" appear>
      <h2  key="1" v-show="isShow">你好啊</h2>
       <h2  key="2" v-show="isShow">你好啊</h2>
      </transition-group> -->

      <!-- 第三方库 -->
     <transition-group  
     name="animate__animated animate__bounce" 
     enter-active-class="animate__swing"
     leave-active-class="animate__backOutUp"
     appear>
       <h2  key="1" v-show="isShow">你好啊</h2>
       <h2  key="2" v-show="isShow">你好啊</h2>
      </transition-group>
  </div>
</template>

<script>
import 'animate.css'
export default {
name:'Test',
data() {
    return {
        isShow:true
    }
},

}
</script>

<style>
/* animation动画效果 */
/* .v-enter-active{
animation: Move 1s;
}
.v-leave-active{
animation: Move 1s reverse;
} */
/* .name-enter-active{
animation: Move 1s;
}
.name-leave-active{
animation: Move 1s reverse;
}
@keyframes Move {
    from{
        transform: translateX(-100%);
    }
    to{
        transform: translateX(0px);
    }
}
*/
h2{
    background-color: rgb(255, 174, 0);
} 

/* 过渡效果 */
/* h2{
    background-color: rgb(255, 174, 0);
    transition:0.5s linear;
}
.name-enter,.name-leave-to
{
transform: translateX(-100%);
}
.name-enter-to,.name-leave{
transform: translateX(0);
} */

</style>