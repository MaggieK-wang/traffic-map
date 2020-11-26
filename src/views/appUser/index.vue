<template>
  <div>
    <!--查询条件-->
    <div class="filter-container">
      <!--用户账号-->
      <el-input
        placeholder="用户账号"
        style="width:200px"
        v-model="listQuery.userAccount"
        @keyup.enter.native="handleFilter"
      />

      <!--用户名-->
      <el-input
        placeholder="用户名"
        style="width:200px"
        v-model="listQuery.userName"
        @keyup.enter.native="handleFilter"
      />
      <!--查询按钮-->
      <el-button @click="handleFilter()" type="primary" size="medium">查询</el-button>
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
      <el-table-column align="center" label="用户姓名" width="100px" prop="userName"></el-table-column>

      <!--用户性别-->
      <el-table-column align="center" label="性别" width="100px">
        <template slot-scope="scope">
          <el-tag type="info">{{scope.row.userSex | sexFilter}}</el-tag>
        </template>
      </el-table-column>

      <!--email-->
      <el-table-column align="left" label="邮箱" prop="email" width="220px"></el-table-column>

      <!--积分金额-->
      <el-table-column align="left" label="积分金额" prop="score" width="100px"></el-table-column>

      <!--创建人-->
      <el-table-column align="center" label="创建人" prop="createdBy" width="100px"></el-table-column>

      <!--创建时间-->
      <el-table-column align="center" label="创建时间" prop="createdTime" width="260px">
        <template slot-scope="scope">{{scope.row.createdTime | datetimeFilter}}</template>
      </el-table-column>

      <!--操作-->
      <el-table-column align="center" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
        <span>邮箱:</span>
        {{customer.email}}
      </p>
      <p>
        <span>身份证:</span>
        {{customer.password}}
      </p>
      <p>
        <span>用户密码:</span>
        {{customer.idCard}}
      </p>
      <p>
        <span>积分金额:</span>
        {{customer.frontScore}}
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
        {{customer.createdTime|datetimeFilter}}
      </p>
      <p>
        <span>更新时间:</span>
        {{customer.updatedTime|datetimeFilter}}
      </p>

      <div slot="footer">
        <el-button type="primary" @click="dialogVis = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getCustomerDetail, getDelete } from "@/api/appUser";
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
      return ["否"][parseInt(code)];
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
        userAccount: undefined,
        userName: undefined,
        pageNum: 1,
        pageSize: 10,
        //是否是pc端用户，此页面只用于展示app端
        isAdmin: "0"
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
        this.list = response.data.list;
        this.total = response.data.total;
        this.listQuery.pageNum = parseInt(response.data.pageNum);
        this.listQuery.pageSize = parseInt(response.data.pageSize);

        this.listLoading = false;
      });
    },
    //删除
    handleDelete(row) {
      getDelete(row.id).then(response => {
        this.fetchData(); // 提示信息
        this.$notify({
          title: "删除成功",
          message: "删除成功",
          type: "success", // 等待时间
          duration: 4000
        });
      });
    },
    //查询操作
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.fetchData();
    },

    handleDetail(row) {
      getCustomerDetail(row.id).then(response => {
        this.customer = response.data;
        this.dialogVis = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-container {
  padding: 10px;
}
.el-button--primary {
  background-color: pink;
  border: pink;
  border-radius: 10px;
}
.el-button--primary:hover {
  background-color: powderblue;
}
.el-input__inner {
  height: 33px;
  box-shadow: pink;
  border-radius: 10px;
}
.el-input__inner:hover {
  border-color: pink;
}
.el-form-item__label {
  color: pink;
  font: 800;
  font-family: 楷体;
}
.el-dialog__title {
  color: pink;
}
</style>