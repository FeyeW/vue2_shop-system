<template>
<el-container class="home-container">
    <!-- 头部区 -->
    <el-header>
        <div>
            <img src="../assets/img/heima.png" alt="">
            <span>电商后台管理系统</span>
        </div>
    <el-button type="info" @click="logout()">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
     <!-- 侧边栏 -->
    <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse()">|||</div>
     <!-- 侧边栏菜单区域 -->
    <el-menu background-color="#333744" text-color="#fff" 
    active-text-color="#409EFF" :unique-opened="true" 
    :collapse="isCollapse" :collapse-transition="false"
    :router="true" :default-active="activePath"
    >
     <!-- 一级菜单 -->
      <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id" >
          <!-- 一级菜单的模板区域 -->
        <template slot="title">
            <!-- 图标 -->
          <i :class="inconsObj[item.id]"></i>
          <!-- 文本 -->
          <span>{{item.authName}}</span>
        </template>

          <!-- 二级菜单 -->
          <el-menu-item :index="'/'+subItem.path" 
          v-for="subItem in item.children" :key="subItem.id"
          @click="saveNavState('/'+subItem.path)"
          >
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
          <span>{{subItem.authName}}</span>
          </el-menu-item>
        </el-submenu>
    </el-menu>
    </el-aside>
    <!-- 右侧内容主体 --> 
    <el-main><router-view></router-view></el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
  name:'Home',
  data() {
      return {
          menuList:[],
          inconsObj:{
              125:'iconfont icon-users',
              103:'iconfont icon-tijikongjian',
              101:'iconfont icon-3702mima',
              102:'iconfont icon-danju',
              145:'iconfont icon-baobiao'
          },
          isCollapse:false,
          //被激活的链接地址
          activePath:''
      }
  },
  //生命周期函数
  created()
  {
      this.getMenuList()
      this.activePath=window.sessionStorage.getItem('activePath')
  },
  methods:{
      logout()
      {
       window.sessionStorage.clear();
       this.$router.push('./login')
      },
      //获取所有的菜单
      async getMenuList()
      {
          //结构赋值
          const{data:res}=await this.$http.get('menus')
          if(res.meta.status!==200) return this.$message.error(res.meta.msg)
          this.menuList=res.data
          console.log(res)
      },
      toggleCollapse()
      {
           this.isCollapse=!this.isCollapse
      },
      saveNavState(activePath)
      {
       //保存链接的激活状态
       window.sessionStorage.setItem('activePath',activePath)
       this.activePath=activePath
      }
  }
}
</script>

<style scoped>
.home-container{
    height: 100%;
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
}
.el-header div{
    display: flex;
    align-items: center;
}
.el-header span{
    margin-left: 15px;
}
.el-aside{
    background-color: #333744;
}
.el-aside .el-menu{   
    border-right: none;
}
.el-main{
    background-color: #eaedf1;
}
.iconfont{
    margin-right: 10px;
}
.toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>