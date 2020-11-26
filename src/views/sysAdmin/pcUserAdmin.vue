<template>
  <div>
    <!--查询条件-->
    <div class="filter-container">
      <!--用户账号-->
      <el-input
        placeholder="用户账号"
        style="width:200px"
        v-model="listQuery.userAccount"
        @keyup.enter.native="handleFilter()"
      />

      <!--用户名-->
      <el-input
        placeholder="用户名"
        style="width:200px"
        v-model="listQuery.userName"
        @keyup.enter.native="handleFilter()"
      />
      <!--查询按钮-->
      <el-button @click="handleFilter() " type="primary" icon="el-icon-search">查询</el-button>

      <el-button icon="el-icon-refresh-left" @click="handleRest">重置</el-button>
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

      <!--用户账号-->
      <el-table-column label="用户账号" align="center" type="index" width="220">
        <template slot-scope="scope">
          <span>{{scope.row.userAccount}}</span>
          <!--是否已经删除标记-->
          <el-tag type="info" v-if="scope.row.isDelete === '1'">{{scope.row.isDelete | isDelFilter}}</el-tag>
        </template>
      </el-table-column>

      <!--用户姓名-->
      <el-table-column align="center" label="用户姓名" width="100" prop="userName"></el-table-column>

      <!--用户性别-->
      <el-table-column align="center" label="性别" width="60">
        <template slot-scope="scope">
          <el-tag type="info">{{scope.row.userSex | sexFilter}}</el-tag>
        </template>
      </el-table-column>

      <!--email-->
      <el-table-column align="left" label="邮箱" prop="email"></el-table-column>

      <!--积分金额-->
      <el-table-column align="right" label="积分金额" prop="score" width="100px"></el-table-column>

      <!--创建人-->
      <el-table-column align="center" label="创建人" prop="createdBy"></el-table-column>

      <!--创建时间-->
      <el-table-column align="center" label="创建时间" prop="createdTime">
        <template slot-scope="scope">
          <span>{{scope.row.createdTime | datetimeFilter}}</span>
        </template>
      </el-table-column>

      <!--操作-->
      <el-table-column align="center" label="操作" width="220">
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
    <el-dialog title="用户详情" :visible.sync="dialogVis">
      <p>
        <span>用户账号:</span>
        {{customer.userAccount}}
      </p>
      <p>
        <span>用户名:</span>
        {{customer.userName}}
      </p>
      <p>
        <span>性别:</span>
        {{customer.userSex | sexFilter}}
      </p>
      <p>
        <span>手机号:</span>
        {{customer.phone}}
      </p>
      <p>
        <span>用户密码:</span>
        {{customer.password}}
      </p>
      <p>
        <span>用户积分:</span>
        {{customer.score}}
      </p>
      <p>
        <span>是否为管理员:</span>
        {{customer.isAdmin | adminFilter}}
      </p>
      <p>
        <span>用户id:</span>
        {{customer.id}}
      </p>
      <p>
        <span>创建人:</span>
        {{customer.createdBy}}
      </p>
      <p>
        <span>创建时间:</span>
        {{customer.createdTime | datetimeFilter}}
      </p>
      <p>
        <span>更新时间:</span>
        {{customer.updatedTime | datetimeFilter}}
      </p>
      <p>
        <span>更新人:</span>
        {{customer.updatedBy}}
      </p>
      <div slot="footer">
        <el-button type="primary" @click="dialogVis = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getCustomerDetail } from "@/api/appUser";
import moment from "moment";
//分页组件
import Pagination from "@/components/Pagination";
export default {
  name: "appUser",
  components: {
    Pagination
  },
  filters: {
    isDelFilter(code) {
      return ["未删除", "已删除"][parseInt(code)];
    },

    //性别过滤
    sexFilter(code) {
      return ["女", "男", "未知"][parseInt(code)];
    },

    adminFilter(code) {
      return ["否", "是"][parseInt(code)];
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
        //是否是pc端用户，此页面只用于展示app端
        isAdmin: "1"
      },
      //用户详情
      customer: {},
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
        console.log("用户详情响应信息");
        console.log(response);
        //debugger
        this.list = response.data.list;
        this.total = response.data.total;
        this.listQuery.pageNum = parseInt(response.data.pageNum);
        this.listQuery.pageSize = parseInt(response.data.pageSize);
        this.listLoading = false;
      });
    },
    //查询操作
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.fetchData();
    },

    handleDetail(row) {
      getCustomerDetail(row.id).then(response => {
        //console.log(row.id);
        this.customer = response.data;
        this.dialogVis = true;
      });
    },

    //重置按钮
    handleRest() {
      this.listQuery = Object.assign(this.listQuery, {
        pageNum: 1,
        pageSize: 10,
        id: undefined,
        userAccount: undefined,
        userName: undefined
      });
      //this.handleFilter();
      this.fetchData();
    }
  }
};
</script>

<style>
</style>