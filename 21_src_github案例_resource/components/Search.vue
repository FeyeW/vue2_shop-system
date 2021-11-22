<template>
      <section class="jumbotron">
      <h3 class="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text" placeholder="enter the name you search" v-model="keyword"/>&nbsp;
        <button @click="searchUsers()">Search</button>
      </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name:'Search',
    data() {
        return {
            keyword:''
        }
    },
    methods: {
        searchUsers()
        {
             this.$bus.$emit('users', {isFirst:false,isLoading:true,errMsg:'',users:[]});
          this.$http.get(`https://api.github.com/search/users?q=${this.keyword}`).then(
              response=>{
                  console.log('请求成功了',response.data.items)
                  this.$bus.$emit('users', {isFirst:false,isLoading:false,errMsg:'',users:response.data.items}
                  );
              },
              erroe=>{
                  console.log('请求失败了',error.message)
                   this.$bus.$emit('users', {isFirst:false,isLoading:false,errMsg:error.message,users:[]});
              }
          )
        }
    },
}
</script>

<style>

</style>