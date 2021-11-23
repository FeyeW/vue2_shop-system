<template>
  <div class="login_container">
    <div class="login_box">
        <!-- 头像区域 -->
    <div class="avatar_box">
        <img src="../assets/img/logo.png">
     </div>
     <!-- 表单区域 -->
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名区域 -->
       <el-form-item prop="username">
         <el-input v-model="loginForm.username" prefix-icon="el-icon-user "></el-input>
       </el-form-item> 
       <!-- 密码区域 -->
       <el-form-item prop="password">
         <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
       </el-form-item>
       <!-- 按钮区域 -->
       <el-form-item class="btns">
       <el-button type="primary" @click="login()">登录</el-button>
       <el-button type="info" @click="resetLoginForm()">重置</el-button>
       </el-form-item>
    </el-form>
    </div>  
  </div>
</template>

<script>
export default {
  name:'Login',
  data() {
      return {
          //登录表单的数据绑定对象
          loginForm:{
              username:'admin',
              password:'123456'
          },
          //表单的验证规则对象
          loginFormRules:{
              username:[ 
                   { required: true, message: '请输入登录名称', trigger: 'blur' },
                   { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
              ],
              password:[
                   { required: true, message: '请输入登录密码', trigger: 'blur' },
                   { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
              ]             
          }
      }
  },
  methods:{
      resetLoginForm()
      {
        //通过按钮登录来获取绑定的参数来重置表单
          this.$refs.loginFormRef.resetFields();
      },
      login()
      {
        //通过按钮登录来获取绑定的参数验证表单是否通过规则
        //1.axios返回的是一个promise的对象 要返回想要的数据需要使用saync和await请求
        this.$refs.loginFormRef.validate(async valid=>{
          if(!valid) return;
          //2.获取得到数据中data用res得到
          const{ data:res } = await this.$http.post('login',this.loginForm);
          //3.如果状态码为200则存在该对象
          if(res.meta.status!==200) return this.$message.error('登录失败')
          this.$message.success('登录成功')
          //成功登录后的token保存到sessionStorage中
          window.sessionStorage.setItem('token',res.data.token)
          //路由跳转
          this.$router.push('/home')
        })
      }
  }
} 
</script> 

<style scoped> 

.login_container
{
  background-color: #2b4b56;
  height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
}
.avatar_box{
   height: 130px;
   width: 130px; 
   border: 1px solid #eee;
   border-radius: 50%;
   padding: 10px;
   box-shadow: 0 0 10px #ddd;
   position: absolute;
   left: 50%;
   transform: translate(-50%,-50%);
   background-color: #fff;
}
.avatar_box img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
}
.login_form{
    position:absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns{
    display: flex;
    justify-content: flex-end;
}
</style>