<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <!-- 首页加分项
      统计数据上
      多少用户。。。。-->
      <div>
        <div>热门商品</div>
        <el-carousel :interval="4000" type="card" height="260px">
          <el-carousel-item v-for="item in bannerPic" :key="item">
            <img :src="item" class="imgbanner" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="curYear">{{curYear}}</div>
      <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="用户统计" name="first">
            <el-row>
              <el-col :span="8">
                <span>用户总人数:{{dashForm.customerNum}}</span>
              </el-col>
              <el-col :span="8">
                <div>男:</div>
                <el-progress type="circle" :percentage="100-dashForm.sexWomenRatio"></el-progress>
              </el-col>
              <el-col :span="8">
                <div>女:</div>
                <el-progress type="circle" :percentage="dashForm.sexWomenRatio"></el-progress>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="分类统计" name="second">
            <el-row>
              <el-col :span="10">
                <el-table :data="cateData" style="width: 100%">
                  <el-table-column prop="cateName" label="分类" width="180"></el-table-column>
                  <el-table-column prop="cateGoodsNum" label="分类商品数量" width="180"></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="12" style="margin-top:70px;">
                <el-progress
                  style="border-bottom: #fff solid 1px;"
                  :key="index"
                  v-for="(item,index) in cateData"
                  :text-inside="true"
                  :stroke-width="47"
                  :percentage="parseInt(((item.cateGoodsNum/total)*100).toFixed(2))"
                  status="success"
                ></el-progress>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="订单统计" name="fourth" v-if="flag">
            <div>已下单的订单:{{dashForm.orderNum}}</div>
            <el-progress
              :text-inside="true"
              :stroke-width="26"
              :percentage="parseInt(((dashForm.orderNum/(dashForm.orderNum+dashForm.orderFinishNum))*100).toFixed(2))"
            ></el-progress>
            <div>已完成的订单:{{dashForm.orderFinishNum}}</div>
            <el-progress
              :text-inside="true"
              :stroke-width="24"
              :percentage="100-parseInt(((dashForm.orderNum/(dashForm.orderNum+dashForm.orderFinishNum))*100).toFixed(2))"
              status="success"
            ></el-progress>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { getList } from "@/api/banner";
import { getDash } from "@/api/user";
export default {
  name: "Dashboard",
  data() {
    return {
      flag: false,
      bannerPic: [],
      userAccountNum: null,
      curYear: undefined,
      activeName: "first",
      cateData: [],
      total: 0,
      dashForm: {
        sexManRatio: 50,
        sexWomenRatio: 50,
        orderFinishNum: null,
        orderNum: null,
        cateName: [],
        cateGoodsNum: [],
        customerNum: null
      }
    };
  },
  created() {
    this.curYear = this.getCurYear();
    this.getbannerPic();
    this.getDashData();
  },
  methods: {
    getbannerPic() {
      var _params = {
        picStatus: "1",
        pageNum: "1",
        pageSize: "100"
      };
      getList(_params).then(response => {
        // console.log(response.data);
        // debugger
        response.data.list.forEach(url => {
          this.bannerPic.push(url.picUrl);
        });
      });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    getCurYear() {
      var now = new Date();
      return now.getFullYear();
    },
    getDashData() {
      getDash().then(response => {
        this.dashForm = response.data;
        console.log(this.dashForm);
        debugger;
        this.toPoint();
        this._cateData();
      });
    },
    //?????
    toPoint() {
      this.dashForm.sexManRatio = this.dashForm.sexManRatio.replace("%", "");
      this.dashForm.sexWomenRatio = this.dashForm.sexWomenRatio.replace(
        "%",
        ""
      );
      this.dashForm.sexManRatio = parseInt(this.dashForm.sexManRatio);
      this.dashForm.sexWomenRatio = parseInt(this.dashForm.sexWomenRatio);
    },
    _cateData() {
      this.dashForm.cateName.forEach((item, index) => {
        this.cateData.push({
          cateName: item,
          cateGoodsNum: this.dashForm.cateGoodsNum[index]
        });
      });
      this.total = this.dashForm.cateGoodsNum.reduce((acc, cur) => {
        return acc + cur;
      });
      // console.log(this.total);
      // debugger;
      this.flag = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.curYear {
  text-align: center;
  font-size: 2rem;
}
.imgbanner {
  height: 260px;
  width: 100%;
}
</style>

