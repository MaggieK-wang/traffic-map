<template>
  <div class="container">
    <div class="container_box">
      <div class="incident-box_list" v-show="eventInfoVisible">
        <!-- 事件模拟 -->
        <dv-border-box-2>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>事故模拟</span>
            </div>
            <div class="incident-video__body">
              <video :src="src" controls="controls"></video>
            </div>
          </el-card>
        </dv-border-box-2>
      </div>

      <div class="incident-box_event" v-show="eventInfoVisible">
        <!-- 事发前后 -->
        <dv-border-box-2>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>事发前后</span>
            </div>
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in urlList" :key="item">
                <img :src="item" class="image" />
              </el-carousel-item>
            </el-carousel>
          </el-card>
        </dv-border-box-2>
      </div>
    </div>
  </div>
</template>

<script>
// import { cityDetail } from "../data";
import { videoSrc } from "../img";
import { typeToUrls } from "../img";

export default {
  name: "eventInfo",
  data() {
    // eventVisible = false;
    return {
      videoSrc,
      typeToUrls
    };
  },
  props: {
    eventInfoVisible: {
      type: Boolean
    },
    event_type: {}
  },
  computed: {
    urlList() {
      // return this.cityDetail[this.cityKey];
      // return this.videoSrc[this.event_type];
      const type = this.event_type;
      // console.log(this.event_type, "leixing");
      // console.log(typeToUrls[type], "list");
      // debugger;
      return typeToUrls[type];
    },
    src() {
      console.log(videoSrc[this.event_type], "list");
      return videoSrc[this.event_type];
    }
  },
  // mounted() {
  //   this.src = videoSrc[this.event_type];
  //   // debugger;
  //   // console.log(src);

  // },
  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  .container_box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    top: 20%;
    right: 2%;
    flex: 1;
  }
}

.text {
  font-size: 14px;
  // width: 100%;
  text-align: left;
  padding: 3px;
}

.item {
  // width: 100%;
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

.box-card {
  height: 220px;
  width: 350px;

  background-color: rgba(96, 192, 248, 0.7);

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
video {
  height: 100%;
  margin-top: -10px;
  width: 100%;
}

img {
  height: 150px;
  margin-top: -18px;
  width: 100%;
}
</style>
