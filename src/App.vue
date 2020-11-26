<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>|-->
    <!-- 需要引入的页面的路径 -->
    <!-- <router-link to="/info">Info</router-link> -->
    <!-- </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  position: relative;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.dv-border-box-2 {
  position: relative;
  width: 100%;
}
</style>
