<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{res}}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import store from '@/store'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    store
  },
  data(){
    return{
      res:store.state.num
    }
  }
}
</script>
