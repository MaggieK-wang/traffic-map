<template>
  <div class="contain" v-show="carInfoVisible">
    <div class="incident-box">
      <dv-border-box-2>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.name}}</span>
          </div>
          <div class="incident_box">
            <div class="incident-box_body">
              <div class="base-info">
                <span>车型</span>
                <span>{{item.car}}</span>
              </div>
              <div class="base-info">
                <span>车牌颜色</span>
                <span>{{item.color}}</span>
              </div>
              <div class="base-info">
                <span>经营范围</span>
                <span>{{item.range}}</span>
              </div>
              <div class="base-info">
                <span>座位数:</span>
                <span>{{item.num}}</span>
              </div>
              <div class="base-info">
                <span>所属公司:</span>
                <span>{{item.belong}}</span>
              </div>
            </div>
            <div class="incident-box_body_right">
              <div class="base-info">
                <span>车牌</span>
                <span>{{item.carNum}}</span>
              </div>
              <div class="base-info">
                <span>燃油类型</span>
                <span>{{item.Oil}}</span>
              </div>
              <div class="base-info">
                <span>运营状态</span>
                <span>{{item.state}}</span>
              </div>
            </div>
          </div>
        </el-card>
      </dv-border-box-2>
      <dv-border-box-2>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>车辆轨迹列表</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
          </div>
          <div class="position">
            <div class="base-info">
              <span>成都东客站</span>
              <span>到</span>
              <span>碧峰峡</span>
            </div>
            <div class="base-info">
              <span>成都东客站</span>
              <span>到</span>
              <span>碧峰峡</span>
            </div>
            <div class="base-info">
              <span>成都东客站</span>
              <span>到</span>
              <span>碧峰峡</span>
            </div>
          </div>
        </el-card>
      </dv-border-box-2>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "carInfoByd",
  data() {
    return {
      chart: null,
      item: [
        { name: "川A66154", car: "BYD", color: "yellow", range: "" },
        { name: "川B7785Q" },
        { name: "川CSB779" },
        { name: "川AXQ634" },
        { name: "川Z4563X" },
        { name: "川F654CP" }
      ]
    };
  },
  props: {
    carInfoVisible: {
      type: Boolean
      //   default: false
    },
    item: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
.incident-box {
  height: 100%;
  padding: 10px 5px 20px;
  // z-index: 100;
  position: absolute;
  // top: 5%;
  margin-left: 2%;
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: row;

  // justify-items: center;

  justify-content: flex-start;

  .incident-box_body {
    top: -300px;
  }
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
  width: 400px;
  // margin-bottom: 6%;
  background-color: rgba(96, 192, 248, 0.7);
  //   border-radius: 10%;
  //   border: rgba(3, 129, 255, 0.6) solid 1px;
  position: absolute;
  top: -600px;
  color: white;
}
.position {
  // margin-top: -15px;
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

