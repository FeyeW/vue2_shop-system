<template>
  <div>
    <h2>当前求和为：{{sum}}</h2>
    <select  v-model.number="n">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementOdd">当前求和为奇数再加</button>
      <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
export default {
  name:'Count',
  data() {
    return {
      n:1,
      sum:0
    }
  },
  methods:{
    increment()
    {
      this.sum+=this.n
    },
      decrement()
    {
      this.sum--
    },
      incrementOdd()
    {
      if(this.sum%2)
      {
        this.sum++
      }
    },
      incrementWait()
    {
      setTimeout(() => {
        this.sum++
      }, 500);
    }
  }

}
</script>

<style>
button{
  margin: 5px;
}
</style>