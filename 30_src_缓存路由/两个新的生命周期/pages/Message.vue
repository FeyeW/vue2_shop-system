<template>
<div>
     <ul>
       <li  v-for="m in MessageList" :key="m.id">
         <!-- 跳转路由由并携带params参数，to的字符串写法 -->
         <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link> -->

         <!-- 跳转路由由并携带params参数，to的对象写法,必须与路由命名使用，使用path会报错 -->
         <router-link :to="{
          name:'xiangqing',
          query:{
            id:m.id,
            title:m.title
          }
         }">
         {{m.title}}
         </router-link>
         <!-- 不借助 router-link 实现路由跳转，让路由跳转更灵活 -->
         <button @click="pushShow(m)">push查看</button>
         <button @click="replaceShow(m)">replace查看</button>
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
  },
  methods:{
      pushShow(m)
      {
        this.$router.push({
          name:'xiangqing',
          query:{
            id:m.id,
            title:m.title
        }
      })
  
  },
  replaceShow(m)
  {
          this.$router.replace({
          name:'xiangqing',
          query:{
            id:m.id,
            title:m.title
          }
    })
  }
}
}
</script>

<style>

</style>