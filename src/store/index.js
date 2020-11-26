import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num:0
  },
  // 唯一可以改变state的方式
  mutations: {
    // es6
    add(){
      console.log(this);
      this.state.num++
    }
  },
  actions: {
  },
  modules: {
  }
})
