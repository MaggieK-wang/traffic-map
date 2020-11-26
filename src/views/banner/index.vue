<template>
  <div class="container">
    <!-- 筛选按钮 -->
    <div class="search-container">
      <el-radio-group @change="handleSwitchRadio" v-model="radioLable">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="已启用"></el-radio-button>
        <el-radio-button label="已禁用"></el-radio-button>
      </el-radio-group>
    </div>

    <!-- 图片墙 -->
    <!-- TODO: -->
    <el-upload
      action="http://106.14.165.150:8083/goods/uploadImage"
      list-type="picture-card"
      :file-list="list"
      :on-preview="handlePicPreview"
      :on-remove="handleRemove"
      :on-success="handleOnSuccess"
    >
      <!-- 添加按钮 -->
      <i slot="default" class="el-icon-plus"></i>
      <!-- 自定义样式 -->
      <div slot-scope="{file}" slot="file" style="width:100%">
        <el-card :body-style="{padding:'0px',height:'100%'}">
          <el-image
            :class="{'disable-img':(file.picStatus =='2')}"
            class="image"
            :src="file.url"
            fit="cover"
          />
          <div style="padding:14px">
            <span class="img-id">{{file.id}}</span>
            <div class="bottom clearfix">
              <time class="time">{{file.updatedTime | datetimeFilter}}</time>
              <span class="pic-status">{{file.picStatus | picStatusFilter}}</span>
            </div>
          </div>
        </el-card>
        <!-- 悬停菜单 -->
        <span class="el-upload-list__item-actions">
          <!-- 预览 -->
          <span @click="handlePicPreview(file)" class="el-upload-list__item-preview">
            <i class="el-icon-view"></i>
          </span>
          <!-- 启用 -->
          <span
            @click="handleUpdatePic(file,'1')"
            class="el-upload-list__item-preview"
            v-if="file.picStatus=='2'"
          >
            <i class="el-icon-video-play"></i>
          </span>

          <!-- 禁用 -->
          <span
            v-if="file.picStatus=='1'"
            @click="handleUpdatePic(file,'2')"
            class="el-upload-list__item-preview"
          >
            <i class="el-icon-video-pause"></i>
          </span>
          <!-- 删除 -->
          <span @click="handleUpdatePic(file)" class="el-upload-list__item-preview">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <el-image :src="dialogImageUrl" />
    </el-dialog>
  </div>
</template>

<script>
import { getList, addPic, updatePic } from "../../api/banner";
import moment from "moment";
// 图片索引
var picStatusMapper = [
  {
    key: "1",
    picStatusName: "已启用"
  },
  {
    key: "2",
    picStatusName: "已禁用"
  }
];
var picStatusTypeKeyValue = picStatusMapper.reduce((acc, cur) => {
  acc[cur.key] = cur.picStatusName;
  return acc;
}, {});
console.log(picStatusTypeKeyValue);

export default {
  name: "banner",
  filters: {
    //  日期过滤
    datetimeFilter(datetime) {
      //   期望的日期格式 20/5/20
      return moment(datetime).format("YY/MM/DD");
    },
    //图片状态过滤
    picStatusFilter(key) {
      return picStatusTypeKeyValue[parseInt(key)];
    }
  },
  data() {
    return {
      list: [],
      listQuery: {
        pageSize: 20,
        pageNum: 1
      },
      //图片预览
      dialogVisible: false,
      dialogImageUrl: "",
      //筛选按钮
      radioLable: "全部",
      picStatusTypeKeyValue: picStatusTypeKeyValue
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getList(this.listQuery).then(response => {
        console.log(response.data);
        debugger;
        //进行数据映射
        this.list = [];
        response.data.list.forEach(item => {
          this.list.push({
            id: item.id,
            name: item.id,
            url: item.picUrl,
            picStatus: item.picStatus,
            isDelete: item.isDelete,
            createdTime: item.createdTime,
            createdBy: item.createdBy,
            updatedTime: item.updatedTime,
            updatedBy: item.updatedBy
          });
        });
      });
    },
    //预览
    handlePicPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除
    handleRemove() {
      alert("handleRemove");
    },
    // 修改图片状态
    handleUpdatePic(file, stus) {
      var O_parma = {
        id: file.id
      };
      var o_parma = {
        id: file.id,
        picStatus: stus
      };

 
      var _index = this.list.indexOf(file);
      if (stus) {
        // 修改逻辑
        updatePic(o_parma).then(response => {
          
          // this.list[_index].picStatus = stus;
          // 提示成功
          this.$notify({
            title: "修改成功",
            message: "成功",
            type: "success"
          });
          this.fetchData();
        });
      } else {
        // 删除
        console.log(O_parma);
        debugger;
        updatePic(O_parma).then(response => {
          // this.list.splice(_index, 1);

          this.$notify({
            title: "删除成功",
            message: response.msg,
            type: "success"
          });
          this.fetchData();
        });
      }
    },

    //上传图片回调
    handleOnSuccess(response, file, fileList) {
      console.log(response.data);

      var _url = {
        picUrl: response.data
      };
      console.log(_url);
      debugger;

      // 调用新增图片接口
      addPic(_url).then(response => {
        this.$notify({
          title: "success",
          message: "上传成功",
          type: "success"
        });
        // TODO:联调时候使用
        this.fetchData();
      });
    },
    // 筛选
    handleSwitchRadio(label) {
      if (label == "全部") {
        this.listQuery.picStatus = undefined;
      }
      for (var key in this.picStatusTypeKeyValue) {
        if (picStatusTypeKeyValue[key] == label) {
          this.listQuery.picStatus = key;
        }
      }
      this.fetchData();
    }
  }
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}
.img-id {
  display: inline-block;
  font-size: 14px;
  line-height: 14px;
  width: 100% !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.pic-status {
  font-size: 12px;
  text-align: right;
}
.bottom {
  margin-top: 13px;
  /* 自己调 */
  /* line-height: 12px; */
}

.button {
  padding: 0;
  float: right;
}

.image {
  display: block;
  width: 100%;
}

.disable-img {
  filter: grayscale(100%);
  filter: gray;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>