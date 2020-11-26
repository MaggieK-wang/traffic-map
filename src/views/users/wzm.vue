<template>
  <div class="container">
    <div class="rusume">
      <div class="left">
        <div class="photo">
          <img src="./photo.jpg" alt />
          <div class="logo">
            王紫蔓
            <span>前端开发工程师--个人简历</span>
          </div>
          <div class="exp">
            <h3>教育经历</h3>
            <ul>
              <li>东软信息技术学院</li>
              <li>信息工程</li>
              <li>2016-至今</li>
            </ul>
          </div>
        </div>
        <div class="edu">
          <h3>获得荣誉</h3>
          <ul>
            <li>学校2019年度三好学生</li>
            <li>全国英语4级(CET-4)</li>
            <li>校优秀学生干部</li>
            <li>MOS大师认证</li>
            <li>优秀党员</li>
          </ul>
        </div>
      </div>
      <div class="right">
        <h3>个人简介</h3>
        <p>个性开朗，善于管理时间，喜欢自律品质生活，有一定项目管理能力和团队沟通能力。较为优秀的组织策划能力，多次策划组织集体活动。喜欢互联网，且对一些互产品有独到见解，善于捕捉产品细节。</p>
        <div class="contact">
          <div class="col">
            <span class="iconfont iconaddr"></span>
            辽宁省沈阳市胡同二踢脚
          </div>
          <div class="col">
            <span class="iconfont iconmail"></span>
            bruce870827@gmail.com
          </div>
          <div class="col">
            <span class="iconfont icongithub"></span>
            https://bruce827.github.io/portfolio
          </div>
          <div class="col">
            <span class="iconfont iconphone"></span>
            19200123356
          </div>
          <div class="col">
            <span class="iconfont iconminzuyixue"></span>
            汉族
          </div>
        </div>
        <div class="project">
          <h3>项目经验</h3>
          <div class="item">
            <p class="name">京东行走书店APP用户端</p>
            <p>京东网上书店用户端，包含用户购书、下单、结账、评价以及快递（二期）等全购物流程。前端使用vue独立开发完成，后端使用java由8人开发完成，周期1个月。</p>
            <p class="mark">项目成绩</p>
            <ol>
              <li>定制化开发滚动级联组件，使页面获得可以媲美原生的滑动交互效果。</li>
              <li>对axios组件进行封装，实现了同步数据请求。</li>
              <li>未达到更好的交互效果对“商品分类”后端的数据进行重组。</li>
              <li>为达到设计稿要求，使用原生flex布局完成所有样式开发。</li>
              <li>根据功能需求独立开发轮播图组件，适用于3种业务场景模块。</li>
            </ol>
          </div>
          <div class="item">
            <p class="name">京东行走书店PC客户端</p>
            <p>面相商家用户的管理系统，其中包括，商品、订单、用户、广告等多种管理模块。前端使用vue+elementUI进行构建，并集成moment、分页等组件独立完成开发及联调任务。</p>
            <p class="mark">项目成绩</p>
            <ol>
              <li>在联调中使用管理手段，成功解决多个后端域名、接口混乱等问题，简化了沟通机制，确保项目周期不受影响。</li>
              <li>使用并封装elementUI，简化了项目的样式编写工作。</li>
              <li>使用多种方式持久化用户数据，减少了页面请求数量，提升了页面性能，并可做到向下兼容。</li>
              <li>使用vuex进行组件见的数据流转，提高组件的复用程度，减少了单独组件的bug</li>
              <li>使用部分es6语法减少代码量，提升工作效率。</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wzm"
};
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_1795192_lf33j3oiczr.css");
.container {
  line-height: 24px;
  width: 100%;
  .rusume {
    border: 1px rgb(245, 211, 158) solid;
    padding: 10px;
    margin: 0 auto;
    width: 80%;
    max-width: 1080px;
    display: flex;
    .left {
      width: 400px;
      .photo {
        // border: steelblue 1px solid;
        position: relative;
        width: 100%;
        height: 600px;
        img {
          width: 400px;
        }
        .logo {
          padding-left: 40px;
          position: absolute;
          bottom: 160px;
          left: 0;
          width: 120%;
          height: 80px;
          background: rgba($color: rgb(236, 192, 69), $alpha: 0.8);
          color: #ffffff;
          display: flex;
          align-items: center;
          // justify-content: center;
          font-size: 40px;
          span {
            margin-left: 20px;
            font-size: 24px;
          }
        }
        .exp {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba($color: #787776, $alpha: 0.6);
          color: #ffffff;
          text-align: center;
          padding: 0 20px;
          height: 160px;
          ul {
            margin: 0;
            padding: 0;
            margin-bottom: 10px;
            list-style-type: none;
          }
        }
      }
      .edu {
        text-align: center;
        padding-left: 20px;
        ul {
          margin: 0;
          padding: 0;
          margin-bottom: 10px;
          list-style-type: none;
        }
      }
    }
    .right {
      flex: 1;
      margin-left: 80px;
      padding: right 10px;
      .contact {
        border-top: solid 1px black;
        padding: 10px;
        .col {
          border-bottom: 1px solid #7c7c7c;
          height: 28px;
          line-height: 28px;
          span {
            margin-right: 20px;
          }
        }
      }
      .project {
        .item {
          margin-bottom: 20px;
          ol {
            margin: 0 10px;
            // padding: 0;
          }
        }
        .name {
          font-size: 18px;
          font-weight: bolder;
        }
        .mark {
          margin: 0;
          padding: 0;
          font-size: 16px;
        }
      }
    }
  }
}
</style>