<template>
  <ul>
    <li>news001 <input type="text"></li>
    <li>news002 <input type="text"></li>
    <li>news003 <input type="text"></li>
  </ul>
</template>

<script>
export default {
  name:'News',
  activated()
  {
   console.log('激活')
  },
  deactivated()
  {
   console.log('失活')
  }

}
</script>

<style>

</style>