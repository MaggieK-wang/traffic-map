<template>
  <div>
    <!--搜索栏-->
    <div class="filter-container">
      <el-form :model="listQuery" ref label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="listQuery.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单编号">
              <el-input v-model="listQuery.orderCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单人电话">
              <el-input v-model="listQuery.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="订单状态">
              <el-select
                :clearable="true"
                placeholder="请选择"
                style="width:100%"
                v-model="listQuery.orderStatus"
              >
                <el-option
                  :key="index+item"
                  :label="item.text"
                  :value="index"
                  v-for="(item,index) in orderStatusMapper"
                />
              </el-select>
            </el-form-item>
          </el-col>

         
        </el-row>

        <el-row>
          <el-col :span="16">
            <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>

            <el-button icon="el-icon-refresh-left" @click="handleRest">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!--table-->
    <el-table
      :data="list"
      border
      element-Loading-text="数据加载中"
      stripe
      fit
      highligth-current-row
      style="wideth:100%"
      v-loading="listLoading"
    >
      <!--id-->
      <el-table-column align="center" label="id" type="index" width="60"></el-table-column>

      <!--订单编号-->
      <el-table-column align="center" label="订单编号" prop="orderCode" width="200px"></el-table-column>

      <!--下单人姓名-->
      <el-table-column align="center" label="姓名" prop="userName" width="100px"></el-table-column>

      <!--订单总价-->
      <el-table-column align="right" label="订单金额" prop="orderAmount" width="100"></el-table-column>

      <!-- 订单状态 -->
      <el-table-column label="订单状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.orderStatus | orderStatusTypeFilter"
          >{{ scope.row.orderStatus | orderStatusTextFilter}}</el-tag>
        </template>
      </el-table-column>

      <!--商家编码-->
      <el-table-column align="left" label="商家编码" prop="businessCode" width="120px"></el-table-column>

      <!--手机号-->
      <el-table-column align="left" label="订单人电话" prop="phone" width="140px"></el-table-column>

      <!--下单开始事件-->
      <el-table-column align="left" label="创建时间" prop="createdTime" width="200px">
        <template slot-scope="scope">
          <span>{{scope.row.createdTime | datetimeFilter}}</span>
        </template>
      </el-table-column>

      <!--下单结束时间-->
      <el-table-column align="left" label="结束时间" prop="updatedTime" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.updatedTime | datetimeFilter}}</span>
        </template>
      </el-table-column>

      <!--操作-->
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <Pagination
      :limit.sync="listQuery.pageSize"
      :page.sync="listQuery.pageNum"
      :total="total"
      @pagination="fetchData"
      v-show="total>0"
    />

    <!--详情弹窗-->

    <el-dialog title="订单详情" :visible.sync="dialogVis">
      <p>
        <span>订单编号:</span>
        {{customer.orderCode}}
      </p>
      <p>
        <span>商品编码:</span>
        {{customer.skuCode}}
      </p>
      <p>
        <span>商品名称:</span>
        {{customer.skuName}}
      </p>
      <p>
        <span>购买商品数量:</span>
        {{customer.shopNum}}
      </p>
      <p>
        <span>商品总金额:</span>
        {{customer.skuAmount}}
      </p>
      <p>
        <span>售价:</span>
        {{customer.salePrice}}
      </p>
      <p>
        <span>定价:</span>
        {{customer.costPrice}}
      </p>
      <p>
        <span>用户ID:</span>
        {{customer.id}}
      </p>
      <p>
        <span>是否删除:</span>
        {{customer.isDelete | isDelFilter}}
      </p>
      <p>
        <span>创建时间:</span>
        {{customer.createdTime | datetimeFilter}}
      </p>
      <p>
        <span>创建人:</span>
        {{customer.createdBy}}
      </p>
      <p>
        <span>结束时间:</span>
        {{customer.updatedTime | datetimeFilter}}
      </p>
      <p>
        <span>更新人:</span>
        {{customer.updatedBy}}
      </p>
      <p>
        <span>图片:</span>
        <img :src="customer.images[0]" alt="未显示" />
      </p>
      <div slot="footer">
        <el-button type="primary" @click="dialogVis = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getCustomerDetail } from "@/api/order";
// import { getCustomerDetail } from "@/api/orderInformation";
import moment from "moment";

//分页组件
import Pagination from "@/components/Pagination";
//订单状态码表
var orderStatusMapper = [
  {
    text: "已下单",
    tag: ""
  },
  {
    text: "已发货",
    tag: "success"
  },
  {
    text: "已完成未评价",
    tag: "warning"
  },
  {
    text: "已评价",
    tag: "info"
  },
  {
    text: "已取消",
    tag: "danger"
  }
];
export default {
  name: "order",
  components: {
    Pagination
  },
  filters: {
    orderStatusTextFilter(code) {
      return orderStatusMapper[parseInt(code)].text;
    },
    orderStatusTypeFilter(code) {
      return orderStatusMapper[parseInt(code)].tag;
    },
    isDelFilter(code) {
      return ["未删除", "已删除"][parseInt(code)];
    },

    //时间格式化
    datetimeFilter(datetime) {
      return moment(datetime).format("YYYY-MM-DD");
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 20,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        orderUserName: undefined,
        orderCode: undefined,
        orderStatus: undefined,
        phone: undefined
        // orderStartTime: undefined,
        // orderEndTime: undefined
      },
      orderStatusMapper: orderStatusMapper,
      //用户详情
      customer: {
        images: []
      },
      dialogVis: false
    };
  },

  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then(response => {
        // console.log(this.listQuery);
        // debugger;

        this.list = response.data.list;
        this.total = response.data.total;
        this.listQuery.pageNum = parseInt(response.data.pageNum);
        this.listQuery.pageSize = parseInt(response.data.pageSize);
        this.listLoading = false;
      });
    },
    //详情
    handleDetail(row) {
      getCustomerDetail(row.orderCode).then(response => {
        //this.customer = Object.assign(this.customer,row)
        for (var i = 0; i < response.data.length; i++) {
          // console.log("customer");
          debugger;
          console.log(this.customer);
          debugger;
          this.customer = response.data[i];
        }
        this.dialogVis = true;
      });
    },

    //查询按钮
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.fetchData();
    },

    // handleDetail(row) {
    //   getCustomerDetail(row.id).then(response => {
    //     this.customer = response.data;
    //     this.dialogVis = true;
    //   });
    // },

    //重置按钮
    handleRest() {
      this.listQuery = Object.assign(this.listQuery, {
        pageNum: 1,
        pageSize: 10,
        orderUserName: undefined,
        orderCode: undefined,
        orderStatus: undefined,
        phone: undefined,
        orderStartTime: undefined,
        orderEndTime: undefined
      });
      this.fetchData();
    }
  }
};
</script>

<style>
img {
  width: 140px;
  height: 170px;
}
.el-button {
  border-radius: 10px;
}
</style>