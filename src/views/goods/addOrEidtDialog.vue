<template>
  <div>
    <el-dialog
      :title="addFormStatus == 'create'?'新建商品':'编辑商品'"
      :visible.sync="visible"
      @close="closeDialog"
    >
      <!--商品添加表单-->
      <el-form :rules="rules" ref="goodsForm" label-width="100px" :model="goodsFormTemp">
        <el-row>
          <el-col :span="12">
            <el-form-item label="ISBN" prop="ISBN">
              <el-input v-model.number="goodsFormTemp.ISBN" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="商品名称" prop="skuName">
              <el-input v-model="goodsFormTemp.skuName" placeholder="20个字符以内" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="商品分类">
              <!--级联菜单显示商品层级-->
              <el-cascader
                v-model="cateCascader.value"
                :options="cateCascader.options"
                :props="cateCascader.props"
                @change="handleCateCascaderChange"
                style="width:100%"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="广告词">
              <el-input type="textarea" v-model="goodsFormTemp.skuAd" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="商品介绍">
              <el-input type="textarea" v-model="goodsFormTemp.skuIntroduction"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="商家编码">
              <el-select v-model="goodsFormTemp.businessCode" @change="handleBusinessChange">
                <el-option
                  :key="index+item.businessCode"
                  :label="item.businessName"
                  :value="item.businessCode"
                  v-for="(item,index) in businessCodeMapper"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库存" prop="storeNum">
              <el-input v-model.number="goodsFormTemp.storeNum" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="商品状态">
              <el-select
                :clearable="true"
                placeholder="请选择"
                style="width:100%"
                v-model="goodsFormTemp.skuStatus"
              >
                <el-option
                  :key="index+item"
                  :label="item"
                  :value="index"
                  v-for="(item,index) in skuStatusMapper"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="创建时间" prop="createdTime">
              <el-date-picker
                v-model="goodsFormTemp.createdTime"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建人" prop="createdby">
              <el-input v-model="goodsFormTemp.createdBy" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <!-- 定价 -->
            <el-form-item label="定价" prop="costPrice">
              <el-input v-model.number="goodsFormTemp.costPrice" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 售价 -->
            <el-form-item label="售价" prop="salePrice">
              <el-input v-model.number="goodsFormTemp.salePrice" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addFormStatus == 'update'">
          <el-col :span="12">
            <el-form-item label="浏览量" prop="visiteNum">
              <el-input v-model.number="goodsFormTemp.visiteNum" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="销售量" prop="saleNum">
              <el-input v-model.number="goodsFormTemp.saleNum" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="商品图片" prop="storeNum">
              <el-upload
                :file-list="fileList"
                action="/dev-api/vue-admin-template/goods/uploadImage"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :limit="5"
                :on-success="onSucccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <!--展示图片弹窗-->
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>

        <el-button type="primary" @click="addFormStatus == 'create'?createData():updateData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//商品类别接口
import { getCate } from "@/api/cate";

//商品接口
import { createGood, updateGood, getBusiness } from "@/api/goods";

//商品状态码表
var skuStatusMapper = ["在售", "已下架", "未发布"];

export default {
  name: "AddOrEidteDialog",
  filters: {
    //商品状态码表
    statusFilter(status) {
      return skuStatusMapper[parseInt(status)];
    }
  },
  data() {
    return {
      visible: this.addFormVisible,
      //表单校验
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
        costPrice: [
          {
            required: true,
            message: "请输入定价",
            trigger: "blur"
          },
          {
            type: "number",
            message: "必须为数字",
            trigger: "blur"
          }
        ],
        skuAd: [
          {
            max: 30,
            message: "输入广告词过长",
            trigger: "blur"
          }
        ],
        skuStatusName: [
          //TODO:商品状态校验
        ],
        createdby: [
          {
            required: true,
            message: "请输入创建人",
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
            message: "请输入正确数字",
            trigger: "blur"
          }
        ],
        visiteNum: [
          {
            required: true,
            message: "请输入浏览量",
            trigger: "blur"
          },
          {
            type: "integer",
            message: "请输入正确数字",
            trigger: "blur"
          }
        ],
        saleNum: [
          {
            required: true,
            message: "请输入销售量",
            trigger: "blur"
          },
          {
            type: "integer",
            message: "请输入正确数字",
            trigger: "blur"
          }
        ]
      },

      //表单数据绑定
      goodsFormTemp: {
        skuName: "",
        isbn: "",
        costPrice: "",
        salePrice: "",
        saleNum: 0,
        firstCateCode: "",
        secondCateCode: "",
        skuAd: "",
        skuIntroduction: "",
        skuStatus: "",
        visiteNum: 0,
        businessCode: "",
        storeNum: "",
        frontCostPrice: "",
        frontSalePrice: "",
        createdTime: "",
        createdby: "",
        images: [],
        //创建日期
        pickerOptions: {
          shortcuts: [
            {
              text: "今天",
              onClick(picker) {
                picker.$emit("pick", new Date());
              }
            },
            {
              text: "昨天",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              }
            },
            {
              text: "一周前",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              }
            }
          ]
        }
      },

      skuStatusMapper: skuStatusMapper,

      //商品类级别联选择器
      cateCascader: {
        value: [],
        options: [],
        props: {}
      },

      //商家信息码表
      businessCodeMapper: [],
      //用于展示图片
      fileList: [],
      //图片预览
      dialogImageUrl: "",
      dialogVisible: false
    };
  },

  props: {
    //弹窗可见性
    addFormVisible: {
      type: Boolean,
      default: false
    },
    //弹窗状态
    addFormStatus: {
      type: String,
      default: ""
    },
    //编辑时,父组件传递的数据
    updateGoods: {
      type: Object
    }
  },
  watch: {
    //父级改变时，用function接
    addFormVisible: function() {
      //切换可见性
      this.visible = this.addFormVisible;
      this.handleCreate();
      if (this.addFormStatus == "update") {
        //如果是更新的话,把数据绑定在表单上,获取的是接口中的详情
        this.goodsFormTemp = Object.assign({}, this.updateGoods);
        //图片数据映射
        this.fileList = this.goodsFormTemp.images.reduce((acc, cur, index) => {
          acc.push({
            name: index,
            url: cur
          });
          return acc;
        }, []);
        //取消校验
        this.$nextTick(() => this.$refs.goodsForm.clearValidate());
      }
    }
  },
  methods: {
    //关闭窗口
    closeDialog() {
      //向上传递可见性
      this.$emit("update:addFormVisible", false);
    },

    //加载时获取码表等信息
    handleCreate() {
      //重置表单
      this.resetGoodsTemp();
      //获取商品分类
      getCate().then(response => {
        var cateData = response.data;
        console.log("分类数据");
        console.log(cateData);
        debugger;
        //将类别数据进行的格式化
        this.cateCascader.options = cateData.reduce((acc, cur) => {
          //子节点只去到二级菜单，便于app端展示
          console.log(cur);
          debugger;
          var _children = [];
          cur.childNodes.forEach(item => {
            _children.push({
              label: item.attribute.cateName,
              value: item.attribute.cateCode
            });
          });

          acc.push({
            label: item.attribute.cateName,
            value: item.attribute.cateCode,
            children: _children
          });

          return acc;
        }, []);
      });

      //获取商家信息
      getBusiness().then(response => {
        this.businessCodeMapper = response.data;
      });

      //禁用表单校验
      this.$nextTick(() => {
        //在弹窗加载之初，是不需要进行校验的
        //找到form
        this.$refs.goodsForm.clearValidate();
      });
    },

    //重置表单内容
    resetGoodsTemp() {
      this.goodsFormTemp = {
        skuName: "",
        isbn: "",
        costPrice: "",
        salePrice: "",
        saleNum: "",
        firstCateCode: "",
        secondCateCode: "",
        skuAd: "",
        skuIntroduction: "",
        skuStatus: "",
        visiteNum: 0,
        businessCode: "",
        storeNum: "",
        frontCostPrice: "",
        frontSalePrice: "",
        images: []
      };
    },

    //商家选择
    handleBusinessChange(value) {
      this.goodsFormTemp.businessCode - value;
    },

    //商品类别选择
    handleCateCascaderChange(value) {
      //数据绑定
      this.goodsFormTemp.firstCateCode = value[0];
      this.goodsFormTemp.secondCateCode = value[1] || undefined;
    },

    //图片删除
    handleRemove(file) {},

    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //图片上传回调
    onSucccess(res) {
      this.goodsFormTemp.images.push(res.data);
    },

    //新增商品
    createData() {
      this.$refs.goodsForm.validate(valid => {
        if (valid) {
          var goodData = {
            ...this.goodsFormTemp,
            costPrice: this.goodsFormTemp.costPrice,
            salePrice: this.goodsFormTemp.salePrice,
            saleNum: "0",
            skuStatus: "0",
            visiteNum: "0"
          };
          //调用请求接口
          createGood(goodData).then(response => {
            //在前台手动模拟一条数据，浏览器刷新后小时
            //TODO:联调时删除, 调用父组件的方法，模拟新增
            this.$emit("fakeAddGoods", goodData);
            //this.list.unshift(this.goodsFormTemp);
            //关闭弹窗
            this.closeDialog();
            //TODO:在联调得时候打开
            //this.$emit('fetch')
            //提示信息
            this.$notify({
              title: "成功",
              message: response.msg,
              duration: 4000
            });
          });
        }
      });
    },

    //更新商品
    updateData(row) {
      this.$refs.goodsForm.validate(valid => {
        if (valid) {
          //复制一份
          var tempData = Object.assign(this.goodsFormTemp, {
            skuStatus: "0",
            costPrice: this.goodsFormTemp.frontCostPrice,
            salePrice: this.goodsFormTemp.frontCostPrice
          });
          //请求接口
          updateGood(tempData).then(response => {
            //在前台模拟数据修改，TODO:链条式删除,不考虑性能
            this.$emit("fakeUpdateGood", tempData);
            //关闭弹窗
            this.closeDialog();
            //TODO:联调时打开
            //this.$emit('fetch')
            //提示信息
            this.$notify({
              title: "成功",
              message: response.msg,
              type: "success"
            });
          });
        }
      });
    }
  }
};
</script>

<style>
</style>