<template>
  <div class="body">
    <el-dialog title="个人简历" :visible.sync="curvisible" @closed="closeDrawer" width="70%">
      <div class="content">
        <div>{{preInf.selfAss}}</div>
        <div class="base-Ifm">
          <div class="header">
            <span>基本信息</span>
          </div>
          <div class="baseifm">
            <div class="ifm">
              <el-row>
                <el-col :span="8" class="base1">
                  <div>姓名:{{preInf.name}}</div>
                  <div>民族:{{preInf.national}}</div>
                  <div>电话:{{preInf.phone}}</div>
                  <div>邮箱:{{preInf.email}}</div>
                  <div>住址:{{preInf.address}}</div>
                </el-col>
                <el-col :span="8" class="base1">
                  <div>出生年月:{{preInf.born}}</div>
                  <div>身高:{{preInf.height}}</div>
                  <div>政治面貌:{{preInf.political}}</div>
                  <div>毕业高校:{{preInf.school}}</div>
                  <div>学历:{{preInf.record}}</div>
                </el-col>
                <el-col :span="8">
                  <img :src="preInf.picUrl" />
                  <div class="position">求职意向:{{preInf.position}}</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="education-Bg">
          <div class="header">
            <span>教育背景</span>
          </div>
          <div class="title">
            <el-row>
              <el-col :span="8">
                <span>{{preInf.eduTime}}</span>
              </el-col>
              <el-col :span="8">
                <span>{{preInf.school}}</span>
              </el-col>
              <el-col :span="8">
                <span>{{preInf.profession}}</span>
              </el-col>
            </el-row>
          </div>
          <div>主要课程：{{preInf.major}}</div>
          <div>
            <span class="circle">
              <ul class="boder">
                <li
                  :key="index"
                  v-for="(value,index) in preInf.campusExContent"
                  class="skilCerts"
                >{{value.content}}</li>
              </ul>
            </span>
          </div>
        </div>

        <div class="social-Ex">
          <div class="header">
            <span>实践经验</span>
          </div>
          <div class="title">
            <el-row>
              <!-- <el-col :span="8">
                <span>{{preInf.campusExTime}}</span>
              </el-col>-->
              <el-col :span="8">
                <span>{{preInf.campusExObj}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="program">
            <!-- <span>{{preInf.campusExObj}}</span> -->
            <span class="programName">{{preInf.programName}}</span>
            <span>{{preInf.programInfo}}</span>

            <span class="circle">
              <ul>
                <li :key="index" v-for="(value,index) in preInf.programEX">{{value.content}}</li>
              </ul>
            </span>
          </div>
          <div class="program">
            <!-- <span>{{preInf.campusExObj}}</span> -->
            <span class="programName">{{preInf.programName2}}</span>
            <span>{{preInf.programInfo2}}</span>

            <span class="circle">
              <ul>
                <li :key="index" v-for="(value,index) in preInf.programEX2">{{value.content}}</li>
              </ul>
            </span>
          </div>
        </div>
        <div class="shcool-Ex">
          <div class="header">
            <span>专业技能</span>
          </div>
          <div class="title">
            <!-- <el-row>
            <el-col :span="8">
              <span>{{preInf.campusExTime}}</span>
            </el-col>
            <el-col :span="8">
              <span>{{preInf.campusExObj}}</span>
            </el-col>
            <el-col :span="8">
              <span>{{preInf.campusJobs}}</span>
            </el-col>
            </el-row>-->
          </div>
          <div>
            <span class="circle">
              <ul>
                <li :key="index" v-for="(value,index) in preInf.skilCerts">{{value.content}}</li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PersonalResume",
  data() {
    return {
      curvisible: this.visible,
      skillword: [{}]
    };
  },
  props: {
    ifmVisible: {
      type: String,
      default: ""
    },
    preInf: {
      type: Object,
      default: {}
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible: {
      handler(newValue) {
        this.curvisible = newValue;
        // console.log(this.curvisible);
        console.log(this.preInf);
        debugger;
      }
    }
  },
  created() {
    // this.curvisible = this.visible;
    // console.log(this.curvisible);
    // debugger;
  },
  methods: {
    closeDrawer() {
      if (this.curvisible == false) {
        this.$emit("update:ifmVisible", "");
      }
      // console.log(this.curvisible);
      // debugger;
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  line-height: 2rem;

  .header {
    width: 100%;
    border-bottom: rgb(170, 196, 252) 1px solid;
    display: flex;

    span {
      display: inline-block;
      width: 7rem;
      padding: 6px;
      box-sizing: border-box;
      // height: 2rem;
      line-height: 1.2rem;
      background: rgb(146, 179, 250);
      border-radius: 3px;
      line-height: 1.2rem;
      font-size: 1.2rem;
      font-family: 黑体;
    }
  }
  .el-row {
    display: flex;
    justify-content: space-between;
    align-content: space-around;
    flex-wrap: wrap;
  }
  .el-col {
    // width: 13rem;
    font-weight: bold;
    // font-size: 16px;
    img {
      width: 110px;
      height: 140px;
    }
  }
  .program {
    span {
      display: block;
      margin: 0.25rem;
    }
    .programName {
      font-weight: bold;
      color: rgb(146, 179, 250);
    }
  }
  .circle {
    // border-top: rgb(184, 137, 51);
    // border-style: ridge;
    .boder {
      border-top: rgb(146, 179, 250) 1px dashed;
    }
    .skilCerts {
      list-style: none;
    }
  }
}
</style>