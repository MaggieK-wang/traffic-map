<template>
  <div class="contain">
    <div class="baidumap" id="allmap"></div>
    <eventInfo :event_type="event_type" :eventInfoVisible="eventInfoVisible" v-show="eventVisible" />
    <AppHeader @eventCloseVisible="eventCloseVisible" @eventShowVisible="eventShowVisible" />

    <div class="incident-box" v-show="eventVisible">
      <!-- 事件预警 -->

      <dv-border-box-2>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>突发事件</span>
            <!-- <span>城市</span> -->
            <el-button style="float: right; padding: 3px 0" type="text"></el-button>
          </div>
          <div
            @click="eventShow(item,index)"
            v-for="(item,index) in suddenEventList"
            :key="item+index"
            class="text item"
          >{{ item.event }}</div>
        </el-card>
      </dv-border-box-2>

      <!-- 事故信息 -->
      <dv-border-box-2>
        <el-card class="box-card" v-show="eventInfoVisible">
          <!-- <div
              @click="cityClick(item)"
              v-for="item of city"
              :key="item.key"
          >{{item.name}}--{{item.key}}</div>-->
          <div slot="header" class="clearfix">
            <span>事故信息</span>
          </div>
          <div class="incident-box_body_left">
            <div class="base-info">
              <span>时间:</span>
              <span>{{item.time}}</span>
            </div>
            <div class="base-info">
              <span>地点:</span>
              <span>{{item.place}}</span>
            </div>
            <div class="base-info">
              <span>事件描述:</span>
              <span>{{item.describle}}</span>
            </div>
            <div class="base-info">
              <span>应对措施:</span>
              <span>暂无</span>
            </div>
          </div>
        </el-card>
      </dv-border-box-2>
    </div>
  </div>
</template>
<script
	type="text/javascript"
	src="//api.map.baidu.com/api?v=3.0&ak=3bVHdeo2ZZaZO4QczC63d0kMsbA55ZSD"
></script>
<script type="text/javascript">
import AppHeader from "@/components/AppHeader";
import echarts from "echarts";
import eventInfo from "./components/eventInfo";

export default {
  components: {
    AppHeader,
    eventInfo
  },
  data() {
    return {
      event_type: 1,
      eventVisible: true,
      item: {},
      eventInfoVisible: false,
      // 数据
      suddenEventList: [
        {
          event: "绕城高速出口因两车追尾造成交通堵塞，请关注",
          key: "1",
          children: {
            time: "2020-5-30",
            place: "绕城高速",
            describle: "绕城高速出口因两车追尾"
          },
          point: { lng: 104.32, lat: 30.88 }
        },
        {
          event: "杜甫草堂因连环车祸造成交通堵塞，请关注",
          key: "2",
          children: {
            time: "2020-6-30",
            place: "杜甫草堂",
            describle: "杜甫草堂因连环车祸"
          },
          point: { lng: 104.56, lat: 29.77 }
        },
        {
          event: "成昆高速收费站因两车擦挂造成交通堵塞，请关注",
          key: "3",
          children: {
            time: "2020-7-01",
            place: "成昆高速",
            describle: "成昆高速收费站因两车擦挂"
          },
          point: { lng: 104.027254, lat: 30.58507 }
        },
        {
          event: "G306道成都绕城高速因2车擦挂造成交通堵塞，请关注",
          key: "4",
          children: {
            time: "2020-7-01",
            place: "G306道",
            describle: "G306道成都绕城高速因2车擦挂"
          },
          point: { lng: 104.94, lat: 30.57 }
        },
        {
          event: "望丛祠因两次擦挂造成交通堵塞，请关注",
          key: "5",
          children: {
            time: "2020-7-01",
            place: "望丛祠",
            describle: "望丛祠成都绕城高速因2车擦挂"
          },
          point: { lng: 104.37, lat: 31.13 }
        }
      ]
    };
  },

  mounted() {
    this.baiduMap();
  },
  methods: {
    // cityClick(city) {
    //   this.cityKey = city.key;
    // },
    baiduMap() {
      var map = new BMap.Map("allmap"); // 创建地图实例
      this.map = map;

      var point = new BMap.Point(104.072888, 30.576798); // 创建点坐标
      this.map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

      this.map.addControl(new BMap.NavigationControl());
      this.map.addControl(new BMap.ScaleControl());
      this.map.addControl(new BMap.OverviewMapControl());
      this.map.addControl(new BMap.MapTypeControl());
      this.map.setMapStyle({ style: "light" }); //地图风格

      var marker = new window.BMap.Marker(point); // 创建标注
      this.map.addOverlay(marker); // 将标注添加到地图中

      //提示信息
      var infoWindow = new BMap.InfoWindow("这是提示信息");
      // 鼠标移上标注点要发生的事
      marker.addEventListener("mouseover", function() {
        this.openInfoWindow(infoWindow);
      });

      // 鼠标移开标注点要发生的事
      marker.addEventListener("mouseout", function() {
        //this.closeInfoWindow(infoWindow)
      });
    },
    eventShow(item, index) {
      console.log(item);
      // debugger;
      const { event, children } = item;
      this.item = children;
      this.eventInfoVisible = true;
      this.event_type = index + 1;

      const { lng, lat } = item.point;
      const point = new BMap.Point(lng, lat);

      this.map.centerAndZoom(point, 12);
      // this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      const marker = new window.BMap.Marker(point);
      this.map.addOverlay(marker);

      console.log("ok");
    },
    eventShowVisible() {
      this.eventVisible = true;
    },
    eventCloseVisible() {
      this.eventVisible = false;
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
.incident-box {
  // height: 100%;

  // z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  top: 20%;
  // top: 15px;
  left: 2%;
  flex: 1;
  // margin-left: 2%;
}
.text {
  font-size: 14px;
  width: 100%;
  text-align: left;
  padding: 3px;
}

.item {
  width: 100%;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.dv-border-box-2 {
  position: relative;
  max-height: 270px;
  // width: 100%;
}
.box-card {
  // height: 100%;
  // width: 100%;
  max-height: 220px;
  max-width: 350px;

  // margin-bottom: 6%;
  background-color: rgba(96, 192, 248, 0.7);
  //   border-radius: 10%;
  //   border: rgba(3, 129, 255, 0.6) solid 1px;
  color: white;
}

#allmap {
  width: 100%;
  height: 100%;

  z-index: -1;
  background: black;
  overflow: hidden;
}
.el-progress {
  width: 80%;
  text-align: center;
}
.base-info {
  // display: flex;
  // flex-direction: row;
  // // height: 0.6rem;
  // // line-height: 1rem;
  // align-items: center;
  text-align: left;
  padding: 6px;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
  span {
    width: 100%;
    text-align: left;
    padding: 5px;

    &:first-child {
      text-align: right;
    }
  }
}
</style>
