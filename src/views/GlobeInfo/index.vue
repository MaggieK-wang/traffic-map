<template>
  <div class="contain">
    <AppHeader
      @eventCloseVisible="eventCloseVisible"
      @eventShowVisible="eventShowVisible"
    />

    <div
      class="baidumap"
      id="allmap"
    ></div>

    <div
      class="incident-box"
      v-show="globleVisible"
    >
      <!-- 车辆信息 -->
      <dv-border-box-2>
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>{{ item.name }}</span>
          </div>

          <div class="incident-box_body">
            <div class="base-info">
              <span>所属省:</span>
              <span>{{ item.province }}</span>
            </div>

            <div class="base-info">
              <span>类型:</span>
              <span>{{ item.classes }}</span>
            </div>
            <div class="base-info">
              <span>详细地址:</span>
              <span>{{ item.address }}</span>
            </div>

            <div class="base-info">
              <span>所属市县:</span>
              <span>{{ item.belong }}</span>
            </div>

            <div class="base-info">
              <span>编码:</span>
              <span>{{ item.ISCN }}</span>
            </div>
          </div>
        </el-card>
      </dv-border-box-2>
      <!-- 预警点列表 -->
      <dv-border-box-2>
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>预警点列表</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
            ></el-button>
          </div>
          <div
            v-for="(item, index) in predictList"
            :key="item + index"
            class="text item"
            @click="InfoDetail(item)"
          >
            <span>{{ index + 1 }}.{{ item.name }}</span>
            <span>{{ item.eventNum }}</span>
          </div>
        </el-card>
      </dv-border-box-2>

      <!-- 图标表-->
      <dv-border-box-2>
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>{{ item.name }}</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
            ></el-button>
          </div>
          <div
            :id="id"
            :style="{ height: height, width: width }"
            class="id"
          ></div>
        </el-card>
      </dv-border-box-2>
      <!-- 突发事件列表 -->
      <dv-border-box-2>
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>突发事件列表</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
            ></el-button>
          </div>
          <div
            v-for="(item, index) in suddenEventList"
            :key="item + index"
            class="text item"
          >{{ item.event }}</div>
        </el-card>
      </dv-border-box-2>
    </div>
    <!-- <div id="video" style="width: 600px; height: 400px;">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div> -->
  </div>
</template>

<script
	type="text/javascript"
	src="//api.map.baidu.com/api?v=2.0&ak=EaPkWzZBEikiF0VrQ3l0px0E4du9jKGu"
></script>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
// import { videoPlayer } from "vue-video-player";
// import "videojs-flash";

import AppHeader from "@/components/AppHeader";
import echarts from "echarts";

export default {
  components: {
    AppHeader,
    // videoPlayer
  },
  data() {
    return {
      chart: null,
      defaultCenter: new BMap.Point(104.072888, 30.576798), // 默认地图中心
      // visible: Boolean,
      playerOptions: {
        live: true,
        autoplay: false, // 如果true，浏览器准备好时开始播放
        muted: false, // 默认情况下将会消除任何音频
        loop: false, // 是否视频一结束就重新开始
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        // controlBar: {
        //   timeDivider: false,
        //   durationDisplay: false,
        //   remainingTimeDisplay: false,
        //   currentTimeDisplay: false, // 当前时间
        //   volumeControl: false, // 声音控制键
        //   playToggle: false, // 暂停和播放键
        //   progressControl: false, // 进度条
        //   fullscreenToggle: true // 全屏按钮
        // },
        variable: "player", //播放函数名称
        video: "rtmp://218.89.68.166:1110/camera/114",

        // sources: [
        //   {
        //     type: "rtmp/flv",
        //     src: "rtmp://218.89.68.166:1110/camera/114" // 视频地址-改变它的值播放的视频会改变
        //   }
        // ]
        notSupportedMessage: "此视频暂无法播放，请稍后再试" // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      item: {
        name: "G5京昆高速",

        name: "G5京昆高速",
        province: "四川省",
        classes: "出入口类型",
        address: "四川省成都市双流区",
        belong: "成都市",
        ISCN: "出入口编码"
      },
      globleVisible: Boolean,
      // 数据
      predictList: [
        {
          name: "G5京昆高速",
          eventNum: "较多",
          children: {
            name: "G5京昆高速",
            province: "四川省",
            classes: "出入口类型",
            address: "四川省成都市青白江",
            belong: "成都市",
            ISCN: "出入口编码"
          },
          point: { lng: 104.027254, lat: 30.58507 }
        },
        {
          name: "G4201成都绕城高速",
          eventNum: "较少",
          children: {
            name: "G4201成都绕城高速",
            province: "四川省",
            classes: "出入口类型",
            address: "四川省成都市金牛区",
            belong: "成都市",
            ISCN: "出入口编码"
          },
          point: { lng: 104.32, lat: 30.88 }
        },
        {
          name: "成宜高速出口",
          eventNum: "较少",
          children: {
            name: "成宜高速出口",
            province: "四川省",
            classes: "出入口类型",
            address: "四川省成都市武侯区",
            belong: "成都市",
            ISCN: "出入口编码"
          },
          point: { lng: 104.56, lat: 29.77 }
        },
        {
          name: "绕城高速出口",
          eventNum: "较少",
          children: {
            name: "绕城高速出口",
            province: "四川省",
            classes: "出入口类型",
            address: "四川省成都市高新区",
            belong: "宜宾市",
            ISCN: "出入口编码"
          },
          point: { lng: 104.37, lat: 31.13 }
        },
        {
          name: "机场高速出口 ",
          eventNum: "较少",
          children: {
            name: "机场高速出口 ",
            province: "四川省",
            classes: "出入口类型",
            address: "四川省成都市双流区",
            belong: "成都市",
            ISCN: "出入口编码"
          },
          point: { lng: 104.94, lat: 30.57 }
        },
        {
          name: "成巴高速",
          eventNum: "较少",
          children: {
            name: "成巴高速",
            province: "四川省",
            classes: "出入口类型",
            address: "四川省巴中市",
            belong: "成都市",
            ISCN: "出入口编码"
          },
          point: { lng: 103.29, lat: 30.2 }
        }
      ],
      suddenEventList: [
        { event: "绕城高速出口因两车追尾造成交通堵塞" },
        { event: "G320成都绕城高速因两车擦挂造成堵塞" },
        { event: "黄田车站发生交通事故，造成道路阻塞" },
        { event: "绕城东服务区附件发生交通事故，造成道路堵塞" },
        { event: "继承高速出口附近发生交通事故，造成道路堵塞" }
      ],
      echartData: {
        carData: [2.0, 4.9, 9.0, 23, 27.6, 76, 135.6, 162, 32.6, 20, 6.4, 3],
        proData: [2.6, 5.9, 9.0, 26, 28, 70, 175, 182.2, 48.7, 18.8, 6.0, 2.3]
      }
      // mapPoint: {
      //   point: [30.576798, 30.576798]
      // }
    };
  },
  props: {
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "285px"
    },
    height: {
      type: String,
      default: "200px"
    }
  },
  mounted() {
    this.baiduMap();

    this.initChart();
    // console.log("this is current player instance object", this.player);
  },

  created() {
    // this.baiduMap();
  },
  watch: {
    echartData: {
      handler(val) {
        //监听数据发生改变 刷新图表数据
        this.initChart();
      },
      deep: true
    }
    // dataArr(val) {
    //   //监听数据发生改变 刷新图表数据
    //   this.initChart();
    // }
  },

  methods: {
    baiduMap() {
      this.map = new BMap.Map("allmap"); // 创建地图实例
      // this.map = map;
      var point = new BMap.Point(104.072888, 30.576798); // 创建点坐标

      this.map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

      this.map.addControl(new BMap.NavigationControl());
      this.map.addControl(new BMap.ScaleControl());
      this.map.addControl(new BMap.OverviewMapControl());
      this.map.addControl(new BMap.MapTypeControl());
      this.map.setMapStyle({ style: "light" }); //地图风格
      //   map.setMapStyleV2({ styleJson: styleJson });

      var marker = new window.BMap.Marker(point); // 创建标注
      this.map.addOverlay(marker); // 将标注添加到地图中

      var infoWindow = new BMap.InfoWindow("这是提示信息");
      // 鼠标移上标注点要发生的事
      marker.addEventListener("mouseover", function () {
        this.openInfoWindow(infoWindow);
      });

      // 鼠标移开标注点要发生的事
      marker.addEventListener("mouseout", function () {
        //this.closeInfoWindow(infoWindow)
      });
    },
    eventShowVisible() {
      this.globleVisible = true;
    },
    eventCloseVisible() {
      this.globleVisible = false;
    },
    InfoDetail(item) {
      const { name, children } = item;
      this.item = children;
      console.log(name);
      this.echartData.carData = [];
      this.echartData.proData = [];
      for (let i = 0; i < 12; i++) {
        this.echartData.carData.push(Math.round(Math.random() * 150));
        this.echartData.proData.push(Math.round(Math.random() * 150));
      }
      console.warn(item.point);
      const { lng, lat } = item.point;
      // this.baiduMap();
      const point = new BMap.Point(lng, lat);

      // this.map.flyTo(point);
      this.map.centerAndZoom(point, 15);

      const marker = new window.BMap.Marker(point, 15);
      this.map.addOverlay(marker);

      console.log(point);

      console.log(this.echartData);
      // this.initChart();

      console.log("---");
    },
    initChart() {
      // var dataArr = this.dataArr;

      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption(
        {
          // echarts未公开图形api，建议使用文档推荐写法

          title: {
            // text: "车流量数据"
            // subtext: "最后盘点日期：" + new Date().toLocaleDateString()
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["前一天车流量数据", "预测数据"]
          },
          // toolbox: {
          //   show: true,
          //   feature: {
          //     dataView: { show: true, readOnly: false },
          //     magicType: { show: true, type: ["line", "bar"] },
          //     restore: { show: true },
          //     saveAsImage: { show: true }
          //   }
          // },
          calculable: true,
          xAxis: [
            {
              type: "category",
              data: [
                "08",
                "09",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19"
              ]
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "前一天车流量数据",
              type: "bar",
              // data: data1,
              data: this.echartData.carData,

              // data: dataArr,
              // markPoint: {
              //   data: [
              //     { type: "max", name: "最大值" },
              //     { type: "min", name: "最小值" }
              //   ]
              // },
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              }
            }
            // {
            //   name: "客流数据",
            //   type: "bar",

            // data: this.echartData.carData,
            // markPoint: {
            //   data: [
            //     { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
            //     { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
            //   ]
            // },
            //   markLine: {
            //     data: [{ type: "average", name: "平均值" }]
            //   }
            // }
          ]
        },
        false
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.contain {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
}
.dv-border-box-2 {
  position: relative;
  height: 250px;
  width: 300px;
}
.incident-box {
  position: absolute;
  text-align: center;
  top: 10%;
  left: 2%;
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.text {
  font-size: 16px;
  // width: 260px;
  text-align: left;
  padding: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  span {
    &:first-child {
      width: 160px;
      text-align: left;
    }
  }
}

.item {
  //   margin-bottom: 30px;
  width: 100%;

  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
  span {
    &:last-child {
      color: aqua;
    }
  }
  .item:hover {
    color: aqua;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  height: 250px;
  width: 300px;

  background-color: #60c0f8b3;

  color: white;
}

#allmap {
  width: 100%;
  height: 100%;

  z-index: -1;
  background: black;
  overflow: hidden;
}

.incident-box_body {
  .base-info {
    text-align: left;
    padding: 6px;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    span {
      width: 100px;
      text-align: left;
      padding: 3px;
      &:first-child {
        text-align: right;
      }
    }
  }
}
.id {
  margin-top: -20px;
}
.content_video .video-js .vjs-big-play-button {
  font-size: 1.5em;
  width: 2.5em;
  border-radius: 50%;
  top: 40%;
  left: 45%;
}
.content_video {
  text-align: left;
  padding: 0 7%;
}
// video {
// 	position: absolute;
// 	top: 50%;
// }
</style>
