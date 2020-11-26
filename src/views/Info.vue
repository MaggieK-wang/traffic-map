<template>
  <div class="home">
      第一个页面
      <button type="button" @click="add()">增加</button>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'Info',
  components:{
      store
  },
  methods:{
      add:function(){
          console.log(12);
          store.commit('add');
      }
  }
}
</script>
