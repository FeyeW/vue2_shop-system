<template>
  <div class="Category">
      <h3>{{title}}分类</h3>
      <!-- 定义一个默认插槽，等待被使用 -->
       <slot name="center"></slot>
       <slot name="footer"></slot>
  </div>
</template>

<script>
  export default {
  name:'Catagory',
  props:['title']
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