<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="handleAdd" size="mini">添加</el-button>
        <el-button @click="handleDelete" size="mini">删除</el-button>
        <el-button @click="resetChecked" size="mini">清空</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-tree
          :data="cateData"
          show-checkbox
          default-expand-all
          node-key="nodeId"
          ref="tree"
          highligeht-current
          :props="defaultProps"
          @node-click="handleNodeClick"
          check-strictly
        ></el-tree>
      </el-col>
      <el-col :span="16">
        <el-card>
          <div slot="header">
            <span>商品类别</span>
            <el-button type="text" style="float:right; padding:3px 0;" @click="edit">编辑</el-button>
          </div>
          <div>
            <!-- 表单内容 -->
            <el-form ref="form" :model="form" label-width="120px" :rules="formRules">
              <!-- 节点名称 -->
              <el-form-item required label="分类名称" prop="cateName">
                <el-input v-model="form.cateName" :disabled="formStus == 'info'"></el-input>
              </el-form-item>
              <!-- 分类编码 -->
              <el-form-item required label="分类编码">
                <el-input v-model="form.cateCode" :disabled="formStus == 'info'"></el-input>
              </el-form-item>
              <!-- 备注 -->
              <el-form-item label="备注">
                <el-input v-model="form.remark" :disabled="formStus == 'info'"></el-input>
              </el-form-item>
              <!-- 父级分类编码 -->
              <el-form-item required label="父级分类编码">
                <el-input v-model="form.parentCateCode" :disabled="formStus == 'info'"></el-input>
              </el-form-item>
              <!-- 分类id -->
              <el-form-item required label="分类id">
                <el-input v-model="form.id" :disabled="formStus == 'info'"></el-input>
              </el-form-item>
              <!-- 当前登录账户 -->
              <el-form-item required label="当前登录账户">
                <el-input v-model="form.loginAccount" :disabled="formStus == 'info'"></el-input>
              </el-form-item>
              <!-- 创建时间 -->
              <el-form-item required label="创建时间">
                <el-input v-model="form.createdTime" :disabled="formStus == 'info'"></el-input>
              </el-form-item>
              <!-- 创建人 -->
              <el-form-item required label="创建人">
                <el-input v-model="form.createdBy" :disabled="formStus == 'info'"></el-input>
              </el-form-item>
              <!-- 更新时间 -->
              <el-form-item required label="更新时间">
                <el-input v-model="form.updatedTime" :disabled="formStus == 'info'"></el-input>
              </el-form-item>
              <!-- 更新人 -->
              <el-form-item required label="更新人">
                <el-input v-model="form.updatedBy" :disabled="formStus == 'info'"></el-input>
              </el-form-item>
              <!--  -->
              <el-form-item v-if="formStus == 'edit'">
                <el-button @click="submit" type="primary">提交</el-button>
                <el-button @click="formStus = 'info'">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="buttons">
      <!-- <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <el-button @click="setCheckedKeys">通过 key 设置</el-button>
      <el-button @click="resetChecked">清空</el-button>-->
    </div>
    <!-- 弹窗 -->
    <el-dialog title="添加节点" :visible.sync="dialogFormVisible">
      <el-form :model="addFrom" label-width="80">
        <el-form-item label="类别名称">
          <el-input v-model="addFrom.cateName" />
        </el-form-item>
        <el-form-item label="父级节点编码" v-show="addFrom.parentCateCode">
          <el-input v-model="addFrom.parentCateCode" />
        </el-form-item>
        <el-form-item label="节点编码">
          <el-input v-model="addFrom.cateCode" />
        </el-form-item>
        <!-- <el-form-item label="分类级别">
          <el-select v-model="addFrom.frontCateCode">
            <el-option label="一级" value="1"></el-option>
            <el-option label="二级" value="2"></el-option>
            <el-option label="其他" value="999"></el-option>
          </el-select>
          <span>三级一下请选择其他</span>
        </el-form-item>-->
        <el-form-item label="备注">
          <el-input type="textarea" :row="2" placeholder="请输入内容" v-model="addFrom.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createCate">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCate,
  addCate,
  findCateByCode,
  updateCate,
  deleteCate
} from "@/api/cate";
var cateId = 1926;
var loginAccount = JSON.parse(sessionStorage.getItem("loginAccount"));
export default {
  name: "category",
  data() {
    return {
      loginAccount: loginAccount,
      defaultProps: {
        children: "childNodes",
        label: data => data.attribute.cateName
      },
      cateData: [],
      form: {},
      formRules: {
        cateName: {
          required: true,
          message: "请输入节点名称",
          trigger: "blur"
        }
      },
      //表单状态 info edit
      formStus: "info",
      //添加表单
      dialogFormVisible: false,
      addFrom: {
        cateName: "",
        cateCode: "",
        remark: "",
        parentCateCode: "",
        frontCateCode: null,
        loginAccount: undefined
        // level: ""
      }
    };
  },

  created() {
    this.fencthData();
  },
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: "二级 2-1"
        },
        {
          id: 9,
          label: "三级 1-1-1"
        }
      ]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    fencthData() {
      getCate().then(response => {
        // console.log(response);
        this.cateData = response.data;
      });
    },
    //节点点击事件
    handleNodeClick(nodeData) {
      // console.log(nodeData);
      // debugger
      var _param = {
        cateCode: nodeData.attribute.cateCode
      };
      //调用查询接口
      //TODO：联调打开
      findCateByCode(_param).then(response => {
        // console.log(response.data);
        // debugger;
        //重置表单状态
        this.formStus = "info";
        //拷贝对象
        var temp = Object.assign(
          { loginAccount: this.loginAccount },
          response.data
        );
        this.form = temp;
        this.form.loginAccount = this.loginAccount;
        console.log(this.form);
        debugger;
      });
      //TODO：联调删除
      //复制一份
      // var temp = Object.assign({}, nodeData);
      //赋值
      // this.form = temp.attribute;
    },
    //编辑按钮
    edit() {
      this.formStus = "edit";
    },
    //更新数据
    submit() {
      this.$refs.form.validate(valid => {
        // console.log(this.form);
        // debugger
        var _parmas = {
          cateCode: this.form.cateCode,
          loginAccount: this.form.loginAccount,
          remark: this.form.remark,
          cateName: this.form.cateName,
          parentCateCode: this.form.parentCateCode
        };
        if (valid) {
          //TODO：调用更新接口
          updateCate(_parmas).then(response => {
            this.$notify({
              title: "成功",
              message: response.msg,
              type: "success"
            });
            //改变表单状态
            this.formStus = "info";
            this.fencthData();
          });
        } else {
          console.log("提交失败");
          return false;
        }
      });
    },
    //添加
    createCate() {
      //调取新增接口

      // console.log(this.addFrom);
      // debugger
      addCate(this.addFrom).then(response => {
        this.$notify({
          title: "成功",
          message: "新增节点成功",
          type: "success"
        });
        this.dialogFormVisible = false;
        //清空数据绑定
        this.addFrom = {
          cateName: "",
          parentCateCode: "",
          remark: "",
          frontCateCode: ""
        };
        this.fencthData();
      });
      var currNode = this.$refs.tree.getCheckedNodes();
      var newChild = {
        nodeId: cateId++,
        nodeName: "新节点",
        attribute: {
          cateName: "新节点"
        },
        childNodes: []
      };
    },
    //点击添加类别按钮
    handleAdd() {
      //获取点击节点
      var _currNode = this.$refs.tree.getCheckedNodes();
      //选择多个节点
      if (_currNode.length > 1) {
        this.$message.error("您选择的节点大于一个，重新选择");
        return;
      }
      //TODO:添加一级节点只能传空
      if (_currNode.length === 0) {
        //添加一级节点
        this.addFrom.frontCateCode = this.addFrom.cateCode;
        this.addFrom.parentCateCode = "";
      } else {
        this.addFrom.parentCateCode = this.$refs.tree.getCheckedNodes()[0].attribute.cateCode;
        this.addFrom.frontCateCode = this.$refs.tree.getCheckedNodes()[0].attribute.cateCode;
      }
      this.addFrom.loginAccount = this.loginAccount;
      //没选择节点展开弹窗
      this.dialogFormVisible = true;
    },
    handleDelete() {
      //获取当前节点
      var _currNode = this.$refs.tree.getCheckedNodes();
      if (_currNode.length !== 1) {
        this.$message.error("请选择且只能选择一个节点");
        return;
      }
      var _param = {
        cateCode: _currNode[0].attribute.cateCode
      };
      // console.log(_param);
      // debugger
      //调用删除接口
      // if ((deleteCate.code = 1))s
      deleteCate(_param).then(response => {
        this.$notify({
          title: "成功",
          message: response.msg,
          type: "success"
        });
        this.fencthData();
      });
    }
  }
};
</script>
