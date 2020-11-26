<template>
  <div class="app-container">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <!-- 商品名称 过滤首尾空格-->
      <el-input
        v-model="listQuery.skuName"
        placeholder="回车搜索商品名称"
        style="width:240px"
        @keyup.enter.native="hadleFilter"
      />

      <!-- 商品状态 可清空 -->
      <el-select v-model="listQuery.skuStatus" clearable placeholder="请选择商品状态" style="width:160px">
        <el-option
          :key="index+item"
          :label="item.text"
          :value="index"
          v-for="(item,index) in skuStatusMapper"
        />
      </el-select>

      <!-- 查询按钮 -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click=" hadleFilter">查询</el-button>
    </div>
    <!-- 搜索条件结束 -->
    <div class="opertator-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-s-promotion"
        @click="handleCreate"
      >添加商品</el-button>
    </div>
    <!-- table主体 具备如下：
      等待动画
      数据绑定
      等待提示
      边框
      列宽度自适应
      高亮当前行

    
    -->

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中。。。"
      border
      fit
      highlight-current-row
      style="width:100%"
    >
      <!-- 如果没有特殊要求，每条数据的id是不方便在前台展示的 -->
      <!-- label：列头显示的内容 min-width:最小宽度 -->
      <el-table-column align="center" label="#" width="64" type="index">
        <!-- <template slot-scope="scope">
          {{ scope.$index }}
        </template>-->
      </el-table-column>

      <el-table-column label="商品名称" min-width="160px">
        <template slot-scope="scope">
          <span @click="goodsInfo(scope.row)">{{ scope.row.skuName }}</span>
          <el-tag type="info" v-if="scope.row.IsDelete==='0'">{{scope.row.IsDelete|isDeleteFilter}}</el-tag>
        </template>
      </el-table-column>
      <!-- 定价-->
      <el-table-column label="定价(¥)" width="70" align="right">
        <!-- TODO:添加点击事件，点击后可以对比显示定价与售价 -->
        <template slot-scope="scope">
          <span>{{ scope.row.costPrice }}</span>
        </template>
      </el-table-column>
      <!-- 广告词 -->
      <el-table-column label="广告词" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.skuAd }}</template>
      </el-table-column>
      <!-- 商品介绍 -->
      <el-table-column label="商品介绍" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.skuIntroduction }}</template>
      </el-table-column>
      <!-- 商品状态 -->
      <el-table-column class-name="status-col" label="商品状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.skuStatus | skuStatusTypeFilter"
          >{{scope.row.skuStatus | skuStatusTextFilter}}</el-tag>
        </template>
      </el-table-column>
      <!-- 创建时间 -->
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{scope.row.createdTime|datetimeFilter}}</span>
        </template>
      </el-table-column>
      <!-- 创建人 -->
      <el-table-column align="center" prop="created_at" label="创建人" width="100">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time" /> -->
          <span>{{ scope.row.createdBy}}</span>
        </template>
      </el-table-column>
      <!-- 点击显示所有相关时间 -->
      <el-table-column align="left" prop="created_at" label="操作" min-width="220">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button size="mini" type="primary" effect="plain" @click="handleUpdate(scope.row)">编辑</el-button>
          <!-- 发布 -->

          <el-button
            v-if="scope.row.skuStatus=='2'"
            type="warning"
            size="mini"
            @click="changeStatus(scope.row,'0')"
          >发布</el-button>
          <!-- 下架 -->
          <el-button
            v-if="scope.row.skuStatus=='0'"
            type="info"
            size="mini"
            @click="changeStatus(scope.row,'1')"
          >下架</el-button>
          <!-- 上架 -->
          <el-button
            v-if="scope.row.skuStatus=='1'"
            type="danger"
            size="mini"
            @click="changeStatus(scope.row,'0')"
          >上架</el-button>
          <!-- 删除 -->
          <el-button
            v-if="scope.row.IsDelete!=='0'"
            type="success"
            size="mini"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          <!-- <i class="el-icon-time" /> -->
        </template>
      </el-table-column>
      <!-- 更新时间 -->
      <el-table-column align="center" prop="created_at" label="时间更新" width="100">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time" /> -->
          <span>{{ scope.row.updatedTime|datetimeFilter}}</span>
        </template>
      </el-table-column>
      <!-- 更新人 -->
      <el-table-column align="center" prop="created_at" label="更新人" width="100">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time" /> -->
          <span>{{ scope.row.updatedBy}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- table结束 -->
    <!-- 分页 -->
    <Pagination
      :limit.sync="listQuery.limit"
      :page.sync="listQuery.page"
      :total="total"
      @pagination="fetchData"
    />

    <!-- 添加/编辑商品弹窗 -->
    <div class="title">
      <el-dialog :title="addFormStatus=='create'?'新建商品':'编辑商品'" :visible.sync="addFormVisible">
        <!-- 商品添加表单 -->
        <el-form
          :model="goodsFormTemp"
          label-width="100px"
          :rules="rules"
          ref="goodsForm"
          label-position="right"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="商品名称"
                prop="skuName"
                v-model="goodsFormTemp.skuName"
                placeholder="请输入20个字符以内的名称"
              >
                <el-input v-model="goodsFormTemp.skuName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ISBN" prop="isbn" v-model="goodsFormTemp.isbn">
                <el-input v-model.number="goodsFormTemp.isbn" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品分类">
                <!--用级联惨淡显示商品类别层级  -->
                <el-cascader
                  v-model="cateCascader.value"
                  :options="cateCascader.options"
                  @change="handleCascaderChange"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="定价(￥)" prop="costPrice">
                <el-input v-model.number="goodsFormTemp.costPrice" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="售价(￥)" prop="salePrice">
                <el-input v-model.number="goodsFormTemp.salePrice" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="广告词" prop="skuAd">
            <el-input type="textarea" v-model="goodsFormTemp.skuAd" />
          </el-form-item>
          <el-form-item label="商品介绍" prop="skuIntroduction">
            <el-input type="textarea" v-model="goodsFormTemp.skuIntroduction" />
          </el-form-item>
          <el-row v-if="addFormStatus =='create'">
            <el-col>
              <el-form-item label="商品状态" prop="skuState">
                <el-radio-group v-model="goodsFormTemp.skuStatus">
                  <el-radio :label="0">在售(已发布)</el-radio>
                  <el-radio :label="2">未发布</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="addFormStatus =='update'">
            <el-col :span="12">            
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售量" prop="saleNum">
                <el-input v-model.number="goodsFormTemp.saleNum" placeholder="请输入销售量" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="商家编码">
                <!-- <el-input v-model="goodsFormTemp.businessCode" placeholder="默认商家" /> -->
                <el-select v-model="goodsFormTemp.businessName" @change="handleBusinessChange">
                  <el-option
                    :key="index"
                    :label="item.businessName"
                    :value="item.businessCode"
                    v-for="(item,index) in businessCodeMapper"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 库存 -->
              <el-form-item label="库存">
                <el-input v-model="goodsFormTemp.storeNum" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="12">
              <el-form-item label="创建人" prop="createdBy">
                <el-input v-model="goodsFormTemp.createdBy" />
              </el-form-item>
            </el-col>-->
          </el-row>
          <!-- <el-form-item label="创建时间" prop="createTime">
            <el-date-picker
              type="datetime"
              v-model="goodsFormTemp.createdTime"
              placeholder="选择创建时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>-->
          <!-- picture -->
          <el-form-item label="商品图片" prop="images">
            <el-upload
              ref="upload"
              action="http://106.14.165.150:8083/goods/uploadImage"
              list-type="picture-card"
              :on-preview="handPictureCardPreview"
              :on-remove="handleRemove"
              :limit="5"
              :on-success="onSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-dialog :visible.sync="dialogVisble">
            <img width="100%" :src=" dialogImageUrl" />
          </el-dialog>
          <!-- <el-form-item>
            <el-button type="primary" @click="onSumit">上传成功</el-button>
            <el-button @click="onCancel">上传失败</el-button>
          </el-form-item>-->
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addFormStatus == 'create' ? createData() : updateData()"
          >确定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 商品详情弹框 表单 -->
    <el-dialog title="商品详情" :visible.sync="goodsTableVisible" width="50%">
      <el-form :data="goodslist" fit border>
        <el-form-item label="商品名称" width="180">{{goodsFormTemp.skuName}}</el-form-item>
        <el-form-item label="价格(￥)" width="180">{{goodsFormTemp.costPrice}}</el-form-item>
        <el-form-item label="创建人">{{goodsFormTemp.createdBy}}</el-form-item>
        <el-form-item label="更新人">{{goodsFormTemp.updatedBy}}</el-form-item>
        <el-form-item label="创建时间" width="180">{{goodsFormTemp.createdTime}}</el-form-item>
        <el-form-item label="广告词" width="200">{{goodsFormTemp.skuAd}}</el-form-item>
        <el-form-item label="商品介绍">{{goodsFormTemp.skuIntroduction}}</el-form-item>
        <el-form-item label="商家编码">{{goodsFormTemp.businessCode}}</el-form-item>
        <el-form-item label="库存">{{goodsFormTemp.storeNum}}</el-form-item>
        <el-form-item label="图片">
          <img :src="goodsFormTemp.images[0]" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import {
  getList,
  updateGood,
  deleteGood,
  addGoods,
  getBusiness,
  updateSkuStatus
} from "@/api/goods";
import Pagination from "@/components/Pagination";
// import addOrEidtDialog from "./addOrEidtDialog";
// 商品类别接口
import { getCate } from "@/api/cate";
// import { Table } from "element-ui";
// import { Logger } from "runjs/lib/common";
var skuStatusMapper = [
  {
    text: "在售",
    tag: "success"
  },
  {
    text: "已下架",
    tag: "warning"
  },
  {
    text: "未发布",
    tag: "info"
  }
];
var businessCodeMapper = [];

export default {
  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    },
    // 商品状态样式
    // skuStatusFilterFilter(status) {
    //   var skuStatusMap = ["success", "warning", "danger"];
    //   return skuStatusMap[parseInt(status)];
    // },
    // 商品状态码表
    skuStatusTextFilter(status) {
      //var skuStatusMap = ["在售", "已下架", "未发布"];
      //return skuStatusMapper[parseInt(status)];
      return skuStatusMapper[parseInt(status)].text;
    },
    skuStatusTypeFilter(status) {
      return skuStatusMapper[parseInt(status)].tag;
    },

    codeFilter(code) {
      var codeMap = ["失败", "成功", "异常"];
      return codeMap[parseInt(code)];
    },

    isDeleteFilter(flag) {
      var IsDeMap = ["已删除", "正常"];
      parseInt(flag);
      return IsDeMap[flag];
    },
    //时间格式化
    datetimeFilter(datetime) {
      return moment(datetime).format("YYYY-MM-DD");
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      headers: {},
      currentRow: null,
      // 关于分页
      total: 20,
      // 查询条件
      listQuery: {
        page: 1,
        limit: 10,
        // 可增加搜索条件
        // skuName: undefind
        skuName: undefined,
        skuStatus: undefined
      },
      // 商品状态列表
      skuStatusMapper,

      // 添加弹窗的数据
      // 弹窗状态
      addFormStatus: "",
      // 控制可见性
      addFormVisible: false,
      goodsTableVisible: false,
      // 表单数据绑定
      goodsFormTemp: {
        skuName: "",
        isbn: "",
        frontCostPrice: "",
        frontSalePrice: "",
        "skuStatus|1": [],
        createdTime: null,
        createy: "",
        firstCateCode: null,
        secondCateCode: null,
        skuAd: null,
        skuIntroduction: null,
        businessCode: "",
        storeNum: 0,
        images: [],
        skuCode: ""
      },
      // 表单校验
      rules: {
        skuName: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur"
          },
          {
            max: 20,
            message: "输入商品名称过长",
            trigger: "blur"
          }
        ],
        isbn: [
          {
            required: true,
            message: "请输入isbn码",
            trigger: "blur"
          },
          {
            type: "number",
            message: "输入类型必须为数字",
            trigger: "blur"
          }
        ],
        storeNum: [
          {
            required: true,
            message: "请输入库存",
            trigger: "blur"
          },
          {
            type: "integer",
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        costPrice: [
          {
            required: true,
            message: "请输入定价",
            trigger: "blur"
          },
          {
            type: "number",
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        salePrice: [
          {
            required: true,
            message: "请输入售价",
            trigger: "blur"
          },
          {
            type: "number",
            message: "请输入正确的数字",
            trigger: "blur"
          }
        ],
        // visiteNum:[
        //   {
        //     required: true,
        //     message: "请输入浏览量",
        //     trigger: "blur"
        //   }
        // ],
        saleNum: [
          {
            required: true,
            message: "请输入销售量",
            trigger: "blur"
          }
        ],
        skuStatus: [
          {
            required: true,
            message: "请输入销售量",
            trigger: "blur"
          }
        ]
      },
      // 商品类别级联选择器
      cateCascader: {
        value: [],
        options: []
      },

      // 图片预览
      dialogImageUrl: "",
      dialogVisble: false,
      // 商家码表
      businessCodeMapper: [],
      goodslist: []
    };
  },

  created() {
    // 获取table数据
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then(response => {
        console.log(response);
        // debugger;
        this.list = response.data.list;
        this.total = response.data.total;

        this.listLoading = false;
      });
    },
    hadleFilter() {
      // alert(123);
      // 跳转到第一页
      // list.listQuery.page = 1;
      this.fetchData();
    },
    // 点击添加按钮
    handleCreate() {
      // 重置表单
      this.resetGoodsTemp();
      // 获取商品分类
      getCate().then(response => {
        // console.log(response.data);
        // debugger;
        var cateData = response.data;
        console.log("分类数据");
        console.log(cateData);
        // debugger;
        // 将类别数据进行格式化
        this.cateCascader.options = cateData.reduce((acc, cur) => {
          // 子节点只取到二级菜单，便于app端展示
          if (cur.childNodes != null) {
            var _children = [];
            cur.childNodes.forEach(item => {
              _children.push({
                label: item.attribute.cateName,
                value: item.attribute.cateCode
              });
            });
            acc.push({
              label: cur.attribute.cateName,
              value: cur.attribute.cateCode,
              children: _children
            });
          }
          return acc;
        }, []);
      });
      // 获取商家信息
      getBusiness().then(response => {
        console.log(response.data);
        this.businessCodeMapper = response.data;
      });

      // 弹出模态窗
      this.addFormStatus = "create";
      this.addFormVisible = true;
      (this.cateCascader = {
        value: [],
        options: []
      }),
        // 禁用表单校验
        this.$nextTick(() => {
          // 在弹窗加载之初，是不需要进行校验的
          // 找到form对象
          this.$refs.goodsForm.clearValidate();
          this.$refs["upload"].clearFiles();
        });
    },
    // 重置表单内容
    resetGoodsTemp() {
      this.goodsFormTemp = {
        skuName: "",
        isbn: null,
        costPrice: null,
        salePrice: null,
        "skuStatus|1": [],
        firstCateCode: null,
        secondCateCode: null,
        skuAd: null,
        skuIntroduction: null,
        businessCode: "",
        storeNum: 0,
        skuCode: "",
        pageNum: 0,
        skuStatusName: null,
        pageSize: 0,
        saleNum: 0,
        skuCode: null,
        salePrice: 0,
        images: []
      };
    },
    // 新增商品
    createData() {
      // debugger;

      this.$refs.goodsForm.validate(valid => {
        if (valid) {
          var goodsData = {
            ...this.goodsFormTemp,
            frontCostPrice: this.goodsFormTemp.costPrice,
            frontSalePrice: this.goodsFormTemp.salePrice
          };
          console.log(goodsData);
          debugger;
          //调用请求接口
          addGoods(goodsData).then(response => {
            //关闭弹窗
            this.addFormVisible = false;
            this.fetchData();
            // TODO:在联调时打开
            this.$emit("fetch");
            //提示信息
            this.$notify({
              title: "成功",
              message: response.msg,
              type: "success",
              duration: 4000
            });
          });
        }
        //如果验证不成功则不用任何操作
      });
    },
    // 编辑按钮
    handleUpdate(row) {
      // 获取商品分类
      getCate().then(response => {
        // console.log(response.data);
        // debugger;
        var cateData = response.data;
        console.log("分类数据");
        console.log(cateData);
        // debugger;
        // 将类别数据进行格式化
        this.cateCascader.options = cateData.reduce((acc, cur) => {
          // 子节点只取到二级菜单，便于app端展示
          if (cur.childNodes != null) {
            var _children = [];
            cur.childNodes.forEach(item => {
              _children.push({
                label: item.attribute.cateName,
                value: item.attribute.cateCode
              });
            });

            acc.push({
              label: cur.attribute.cateName,
              value: cur.attribute.cateCode,
              children: _children
            });
          }
          return acc;
        }, []);
      });
      // 获取商家信息
      getBusiness().then(response => {
        console.log(response.data);

        this.businessCodeMapper = response.data;
      });
      //赋值一份
      this.goodsFormTemp = Object.assign({}, row);
      //改变弹窗的状态
      this.addFormStatus = "update";
      this.addFormVisible = true;
      //取消校验
      this.$nextTick(() => {
        this.$refs.goodsForm.clearValidate();
      });
    },
    // 更新数据
    updateData(row) {
      this.$refs.goodsForm.validate(valid => {
        if (valid) {
          //复制一份
          var tempData = Object.assign({}, this.goodsFormTemp);
          // 请求接口

          updateGood(tempData).then(response => {
            //改变窗口状态
            this.addFormVisible = false;
            //提示信息
            this.$notify({
              title: "成功",
              message: "更新商品成功",
              type: "success",
              duration: 3000
            });
            this.fetchData();
          });
        }
      });
    },

    // 删除按钮
    handleDelete(row) {
      console.log(row);
      var _params = {
        skuCode: row.skuCode
        // loginAccount: loginAccount
      };
      // 调用删除接口
      deleteGood(_params).then(response => {
        // 成功
        // TODO:联调时删除
        // var _index = this.list.indexOf(row);
        // this.list.splice(_index, 1);
        this.fetchData();

        // 提示信息
        this.$notify({
          title: "删除成功",
          message: "删除成功",
          type: "success",
          // 等待时间
          duration: 4000
        });
      });
    },
    // 商品类别选择
    handleCascaderChange(value) {
      console.log(value);
      this.goodsFormTemp.firstCateCode = value[0];
      this.goodsFormTemp.secondCateCode = value[1] || undefined;
      // 进行数据绑定
    },
    handleBusinessChange(value) {
      this.goodsFormTemp.businessCode = value;
    },
    // 新增图片的预览
    handPictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisble = true;
    },
    // 图片删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 图片上传失败
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },
    // 上传成功
    onSumit() {
      // this.$message("submit!");
      // 进行判断 符合规则
      this.$refs.goodsFormTemp.validate(valid => {
        if (valid) {
          this.$message("创建成功");
        } else {
          console.log("上传失败");
          return false;
        }
      });
    },
    // 图片上传回调
    onSuccess(res) {
      console.log(res);
      // debugger;

      this.goodsFormTemp.images.push(res.data);
    }, // 修改商品状态

    changeStatus(row, state) {
      // 调用商品状态接口
      var _parmas = {
        skuCode: row.skuCode,
        status: state
        //         loginAccount:this.createBy
      };
      updateSkuStatus(_parmas).then(response => {
        this.fetchData();
        this.$notify({
          title: "成功",
          message: "修改状态成功",
          type: "success"
        });
      });
    },

    // 查看商品详情
    goodsInfo(row) {
      this.goodsFormTemp = Object.assign({}, row);
      this.goodsTableVisible = true;
    }
  }
};
</script>
<style lang="scss">
img {
  width: 140px;
  height: 170px;
}
.filter-container {
  // height: 100px;
  // border: solid 1px pink;
  padding: 10px 0 20px 0;
}
.filter-item {
  padding: 10px;
}
.opertator-container {
  margin: 0px 0 10px 0;
}
.el-input__inner {
  height: 33px;
  box-shadow: pink;
  border-radius: 10px;
  // border: pink;
}
.el-input__inner:hover {
  border-color: pink;
}
.el-form-item__label {
  color: pink;
  font: 800;
  font-family: 楷体;
}

.el-button--primary {
  background-color: pink;
  border: pink;
  border-radius: 10px;
}
.el-button--primary:hover {
  background-color: powderblue;
}
.el-dialog__title {
  color: pink;
}
</style>