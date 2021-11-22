<template>
    <div class="row">
        <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header"><h2>Vue Router Demo</h2></div>
        <button @click="back">前进</button>
        <button @click="forward">后退</button>
      </div>
    </div>
</template>

<script>
export default {
  name:'Banner',
  methods:{
    back()
    {
      this.$router.back()
   },
   forward()
    {
      this.$router.back()
   }
  }
}
</script>

<style>

</style>