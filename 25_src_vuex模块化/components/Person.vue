<template>
  <div>
      <h2>上方的sum为{{sum}}</h2>
      <h2>第一个人的名字为:{{firstPersonName}}</h2>
      <input value="" placeholder="请输入加入的成员" v-model="name">
      <button @click="addWang">添加一个姓王的人</button>
      <button @click="add">添加</button>
      <button @click="addPersonServer">增加一个服务器的人</button>
      <ul >
          <li v-for="person in personList" :key="person.id">
           {{person.name}}
          </li>
      </ul>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
    name:'Person',
    data() {
        return {
            name:''
        }
    },
    computed:{
       personList()
       {
           return this.$store.state.personAbout.personList
       },
       sum()
       {
           return this.$store.state.countAbout.sum
       },
       firstPersonName()
       {
           return this.$store.getters['personAbout/firstPersonName']
       }
    },
    methods:{
        add()
        {
            const newPerson={id:nanoid(),name:this.name}
            this.$store.commit('personAbout/ADD_PERSON',newPerson)
            this.name=''
        },
        addWang()
        {
            const personObj={id:nanoid(),name:this.name}
            this.$store.dispatch('personAbout/addPersonWang',personObj)
            this.name=''
        },
        addPersonServer()
        {
         this.$store.dispatch('personAbout/addPersonServer')
        }
    }

}
</script>

