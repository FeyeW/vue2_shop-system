<template>
  <div class="container">
   <Category title="美食"> 
	   <img src="../public/img/one.png" alt="">
   </Category>
   <Category title="游戏">
      <ul>
          <li v-for="(items,index) in games" :key="index">{{items}}</li>
      </ul>
   </Category>
   <Category title="电影">
      <img src="../public/img/one.png" alt="">
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
.container{
	display: flex;
	justify-content: space-around;
}
img{
	width: 100%;
}
</style>


	
