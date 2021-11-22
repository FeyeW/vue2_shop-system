<template>
  <div class="container">
   <Category title="游戏">
	   <template scope="games">
		<ul>
          <li v-for="(items,index) in games.games" :key="index">{{items}}</li>	  
      </ul>	  
	   </template>

   </Category>
      <Category title="游戏">
	   <template scope="games">
		<ol>
          <li v-for="(items,index) in games.games" :key="index">{{items}}</li>	  
      </ol>	  
	   </template>  
   </Category>

      <Category title="游戏">
	   <template scope="games">
		<h4 style="color:red" v-for="(items,index) in games.games" :key="index">{{items}}	  
      </h4>	  
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


	
