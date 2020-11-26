<template>
  <div class="contain">
    <div class="baidumap" id="allmap"></div>
    <AppHeader @eventCloseVisible="eventCloseVisible" @eventShowVisible="eventShowVisible" />

    <div class="incident-box" v-show="odVisible">
      <dv-border-box-2>
        <div class="box-card">
          <div class="header">出行排行</div>
          <div id="text">
            出租车
            <el-progress :text-inside="true" :stroke-width="15" :percentage="percentage1"></el-progress>地铁
            <el-progress
              :text-inside="true"
              :stroke-width="15"
              :percentage="percentage2"
              status="success"
            ></el-progress>私家车
            <el-progress
              :text-inside="true"
              :stroke-width="15"
              :percentage="percentage3"
              status="warning"
            ></el-progress>大巴车
            <el-progress
              :text-inside="true"
              :stroke-width="15"
              :percentage="percentage4"
              status="warning"
            ></el-progress>公交车
            <el-progress
              :text-inside="true"
              :stroke-width="15"
              :percentage="percentage5"
              status="exception"
            ></el-progress>其他
            <el-progress :text-inside="true" :stroke-width="15" :percentage="percentage6"></el-progress>
          </div>
        </div>
      </dv-border-box-2>

      <dv-border-box-2>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>关联性分析</span>
          </div>
          <div class="position">
            <div class="base-info">
              <span>目的地</span>
              <span>出发地</span>
              <span>客流量</span>
            </div>
            <div class="base-info">
              <span>文殊院</span>
              <span>黄龙溪</span>
              <span>36</span>
            </div>
            <div class="base-info">
              <span>西岭雪山</span>
              <span>幸福海林</span>
              <span>20</span>
            </div>
            <div class="base-info">
              <span>赵公山</span>
              <span>都江堰</span>
              <span>22</span>
            </div>
            <div class="base-info">
              <span>国色天香</span>
              <span>成都东站</span>
              <span>32</span>
            </div>
          </div>
        </el-card>
      </dv-border-box-2>

      <dv-border-box-2>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>预警点列表</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="city">城市/景区</el-button>
          </div>
          <div v-if="isCity">
            <div
              v-for="(item, index) in predictList"
              :key="item + index"
              class="text item"
              @click="clickEvent(item)"
            >{{ index + 1 }}.{{ item.name }}</div>
          </div>
          <div v-if="isScenery">
            <div
              v-for="(item, index) in predictList"
              :key="item + index"
              class="text item"
              @click="clickEvent(item)"
            >{{ index + 1 }}.{{ item.name1}}</div>
          </div>
        </el-card>
      </dv-border-box-2>

      <dv-border-box-2>
        <el-card class="box-card" v-show="odTrackvisible">
          <div slot="header" class="clearfix">
            <span>景区OD</span>
          </div>
          <div class="position" v-if="isCity">
            <div class="base-info">
              <span>目的地</span>
              <span>出发地</span>
              <span>客流量</span>
            </div>
            <div class="base-info">
              <span>{{item.name}}</span>

              <span>{{item.arrive1}}</span>
              <span>{{item.customer1}}</span>
            </div>
            <div class="base-info">
              <span>{{item.name}}</span>
              <span>{{item.arrive2}}</span>
              <span>{{item.customer2}}</span>
            </div>
            <div class="base-info">
              <span>{{item.name}}</span>
              <span>{{item.arrive3}}</span>
              <span>{{item.customer3}}</span>
            </div>
            <div class="base-info">
              <span>{{item.name}}</span>
              <span>{{item.arrive4}}</span>
              <span>{{item.customer4}}</span>
            </div>
            <div class="base-info">
              <span>{{item.name}}</span>
              <span>{{item.arrive5}}</span>
              <span>{{item.customer5}}</span>
            </div>
          </div>
          <div class="position" v-if="isScenery">
            <div class="base-info">
              <span>目的地</span>
              <span>出发地</span>
              <span>客流量</span>
            </div>
            <div class="base-info">
              <span>{{item.name1}}</span>

              <span>{{item.arrive1}}</span>
              <span>{{item.customer1}}</span>
            </div>
            <div class="base-info">
              <span>{{item.name1}}</span>
              <span>{{item.arrive2}}</span>
              <span>{{item.customer2}}</span>
            </div>
            <div class="base-info">
              <span>{{item.name1}}</span>
              <span>{{item.arrive3}}</span>
              <span>{{item.customer3}}</span>
            </div>
            <div class="base-info">
              <span>{{item.name1}}</span>
              <span>{{item.arrive4}}</span>
              <span>{{item.customer4}}</span>
            </div>
            <div class="base-info">
              <span>{{item.name1}}</span>
              <span>{{item.arrive5}}</span>
              <span>{{item.customer5}}</span>
            </div>
          </div>
        </el-card>
      </dv-border-box-2>
    </div>
  </div>
</template>

  
<script type="text/javascript">
import AppHeader from "@/components/AppHeader";
import echarts from "echarts";

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      // defaultCenter: new BMapGL.Point(104.072888, 30.576798), // 默认地图中心
      odVisible: true,
      chart: null,
      isCity: true,
      isScenery: false,
      bmapgl: "",

      percentage1: 24,
      percentage2: 58,
      percentage3: 88,
      percentage4: 78,
      percentage5: 65,
      percentage6: 55,
      // scenicVisible: Boolean,
      item: {
        name: "乐山市",
        // name1:"文殊院",

        arrive1: "内江市",
        arrive2: "雅安市",
        arrive3: "都江堰",
        arrive4: "成都东",
        arrive5: "都江堰",
        customer1: "22",
        customer2: "42",
        customer3: "33",
        customer4: "16",
        customer5: "34"
      },
      odTrackvisible: true,
      predictList: [
        {
          name: "乐山市",
          name1: "文殊院",
          children: {
            name: "乐山市",
            name1: "文殊院",
            arrive1: "内江市",
            arrive2: "雅安市",
            arrive3: "都江堰",
            arrive4: "成都东",
            arrive5: "都江堰",
            customer1: "22",
            customer2: "42",
            customer3: "33",
            customer4: "16",
            customer5: "34"
          },

          point: {
            lng: 103.73,
            lat: 29.59
          }
        },
        {
          name: "内江市",
          name1: "李冰广场",
          children: {
            name: "内江市",
            name1: "李冰广场",
            arrive1: "简阳市",
            arrive2: "雅安市",
            arrive3: "崇州市",
            arrive4: "成都东",
            arrive5: "都江堰",
            customer1: "22",
            customer2: "42",
            customer3: "33",
            customer4: "16",
            customer5: "34"
          },
          point: {
            lng: 105.04,
            lat: 29.59
          }
        },
        {
          name: "凉山彝族",
          name1: "螺稷山",
          children: {
            name1: "螺稷山",
            name: "凉山彝族",
            arrive1: "成都东",
            arrive2: "雅安市",
            arrive3: "都江堰",
            arrive4: "成都南",
            arrive5: "都江堰",
            customer1: "22",
            customer2: "42",
            customer3: "33",
            customer4: "16",
            customer5: "34"
          },
          point: {
            lng: 102.29,
            lat: 27.92
          }
        },
        {
          name: "南充市",
          name1: "青城山",

          children: {
            name1: "青城山",
            name: "南充市",
            arrive1: "眉山市",
            arrive2: "雅安市",
            arrive3: "峨眉山",
            arrive4: "成都东",
            arrive5: "都江堰",
            customer1: "16",
            customer2: "22",
            customer3: "33",
            customer4: "19",
            customer5: "33"
          },
          point: {
            lng: 106.06,
            lat: 30.8
          }
        },
        {
          name: "宜宾市",
          name1: "洛冰市",
          children: {
            name1: "洛冰市",
            name: "宜宾市",
            arrive1: "内江市",
            arrive2: "雅安市",
            arrive3: "都江堰",
            arrive4: "巴中市",
            arrive5: "都江堰",
            customer1: "17",
            customer2: "33",
            customer3: "23",
            customer4: "46",
            customer5: "34"
          },
          point: {
            lng: 104.56,
            lat: 29.77
          }
        },
        {
          name: "巴中市",
          name1: "熊猫基地",
          children: {
            name1: "熊猫基地",
            name: "巴中市",
            arrive1: "南充市",
            arrive2: "宜宾市",
            arrive3: "乐山市",
            arrive4: "成都东",
            arrive5: "都江堰",
            customer1: "17",
            customer2: "42",
            customer3: "33",
            customer4: "26",
            customer5: "34"
          },
          point: {
            lng: 106.73,
            lat: 31.86
          }
        }
      ]
    };
  },
  props: {
    percentage() {}
  },

  mounted() {
    this.baiduMap();
    // this.GaodeMap();
    // var view = new mapvgl.View({
    //   map: map
    // });
  },
  methods: {
    baiduMap() {
      // var map = new BMap.Map("allmap"); // 创建Map实例
      // map.centerAndZoom(new BMapGL.Point(116.28019, 40.049191), 19); // 初始化地图,设置中心点坐标和地图级别
      // map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      // map.setHeading(10.5);
      // map.setTilt(73);
      var map = new BMap.Map("allmap"); // 创建地图实例
      this.map = map;
      var point = new BMap.Point(104.072888, 30.576798, 12); // 创建点坐标
      map.centerAndZoom(point, 12); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

      // this.map.addControl(new BMap.NavigationControl());
      // this.map.addControl(new BMap.ScaleControl());
      // this.map.addControl(new BMap.OverviewMapControl());
      // this.map.addControl(new BMap.MapTypeControl());
      // this.map.setTilt(45);
      this.map.setMapStyle({ style: "light" }); //地图风格
      // map.setMapStyleV2({ styleJson: styleJson });
      var marker = new window.BMap.Marker(point); // 创建标注
      this.map.addOverlay(marker); // 将标注添加到地图中
      // //提示信息
      // var infoWindow = new BMapGL.InfoWindow("这是提示信息");
      // // 鼠标移上标注点要发生的事
      // marker.addEventListener("mouseover", function() {
      //   this.openInfoWindow(infoWindow);
      // });
      // // 鼠标移开标注点要发生的事
      // marker.addEventListener("mouseout", function() {
      //   // this.closeInfoWindow(infoWindow);
      // });
      // 2. 创建MapVGL图层管理器
      // var view = new mapvgl.View({
      //   map: map
      // });

      // // 3. 创建可视化图层，并添加到图层管理器中
      // var layer = new mapvgl.FlyLineLayer({
      //   color: "rgba(50, 50, 200, 1)",
      //   textureColor: "rgba(50, 50, 200, 1)",
      //   textureWidth: 10,
      //   textureLength: 30,
      //   data: [
      //     {
      //       geometry: {
      //         type: "LineString",
      //         coordinates: [
      //           [116.394191, 39.91334],
      //           [116.417259, 39.913672]
      //         ]
      //       }
      //     }
      //   ]
      // });
      // view.addLayer(layer);

      // // 4. 准备好规范化坐标数据
      // var data = [
      //   {
      //     geometry: {
      //       type: "LineString",
      //       coordinates: [
      //         [116.394191, 39.91334],
      //         [116.417259, 39.913672]
      //       ]
      //     }
      //   }
      // ];

      // // 5. 关联图层与数据，享受震撼的可视化效果
      // layer.setData(data);
      // var citys = [
      //   "资阳市",
      //   "株洲市",
      //   "湘潭市",
      //   "衡阳市",
      //   "乐山市",
      //   "资阳市",
      //   "常德市",
      //   "岳阳市",
      //   "成都市",
      //   "郴州市",
      //   "永州市",
      //   "怀化市",
      //   "眉山市"
      // ];

      // var randomCount = 100; // 模拟的飞线的数量
      // var curve = new mapvgl.BezierCurve();

      // var data = [];

      // // 构造数据
      // while (randomCount--) {
      //   var startPoint = mapv.utilCityCenter.getCenterByCityName(
      //     citys[parseInt(Math.random() * citys.length, 10)]
      //   );
      //   var endPoint = mapv.utilCityCenter.getCenterByCityName(
      //     citys[parseInt(Math.random() * citys.length, 10)]
      //   );

      //   curve.setOptions({
      //     start: [startPoint.lng, startPoint.lat],
      //     end: [endPoint.lng, endPoint.lat]
      //   });
      //   var curveModelData = curve.getPoints();

      //   data.push({
      //     geometry: {
      //       type: "LineString",
      //       coordinates: curveModelData
      //     },
      //     properties: {
      //       count: Math.random()
      //     }
      //   });
      // }

      // var view = new mapvgl.View({
      //   map: map
      // });

      // var flylineLayer = new mapvgl.FlyLineLayer({
      //   style: "chaos",
      //   step: 0.3,
      //   color: "rgba(33, 242, 214, 0.3)",
      //   textureColor: function(data) {
      //     return data.properties.count > 0.5 ? "#ff0000" : "#56ccdd";
      //   },
      //   textureWidth: 20,
      //   textureLength: 10
      // });
      // view.addLayer(flylineLayer);
      // flylineLayer.setData(data);
    },
    // GaodeMap() {
    //   var map = new AMap.Map("allmap"); // 创建Map实例
    //   map.centerAndZoom(new AMap.Point(116.28019, 40.049191), 19); // 初始化地图,设置中心点坐标和地图级别
    // },
    eventShowVisible() {
      this.odVisible = true;
    },
    eventCloseVisible() {
      this.odVisible = false;
    },
    clickEvent(item) {
      const { name, children } = item;
      this.item = children;

      const { lng, lat } = item.point;
      const point = new BMap.Point(lng, lat);
      // this.map.flyTo(point);

      this.map.centerAndZoom(point, 12); // 初始化地图，设置中心点坐标和地图级别
      const marker = new window.BMap.Marker(point);

      this.map.addOverlay(marker);
      this.percentage1 = Math.round(Math.random() * 100);
      this.percentage2 = Math.round(Math.random() * 100);
      this.percentage3 = Math.round(Math.random() * 100);
      this.percentage4 = Math.round(Math.random() * 100);
      this.percentage5 = Math.round(Math.random() * 100);
      this.percentage6 = Math.round(Math.random() * 100);
    },
    city() {
      if (this.isCity == true) {
        this.isCity = false;
        this.isScenery = true;
      } else {
        this.isCity = true;
        this.isScenery = false;
      }
    }
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
.dv-border-box-2 {
  position: relative;
  height: 250px;
  width: 300px;
}
.incident-box {
  // z-index: 100;
  position: absolute;
  text-align: center;
  top: 10%;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  // flex-wrap: wrap;
}
.text {
  font-size: 14px;
  width: 100%;
  text-align: left;
  padding: 3px;
}

.item {
  //   margin-bottom: 30px;
  width: 100%;
}
.content-right {
  margin-left: 3%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  height: 250px;
  width: 300px;
  margin-bottom: 6%;
  background-color: rgba(96, 192, 248, 0.7);

  color: white;
}
.header {
  color: white;
  font-size: 16px;
}

#text {
  font-size: 14px;
  color: white;
  text-align: left;
  // margin-top: 5px;
  padding: 10px;
}
#allmap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";

  z-index: -1;
  background: black;
  overflow: hidden;
}
.el-progress {
  width: 100%;
  text-align: center;
}
.position {
  margin-top: -15px;
  .base-info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    &:first-child {
      color: aqua;
    }
    span {
      // display: block;
      width: 100px;
      text-align: left;
      padding: 2px;
    }
  }
}
</style>
