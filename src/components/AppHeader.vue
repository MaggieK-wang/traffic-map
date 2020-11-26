<template>
  <div class="app-header">
    <!-- <div class="header-title">{{ title }}</div> -->

    <!-- 右边 -->

    <el-input
      placeholder="请输入车牌号"
      style="width:200px"
      v-model="Car_num"
      @keyup.enter.native="handleFilter"
    />
    <!-- <el-button size="medium" type="primary" round @click="isClose">隐藏</el-button>
    <el-button size="medium" type="primary" round @click="isShow">显示</el-button>-->
    <!-- <input type="text" placeholder="请输入检测点/车牌号" /> -->

    <!-- <el-dropdown>
        <el-button type="primary" size="medium">
          车辆事件
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>全局概览</el-dropdown-item>
          </router-link>
          <router-link to="/carTrade">
            <el-dropdown-item>车辆轨迹</el-dropdown-item>
          </router-link>
          <router-link to="/events">
            <el-dropdown-item>突发事件</el-dropdown-item>
          </router-link>
          <router-link to="/od">
            <el-dropdown-item>od行车</el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
    </el-dropdown>-->
    <!-- <el-button size="medium" type="primary" round @click="hanldConcept">全局概念</el-button>

      <el-button size="medium" type="primary" round @click="handleEvent">突发事件</el-button>
      <el-button size="medium" type="primary" round @click="handleCar">车辆轨迹</el-button>
      <el-button size="medium" type="primary" round @click="handleOd">od行车</el-button>

    <el-button size="medium" type="primary" round>退出</el-button>-->

    <!-- <div class="line"></div> -->
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- <el-menu-item index="1">全局概念</el-menu-item> -->
      <el-menu-item index="1" @click="hanldConcept">全局概念</el-menu-item>
      <el-menu-item index="2" @click="handleEvent">突发事件</el-menu-item>
      <el-menu-item index="3" @click="handleOd">od行车</el-menu-item>
      <el-menu-item index="4" @click="handleCar">车辆轨迹</el-menu-item>

      <el-menu-item index="6" @click="isShow">显示页面</el-menu-item>
      <el-menu-item index="7" @click="isClose">隐藏页面</el-menu-item>
      <el-menu-item index="8">
        <a href="http://lbsyun.baidu.com/" target="_blank">关于我们</a>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      // visible: this.visible
      Car_num: "",
      activeIndex: "1",
      activeIndex2: "2"
    };
  },
  props: {
    title: {
      default: "交通旅游运行监测预警及应急联动系统",
      title: String
    },
    eventVisible: {
      type: Boolean
      // default: false
    }
  },
  watch: {},
  methods: {
    hanldConcept() {
      this.$router.push("/");
    },
    handleEvent() {
      this.$router.push("/events");
    },
    handleCar() {
      this.$router.push("/carTrade");
    },
    handleOd() {
      this.$router.push("/od");
    },
    isClose() {
      // 触发父组件中event事件，传递参数

      this.$emit("eventCloseVisible", false);
      console.log("ok");
    },
    isShow() {
      this.$emit("eventShowVisible", true);
      console.log("00");
    },
    handleFilter() {
      this.$emit("handleSearch", this.Car_num);
      // console.log("handleSearch");
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-header {
  padding-top: 0.3rem;
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  height: 3rem;
  display: flex;
  z-index: 100;
  text-align: left;
  align-items: flex-start;
  justify-content: space-between;
  background-color: rgba(37, 145, 247, 0.38);
  // overflow: hidden;
}
.el-input {
  margin-left: 10px;
}
a {
  text-decoration: none;
  font-size: 100%;
  font-weight: bold;
}
.el-menu {
  background: none;
  // position: absolute;
  // top: 0%;
  // left: %;

  // right: 30%;

  // height: 1;
  height: 3rem;
  .el-menu-item {
    height: 3rem;
    background: none;
    font-size: 100%;
    font-weight: bold;
    &:hover {
      background-color: aqua;
    }
  }
}
.el-submenu {
  // background-color: rgba(37, 145, 247, 0.38);
  background: none;
  height: 3rem;
  .el-menu-item {
    height: 3rem;
    background: none;
  }
}
.header-title {
  font-size: 1.55rem;
  font-family: "微软雅黑";
  color: white;
  margin-left: 10px;
}
.right {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 70%;
}
// .el-input__inner{}
.el-button {
  background-color: white;
  margin-top: 0.3rem;
  font-size: 0.6rem;
  color: rgba(37, 145, 247, 0.38);
}
input {
  width: 150px;
  height: 28px;
  //   border: rgba(37, 145, 247, 0.38) solid 3px;
  border-radius: 10%;
  border: none;
  // font-size: 2px;
  color: rgba(37, 145, 247, 0.38);
  margin-top: 0.3rem;
  // height: 33px;
}
input:hover {
  color: rgb(37, 145, 247);
  border: none;
}
.el-dropdown-menu__item {
  text-decoration: none;
  font-size: 9px;
  line-height: 20px;
}
</style>
