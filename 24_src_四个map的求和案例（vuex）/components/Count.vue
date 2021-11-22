<template>
  <div>
    <h2>当前求和为：{{sum}}</h2>
    <h2>当前数据方法后的十倍{{bigSum}}</h2>
    <h2>学校名称:{{school}}</h2>
    <h2>专业是：{{subject}}</h2>
    <select  v-model.number="n">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
      <button @click="increment(n)">+</button>
      <button @click="decrement(n)">-</button>
      <button @click="incrementOdd(n)">当前求和为奇数再加</button>
      <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name:'Count',
  data() {
    return {
      n:1,

    }
  },
  methods:{
    // increment()
    // {
    //       this.$store.commit('JIA', this.n)
    // },
    //   decrement()
    // {
    //       this.$store.dispatch('jian', this.n)
    // },
    //借用mapMutations生成对应的方法，方法中会调用commit去练习mutations
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),
    //可以应用数据写法，必须名字一致

    //   incrementOdd()
    // {
    //   this.$store.dispatch('jiaOdd',this.n)
    // },
    //   incrementWait()
    // {
    //   setTimeout(() => {
    //  this.$store.dispatch('jiaSet',this.n)
    //   }, 500);
    // },

    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaSet'})
  },
  computed:{
    //借助mapState生成计算属性，从state中读取数据。（对象写法）
    //...mapState({sum:'sum',school:'school',subject:'subject'})

    //借助mapState生成计算属性，从state中读取数据。（数组写法）
    ...mapState(['sum','school','subject']),
    ...mapGetters(['bigSum']),


  }
 
}
</script>

<style>
button{
  margin: 5px;
}
</style>