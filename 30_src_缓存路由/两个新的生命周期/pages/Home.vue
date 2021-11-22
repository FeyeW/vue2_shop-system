<template>
<div>
     <h2>我是Home的内容</h2>
    <ul class="nav nav-tabs">
    <li>
      <router-link class="list-group-item"  active-class="active" to="/home/news">News</router-link>
    </li>
    <li>
       <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
    </li>
    </ul>
    <!-- 让不展示的路由组件保持挂载，不被销毁 （一个）-->
    <keep-alive include="News">
        <router-view></router-view>
    </keep-alive>

     <!-- 多个组件 -->
   <keep-alive :include="['News','Message']">
        <router-view></router-view>
    </keep-alive>
</div>

</template>

<script>
export default {
  name:'Home'
}
</script>

<style>

</style>