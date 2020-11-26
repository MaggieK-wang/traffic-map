<template>
  <div id="allmap"></div>
</template>

<script>
export default {
  // GL版命名空间为BMapGL
  // 按住鼠标右键，修改倾斜角和角度
  data() {
    return {};
  },
  mounted() {
    this.baiduMap();
  },
  methods: {
    baiduMap() {
      var map = new BMapGL.Map("allmap"); // 创建Map实例
      map.centerAndZoom(new BMapGL.Point(116.28019, 40.049191), 19); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      map.setHeading(64.5);
      map.setTilt(73);
    }
  }
};
</script>

<style>
#allmap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
}
</style>