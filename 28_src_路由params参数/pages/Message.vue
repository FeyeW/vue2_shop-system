<template>
<div>
     <ul>
       <li  v-for="m in MessageList" :key="m.id">
         <!-- 跳转路由由并携带params参数，to的字符串写法 -->
         <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link>

         <!-- 跳转路由由并携带params参数，to的对象写法,必须与路由命名使用，使用path会报错 -->
         <!-- <router-link :to="{
          name:'xiangqing',
          params:{
            id:m.id,
            title:m.title
          }
         }">
         {{m.title}}
         </router-link> -->
       </li>
   </ul>
   <hr>
   <router-view></router-view>
</div>
 
</template>

<script>
export default {
  name:'Message',
  data(){
    return {
      MessageList:[
        {id:'001',title:'消息001'},
        {id:'002',title:'消息002'},
        {id:'003',title:'消息003'}
      ]
    }
  }

}
</script>

<style>

</style>