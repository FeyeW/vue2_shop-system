<template>
  <div>
    <!-- 面包屑导航区 -->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>

<!-- 卡片视图区域 -->
<el-card>
<el-row :gutter="20">
  <el-col :span="8">
      <el-input placeholder="请输入内容" 
      v-model="queryInfo.query" clearable @clear="getUserList">
    <el-button slot="append" icon="el-icon-search"
    @click="getUserList"
    ></el-button>
  </el-input>
  </el-col>
  <el-col :span="4">
    <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
  </el-col>
</el-row>
<!-- 用户列表区域 -->
<el-table :data="userlist" border stripe>
  <el-table-column type="index"></el-table-column>
  <el-table-column label="姓名" prop="username"></el-table-column>
  <el-table-column label="邮箱" prop="email"></el-table-column>
  <el-table-column label="电话" prop="mobile"></el-table-column>
  <el-table-column label="角色" prop="role_name"></el-table-column>
  <el-table-column label="状态">
    <template slot-scope="scope">
      <el-switch v-model="scope.row.mg_state" 
      @change="userStateChanged(scope.row)">
      </el-switch>
    </template>
  </el-table-column>
  <el-table-column label="操作" width="180px">
    <template slot-scope="scope">
            <!-- 编辑 -->
      <el-button type="primary" icon="el-icon-edit" 
      size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除-->
      <el-button type="danger" icon="el-icon-delete" 
      size="mini" @click="removeUserById(scope.row.id)"
      ></el-button>
      <el-tooltip effect="dark" content="分配角色" placement="top-start" :enterable="false">
        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
      </el-tooltip>
    </template>
  </el-table-column>
</el-table>
<!-- 分页区 -->
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
</el-pagination>
</el-card>
<!-- 添加用户的对话框 -->
<el-dialog
  title="添加用户"
  :visible.sync="addDialogVisible"
  width="50%" @close="addDialogClosed()">
  <!-- 内容主体区域 -->
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
    <el-form-item label="手机" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
  </el-form>
  <!-- 底部区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" 
    @click="addUser()"
    >确 定</el-button>
  </span>
</el-dialog>
<!-- 修改用户的对话框 -->
<el-dialog
  title="修改用户"
  :visible.sync="editDialogVisible"
  width="50%" @close="editDialogClosed()">
  <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
  <el-form-item label="用户名 ">
    <el-input v-model="editForm.username" disabled></el-input>
  </el-form-item> 
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="editForm.email"></el-input>
  </el-form-item>
    <el-form-item label="手机" prop="mobile">
    <el-input v-model="editForm.mobile"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo()">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
export default {
  data() {
          //邮箱的验证规则
          //手机的验证规则（报错未写入）
      
    return {
      //获取用户列表的参数对象
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:2
      },
      userlist:[],
      total:0,
      addDialogVisible:false,
      editDialogVisible:false,
      //查询到的用户信息对象
      editForm:{},
      editFormRules:{
        email:[
          {required:true,message:'请输入邮箱',trigger:'blur'},
        ],
       mobile:[
         {required:true,message:'请输入用户手机',trigger:'blur'}
         ], 
        },

      addForm:{
        //添加用户的表单数据
        username:'',
        password:'',
        email:'',
        mobile:''
      },
      //添加表单的验证规则对象
      addFormRules:{
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {
            min:3,
            max:10,
            message:'用户名的长度在3~10个字符之间',
            trigger:'blur'
          }
        ],
        password:[
          {required:true,message:'请输入用密码',trigger:'blur'},
          {
            min:6,
            max:15,
            message:'用户名的长度在6~15个字符之间',
            trigger:'blur'
          }
        ],
        email:[
          {required:true,message:'请输入邮箱',trigger:'blur'},
        ],
       mobile:[
         {required:true,message:'请输入用户手机',trigger:'blur'}
         ],       
      },
    }
  },
  created()
  {
    this.getUserList()
  },
  methods:{
    async getUserList()
    {
      const{data:res}=await this.$http.get('users',{
        params:this.queryInfo
      })
      if(res.meta.status!==200)
      {
        return this.$message.error('获取用户信息失败!')
      }
      this.userlist=res.data.users
      this.total=res.data.total
    },
    //pagesize改变的事件
    handleSizeChange(newSize)
    {
        this.queryInfo.pagesize=newSize
        this.getUserList()
    },
     //页码改变的事件
    handleCurrentChange(newPage)
    {
       this.queryInfo.pagesize=newPage
        this.getUserList()
    },
    //监听开关状态的改变
    async userStateChanged(userInfo)
    {    
      const {data:res}=await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      ) 
      if(res.meta.status!==200)
      {
        userInfo.mg_state=!userInfo.mg_state
        return this.$message.error('更新用户状态失败！')
      }
      this.$message.success('更新用户状态成功！')
    },
    addDialogClosed()
    {
      this.$refs.addFormRef.resetFields()
    },
    //增加按钮，添加用户
    addUser()
    {
      this.$refs.addFormRef.validate(async valid=>{
        if(!valid) return
        //可以发起添加用户的网络请求
        const{data:res}=await this.$http.post
        ('users',this.addForm)

        if(res.meta.status1==201)
        {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        this.addDialogVisible=false
        this.getUserList()
      })
    },
   async showEditDialog(id)
    {
    const{data:res}=await this.$http.get('users/'+id)

    if(res.meta.status!==200)
    {
      return this.$message.error('查询用户信息失败!')
    }
    this.editForm=res.data
    this.editDialogVisible=true
    },
  editDialogClosed()
  {
    this.$refs.editFormRef.resetFields()
  },
  //发起修改用户信息的数据请求
  editUserInfo()
  {
    this.$refs.editFormRef.validate(async valid=>{
       if(!valid) return 
   const {data:res}=await this.$http.put(
     'users/'+this.editForm.id,
     {
       email:this.editForm.email,
       mobile:this.editForm.mobile
     }
   )
    if(res.meta.status!==200)
    {
      return this.$message.error('更新用户信息失败！')
    }
   this.editDialogVisible=false
   this.getUserList()
   this.$message.success('更新用户信息成功！')
    })
  },
  //删除弹框按钮提示
 async removeUserById(id)
  {
  const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', 
  '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
    //catch捕获错误信息，并返回
    }).catch(err=>err)
    //如果用户确认删除，则返回值为字符串confirm
    //如果用户取消了删除，则返回值为字符串cancel
    //console.log(confirmResult)
    if(confirmResult!=='confirm')
    {
      return this.$message.info('已取消删除')
    }

    const {data:res}=await this.$http.delete('users/'+id)
    
    if(res.meta.status!==200)
    {
      return this.$message.error('删除用户失败！')
    }
    this.$message.success('删除用户成功！')
    this.getUserList()
  }
  }

}
</script>

<style scoped>


</style>