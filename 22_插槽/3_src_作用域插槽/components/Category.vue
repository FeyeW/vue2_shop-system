<template>
  <div class="Category">
      <h3>{{title}}分类</h3>
      <!-- 定义一个默认插槽，等待被使用 -->
       <slot :games="games"></slot>
  </div>
</template>

<script>
  export default {
  name:'Catagory',
  props:['title'],
  data() {
    return {
      	foods:['火锅','炸鸡','汉堡包'],
				games:['愤怒的小鸟','穿越火线','英雄联盟'],
				films:['《暮光之城》','《哈利波特》','《破坏王》']
    }
  },
}
</script>

<style scoped>
.Category{
    width: 150px;
    height: 250px;
    background: aqua;

}
h3{
    background: rgb(255, 238, 5);
        text-align: center;
}
</style>