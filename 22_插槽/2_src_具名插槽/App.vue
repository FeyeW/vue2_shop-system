<template>
  <div class="container">
   <Category title="美食"> 
	   <img slot="center" src="../public/img/one.png" alt="">
	   <a slot="footer" href="" class="foot">点击我</a>
   </Category>
   <Category title="游戏">
      <ul slot="center">
          <li v-for="(items,index) in games" :key="index">{{items}}</li>	  
      </ul>
	  		  <div class="foot"  slot="footer">
			<a href="">点击我</a>
			<a href="">点击我</a>
		 </div>	
   </Category>
   <Category title="电影">
      <img slot="center" src="../public/img/one.png" alt="">
	  <template  v-slot:footer>
		  <div class="foot" >
			<a href="">点击我</a>
			<a href="">点击我</a>
		  </div>
		  <h4>欢迎</h4>
	  </template>
   </Category>
  </div>
</template>

<script>
import Category from './components/Category.vue'
	export default {
		name:'App',
		components:{Category},
		data() {
			return {
				foods:['火锅','炸鸡','汉堡包'],
				games:['愤怒的小鸟','穿越火线','英雄联盟'],
				films:['《暮光之城》','《哈利波特》','《破坏王》']
			}
		},
		methods:{
		}
	}
</script>

<style scoped>
.container,.foot{
	display: flex;
	justify-content: space-around;
}
img{
	width: 100%;
}
h4{
	text-align: center;
}
</style>


	
