<template>
  <div class="contain">
    <div class="baidumap" id="allmap"></div>
    <AppHeader
      @eventCloseVisible="eventCloseVisible"
      @eventShowVisible="eventShowVisible"
      @handleSearch="handleSearch"
    />
    <!-- <carInfoByd :carInfoVisible="carInfoShowVisible" /> -->
    <!-- 车辆基本信息 -->
    <div v-show="carTradeVisible">
      <div class="incident-box" v-show="carTradeVisible">
        <div class="content-left">
          <dv-border-box-2>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>特定车辆</span>

                <el-button style="float: right; padding: 3px 0" type="text"></el-button>
              </div>
              <div class="content">
                <div class="card-right">
                  <div
                    @click="handleClick(item)"
                    v-for="(item, index) in carCatory"
                    :key="item + index"
                    class="text item"
                  >
                    <span>{{item.name}}</span>
                    <span>{{item.carName}}</span>
                  </div>
                </div>
              </div>
            </el-card>
          </dv-border-box-2>
        </div>
      </div>
      <!-- 弹窗 -->
      <!-- 车辆详情 -->
      <div class="car-Detail" v-show="carDetailStatus">
        <dv-border-box-2>
          <el-card class="box-card car_Detail">
            <div slot="header" class="clearfix">
              <span>{{item.name}}</span>
            </div>

            <div class="incident-box_body">
              <!-- <div class="incident-box"> -->
              <div class="incident-box_body_left">
                <div class="base-info">
                  <span>车型:</span>
                  <span>{{item.carName}}</span>
                </div>
                <div class="base-info">
                  <span>车牌颜色:</span>
                  <span>{{item.carColor}}</span>
                </div>
                <div class="base-info">
                  <span>经营范围:</span>
                  <span>{{item.range}}</span>
                </div>
                <div class="base-info">
                  <span>座位数:</span>
                  <span>{{item.sateNum}}</span>
                </div>
                <div class="base-info">
                  <span>所属公司:</span>
                  <span>{{item.belong}}</span>
                </div>
              </div>

              <div class="incident-box_body_right">
                <div class="base-info">
                  <span>车牌:</span>
                  <span>{{item.name}}</span>
                </div>
                <div class="base-info">
                  <span>燃油类型:</span>
                  <span>{{item.oil}}</span>
                </div>
                <div class="base-info">
                  <span>运营状态:</span>
                  <span>{{item.status}}</span>
                </div>
              </div>
            </div>
          </el-card>
        </dv-border-box-2>
        <!-- 车辆行驶轨迹 -->
        <dv-border-box-2>
          <el-card class="box-card car_trade">
            <div slot="header" class="clearfix">
              <span>车辆轨迹列表</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
            </div>
            <div class="position">
              <div class="base-info">
                <span>{{item.begin1}}</span>
                <span>到</span>
                <span>{{item.arrive1}}</span>
              </div>
              <div class="base-info">
                <span>{{item.begin2}}</span>
                <span>到</span>
                <span>{{item.arrive2}}</span>
              </div>
            </div>
          </el-card>
        </dv-border-box-2>
      </div>
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
// import carInfoByd from "./components/carInfoByd";

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      // ViewShow: true,
      carDetailStatus: false,
      carInfoVisible: false,
      // carInfoShowVisible: false,
      carTradeVisible: true,
      chart: null,
      item: {},

      carCatory: [
        {
          name: "川A66154",
          carName: "BYD",
          children: {
            name: "川A66154",
            carName: "BYD",
            carColor: "yellow",
            range: "网上营销",
            sateNum: "34",
            belong: "金龙汇通",
            oil: "汽油#92",
            status: "运营中",
            begin1: "成都东客站",
            arrive1: "德阳站",
            begin2: "德阳站",
            arrive2: "成都南"
          },
          point: { lng: 104.37, lat: 31.13 }
        },
        {
          name: "川B7785Q",
          carName: "五菱宏光",
          children: {
            name: "川B7785Q",
            carName: "五菱宏光",
            carColor: "白色",
            range: "网上营销",
            sateNum: "34",
            belong: "金龙汇通",
            oil: "汽油",
            status: "运营中",
            begin1: "成都东",
            arrive1: "绵阳站",
            begin2: "绵阳站",
            arrive2: "成都西"
          },
          point: { lng: 104.94, lat: 30.57 }
        },
        {
          name: "川CSB779",
          carName: "东风日产",
          children: {
            name: "川CSB779",
            carName: "东风日产",
            carColor: "白色",
            range: "门店直销",
            sateNum: "22",
            belong: "运航",
            oil: "新能源",
            status: "已下架",
            begin1: "成都西",
            arrive1: "自贡站",
            begin2: "自贡站",
            arrive2: "成都东"
          },
          point: { lng: 104.78, lat: 29.35 }
        },
        {
          name: "川Z4563X",
          carName: "大众",
          children: {
            name: "川Z4563X",
            carName: "大众",
            carColor: "白色",
            range: "线上预售",
            sateNum: "42",
            belong: "运航",
            oil: "柴油",
            status: "营业中",
            begin1: "成都东",
            arrive1: "眉山站",
            begin2: "眉山站",
            arrive2: "成都南"
          },
          point: { lng: 103.83, lat: 30.05 }
        },
        {
          name: "川F654CP",
          carName: "Jeep",
          children: {
            name: "川F654CP",
            carName: "Jeep",
            carColor: "红色",
            range: "线上预售",
            sateNum: "6",
            belong: "4S",
            oil: "汽油",
            status: "营业中",
            begin1: "成都南",
            arrive1: "德阳站",
            begin2: "德阳站",
            arrive2: "双流西"
          },
          point: { lng: 104.94, lat: 30.57 }
        }
      ]
    };
  },

  mounted() {
    this.baiduMap();
  },

  methods: {
    handleClick(item) {
      console.warn(item, "----------------");
      const { name, carName, children } = item;
      this.item = children;
      this.carDetailStatus = true;
      const { lng, lat } = item.point;
      // const point = new BMap.Point(lng, lat);
      const point = new BMap.Point(lng, lat);

      // this.map.flyTo(point);
      this.map.centerAndZoom(point, 7);

      const polyline = new BMap.Polyline(
        [
          new BMap.Point(104.072888, 30.576798),
          new BMap.Point(lng, lat)

          // new BMap.Point(116.425, 39.9)
        ],
        { strokeColor: "#60c0f8b3", strokeWeight: 6, strokeOpacity: 0.5 }
      );
      this.baiduMap();
      const marker = new window.BMap.Marker(point, 7);
      this.map.addOverlay(marker);
      this.map.addOverlay(polyline);
    },
    baiduMap() {
      var map = new BMap.Map("allmap"); // 创建地图实例
      this.map = map;
      // map.setMapStyleV2({styleJson:st
      var point = new BMap.Point(104.072888, 30.576798); // 创建点坐标
      this.map.centerAndZoom(point, 10); // 初始化地图，设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

      // var carMk = new BMap.Marker(points[0]);
      // var walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: true}});
      // this.walking.search("天坛公园", "故宫");
      // this.map.addOverlay(carMk);
      // this.map.setCenter(points[0]);
      // map.addControl(new BMap.NavigationControl());
      // map.addControl(new BMap.ScaleControl());
      // map.addControl(new BMap.OverviewMapControl());
      // map.addControl(new BMap.MapTypeControl());
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
    eventShowVisible() {
      this.carTradeVisible = true;
    },
    eventCloseVisible() {
      this.carTradeVisible = false;
    },
    handleSearch(item) {}
  }
};
</script>

<style lang="scss" scoped>
.contain {
  width: 100%;
  height: 100%;
  // position: relative;
  box-sizing: border-box;
}
.incident-box {
  position: absolute;
  top: 15%;
  right: 2%;
  flex: 1;

  // margin-right: -2%;
}
.car-Detail {
  left: 2%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  top: 15%;
}
.text {
  font-size: 14px;
  width: 100%;
  text-align: left;
  padding: 3px;
  // width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.item {
  width: 100%;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}
.clearfix {
  color: rgb(245, 245, 129);
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
  height: 236px;
  // width: 400px;
}

.box-card {
  height: 235px;
  width: 360px;
  margin-bottom: 3%;
  background-color: #60c0f8b3;
  //   border-radius: 10%;
  //   border: rgba(3, 129, 255, 0.6) solid 1px;
  color: white;
}

.left {
  text-align: left;
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
.content {
  // display: flex;
  // flex-direction: row;
  // justify-content: space-around;
  margin-top: -10px;
  .card-right {
    text-align: center;
    // padding: 4px;
    span {
      width: 200px;
      display: flex;
      flex-direction: row;
      // justify-content: space-around;
      text-align: left;
    }
  }
}

.incident-box_body {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  // flex-wrap: nowrap;
  .base-info {
    display: flex;
    flex-direction: row;
    // height: 0.6rem;
    // line-height: 1rem;
    align-items: center;

    span {
      width: 90px;
      text-align: left;
      padding: 5px;
      &:first-child {
        text-align: right;
      }
    }
  }
}
.position {
  // margin-top: -15px;
  .base-info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    span {
      // display: block;
      width: 100px;
      text-align: left;
      // padding: 2px;
    }
  }
}
</style>
