<template>
  <div>
  <li>消息编号：{{id}}</li>
  <li>消息标题：{{title}}</li>
  </div>
</template>

<script>
export default {
  name:'Detail',
  props:['id','title']
}
</script>

<style>

</style>