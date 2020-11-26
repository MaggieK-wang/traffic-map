<template>
  <div>
    <el-container>
      <el-header class="header">小组成员简历</el-header>
      <el-main>
        <el-row class="pic_row">
          <el-col
            :span="5"
            v-for="(item, index) in preInf"
            :key="index"
            :offset="index > 0 ? 2 : 0"
            @click.native="visibleChange(item.name)"
          >
            <el-card class="curCard">
              <div class="img">
                <img :src="item.picUrl" class="image" />
              </div>
              <div class="name">
                <span>{{item.name}}</span>
                <div class="instruction">{{item.selfAss}}</div>
              </div>
            </el-card>
            <PersonalResume
              :preInf="item"
              :visible="ifmVisible == item.name"
              :ifmVisible.sync="ifmVisible"
            />
            <img src alt />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import PersonalResume from "@/components/PersonalResume";
// import wzm1 from "./wzm1";
// import wzm from "@/assets/wzm.jpg";
import Maggie from "@/assets/Maggie.jpg";
import ht from "@/assets/ht.jpg";
import wcy from "@/assets/wcy.jpg";
import zzl from "@/assets/zzl.jpg";
import mgb from "@/assets/mgb.png";
import yzg from "@/assets/yzg.jpg";
import zpc from "@/assets/zpc.jpg";

export default {
  components: {
    PersonalResume
  },
  data() {
    return {
      ifmVisible: "",
      preInf: [
        // wzm
        {
          picUrl: Maggie,
          name: "王紫蔓MaggieK",
          national: "汉族",
          phone: "13679658711",
          email: "wangziiiman@163.com",
          address: "四川省眉山市",
          born: "10月20日",
          height: "165cm",
          political: "共产党员",
          school: "成都东软学院",
          record: "本科",
          position: "前端开发工程师",
          eduTime: "2017/07-2021/6",
          profession: "物联网工程",
          major:
            "C语言程序设计、Arduino单片机应用开发、操作系统、java程序设计、php程序设计、STM32单片机应用开发以及Zigbee单片机的应用开发、数据结构",
          campusExTime: "2020/02-2020/06",
          campusExObj: "数字工场",
          //  第一
          programEX: [
            {
              content:
                "定制化开发滚动级联组件，使页面获得可以媲美原生的滑动交互效果"
            },
            {
              content: "对axios组件进行封装，实现了同步数据请求"
            },
            {
              content: "未达到更好的交互效果对“商品分类”后端的数据进行重组"
            },
            {
              content: "为达到设计稿要求，使用原生flex布局完成所有样式开发"
            },
            {
              content: "根据功能需求独立开发轮播图组件，适用于3种业务场景模块。"
            }
          ],
          programName: "京东行走书店App端",
          programInfo:
            "京东网上书店用户端，包含用户购书、下单、结账、评价以及快递（二期）等全购物流程。前端使用vue独立开发完成，后端使用java由8人开发完成，周期1个月",

          // 第二
          programEX2: [
            {
              content:
                "在联调中使用管理手段，成功解决多个后端域名、接口混乱等问题，简化了沟通机制，确保项目周期不受影响"
            },
            {
              content: "使用并封装elementUI，简化了项目的样式编写工作"
            },
            {
              content:
                "使用vuex进行组件见的数据流转，提高组件的复用程度，减少了单独组件的bug"
            },
            {
              content:
                "使用多种方式持久化用户数据，减少了页面请求数量，提升了页面性能，并可做到向下兼容"
            },
            {
              content: "使用部分es6语法减少代码量，提升工作效率"
            }
          ],
          programName2: "京东行走书店PC端",
          programInfo2:
            "面相商家用户的管理系统，其中包括，商品、订单、用户、广告等多种管理模块。前端使用vue+elementUI进行构建，并集成moment、分页等组件独立完成开发及联调任务。",
          campusExContent: [
            {
              content: "全国英语四级(CET-4),MOS大师认证"
            },

            {
              content: "校三好学生,校优秀学生干部,优秀党员"
            }
          ],

          skilCerts: [
            {
              content:
                "专业技能：htm+css+js；Vue框架使用；理解web标准，有一定的开发经验；单片机应用开发，C语言"
            },
            {
              content:
                "软件技能：VScode，Photoshop, Dreamweaver, office, AxureRP"
            },
            {
              content: "办公技能:word，Excel，ppt等"
            }
          ],

          selfAss:
            "   个性开朗，善于管理时间，喜欢自律品质生活，有一定项目管理能力和团队沟通能力。较为优秀的组织策划能力，多次策划组织集体活动。喜欢互联网，且对一些互产品有独到见解，善于捕捉产品细节。"
        },
        // ht
        {
          picUrl: ht,
          name: "胡涛",
          national: "汉",
          phone: "17380121924",
          email: "510210365@qq.com",
          address: "四川省宜宾市叙州区南岸梦想和居小区",
          born: "2月17日",
          height: "173cm",
          political: "团员",
          school: "成都东软学院",
          record: "本科",
          position: "前端开发工程师",
          eduTime: "2016/07-2021/6",
          profession: "计算机科学与技术",

          major: "html5，php网站设计基础，c语言程序设计基础，Linux，操作系统",
          campusExTime: "",
          campusExObj: "数字工场",

          programEX: [
            {
              content:
                "app端购物车界面使用结算按钮，使购物车内商品以订单形式传递给我的订单页面"
            },
            {
              content: "为实现前端样式设置，前期开发使用mock数据进行调试"
            },
            {
              content:
                "app端订单页面，使用两次遍历的方法将商品以同订单号为一组的方式展现出来"
            },
            {
              content:
                "调用创建订单接口时，为了使传参与后台参数格式相同，用redece函数将请求参数进行数据改造，以list形式传入后台"
            }
          ],
          programName: "京东行走书店app端",
          programInfo:
            "行走书店用户端，由热门商品，商品分类，购物车，个人中心四个模块儿组成，每个模块儿有不同的购物流程功能，如查看商品详情，添加购物车，下单，等。前端使用vue开发完成，后端由8人使用java开发完成，开发时间为半个月，联调时间一周",
          programEX2: [
            {
              content: "使用el-ui组件，提高项目样式设计的效率"
            },
            {
              content:
                "系统用户管理模块儿，用空对象接收data，将用户详情展示出来"
            },
            {
              content:
                "使用刷新试图方法，让各模块儿搜索框不再出现无法输入信息的bug"
            },
            {
              content: "为实现前端样式设置，前期开发使用mock数据进行调试"
            }
          ],
          // 项目名称
          programName2: "行走书店管理员pc端",
          // 项目信息
          programInfo2:
            "行走书店管理员端，由pc端系统用户管理，app端用户管理，商品管理，商品分类管理，订单管理，轮播图管理模块儿组成。可在管理员端查看所有用户信息，商品信息，订单信息等。前端使用vue和el-ui完成，后端由8人使用java开发完成，开发时间为半个月，联调时间为一周",
          // 获得荣誉
          campusExContent: [
            {
              content: "2016新生军训优秀学员"
            }
          ],

          // 专业技能
          skilCerts: [
            {
              content:
                "html,css,javascript;c语言;mysql;能用vue实现简单样式制作；有一定开发经验"
            },
            {
              content: "会使用word，ppt，excel表格办公软件"
            },
            {
              content:
                "熟练使用vscode编译软件；会使用axureRP制作简单原型；接触过dream8，hbuilder等编译软件，"
            }
          ],
          // 自我评价
          selfAss:
            "担任过学院招生就业部干事一职，善于与人沟通交流，非常注重团队协作精神和团队荣誉感，有较强适应能力，能应对较高强度工作, 对前端有极大兴趣爱好，希望有一个平台学习或者实践前端知识，非常愿意花时间学习，钻研，深造前端相关内容"
        },

        // 张培超
        {
          picUrl: zpc,
          name: "张培超",
          national: "汉族",
          phone: "17828022615",
          email: "cherished106@163.com",
          address: "陕西汉中",
          born: "08月29日",
          height: "175cm",
          political: "",
          school: "成都东软学院",
          record: "本科",
          position: "前端开发工程师",
          eduTime: "2017/07-2021/6",
          profession: "软件工程",

          major:
            "c语言程序设计,计算机网络,计算机系统,python脚本开发,面向对象编程,数据库原理与应用,移动应用开发,数据结构等",
          campusExTime: "2017/07-2021/6",
          campusExObj: "数字工厂",
          //  第一
          programEX: [
            {
              content: "掌握flex布局的应用和开发"
            },
            {
              content: "独立完成购物车订单结算组件开发"
            },
            {
              content: "根据产品需求独立完成APP首页的轮播图开发"
            },
            {
              content: "客户端部分采用vant-ui简化样式开发"
            }
          ],
          // 项目名称
          programName: "京东行走书店APP端",
          programInfo:
            "客户端包含商品信息预览，添加购物车、账单结算、查看账单等模块，前端采用vue框架独立开发，后端采用spring boot框架由8人共同完成，项目周期为1个月。",
          //
          programEX2: [
            {
              content: "使用element-ui框架编写页面样式，提高开发效率。"
            },
            {
              content: "使用ES6语法，提升编程效率"
            },
            {
              content: "使用vueX进行组件间的数据传递。"
            },
            {
              content:
                "使用多种方式进行数据持久化处理，降低数据接口请求次数，提高产品性能"
            },
            {
              content: "独立完成分页组件封装复用，减少代码冗余，提高开发效率"
            }
          ],
          // 项目名称
          programName2: "京东网上书店PC端",
          // 项目信息
          programInfo2:
            "针对商家的用户管理系统，主要有用户管理，商品管理，订单等管理模块。前端采用vue + element-ui进行开发。",
          // 获得荣誉
          campusExContent: [
            {
              content: "Mos专家认证"
            }
          ],

          // 专业技能
          skilCerts: [
            {
              content:
                "HTML5 css js;Vue框架的使用,element-UI,vant-ui框架的使用,python"
            },
            {
              content: "VsCode,office,AxureRP,pycharm,idea"
            },
            {
              content: "word,Excel,ppt等"
            }
          ],
          // 自我评价
          selfAss:
            " 性格乐观,善于沟通,具有较为优秀的团队合作精神,具有一定的团队管理能力,喜欢尝试各种新的技术,善于独立思考。 "
        },
        // 殷治国
        {
          picUrl: yzg,
          name: "殷治国",
          national: "汉族",
          phone: "17761404539	",
          email: "yin_myemailn@163.com",
          address: "四川省广安市临溪镇1组",
          born: "10月15日",
          height: "172cm",
          political: "团员",
          school: "成都东软学院",
          record: "本科",
          position: "前端开发工程师",
          eduTime: "2017/07-2021/6",
          profession: "信息工程",

          major: "html,JS,CSS,Web,C语言基础,数据结构",
          campusExTime: "2017/07-2021/6",
          campusExObj: "数字工厂",

          programEX: [
            {
              content:
                "使用better-scroll插件封装轮播组件,让热门商品以轮播形式更直接的展示到用户眼前。"
            },
            {
              content:
                "实现商品分类对后端数据进行了数据重组计划了两种展现数据。"
            },
            {
              content:
                "在购物车界面使用结算、控制商品数量组件并实现了三界面的数据传递，使功能模块更加清晰。"
            },
            {
              content:
                "为实现app设计稿的模型,使用原始的flex布局完成所有样式的开发。"
            },
            {
              content:
                "为实现前后端共同开发,前期使用mock数据调试,与时跟进项目开发。"
            }
          ],
          programName: "京东行走书店App端",
          programInfo:
            "京东网上书店用户端,包含用户登录,添加购物车,结账,下单,充值等全购物流程,前端使用vue独立开发完成,后端使用Java由8人开发完成",
          programEX2: [
            {
              content: "使用了elementUI,简化了项目样式和提高了工作效率。"
            },
            {
              content: "使用Vue进行组件封装,减少代码的重复性,提高维护效率。"
            },
            {
              content: "使用router配置路由以及实现页面的跳转。"
            },
            {
              content: "使用axios实现了同步数据请求。"
            },
            {
              content:
                "在联调过程中自行查看swagger接口与参数传递减少了不必要的低级错误调试。"
            }
          ],

          programName2: "京东行走书店PC端",

          programInfo2:
            "面向商家用户的管理系统,其包括了商品、用户、分类、广告等多项管理模块,前端使用Vue-elementUI进行构建以及使用moment、分页插件实现更好的视觉体验",
          // 获得荣誉
          campusExContent: [
            {
              content: "MOS大师认证"
            }
          ],

          // 专业技能
          skilCerts: [
            {
              content:
                "专业技能：htm+css+js;Vue框架的使用,C语言,mysql,getHub,有一定的开发经验"
            },
            {
              content: "软件技能:VScode ,AxureRP,Xshell,eclipse,Hbuilder,Git"
            },
            {
              content: "办公技能:word,Excel,ppt等"
            }
          ],
          // 自我评价
          selfAss:
            "能专注的做一件事情,对遇到的问题能自行查看对应文档和查找解决方法,能有效提出问题和与队友进行融洽的沟通,有着团队意识和责任意识,能把控项目时间观念,喜欢适量的锻炼提高自己的精神面貌。"
        },

        // 陈俊宏
        {
          picUrl:
            "http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20181226/97d5877e0ac1445980e755225514efc5.jpeg",
          name: "陈俊宏",
          national: "汉族",
          phone: "17308106774",
          email: "2014174968@qq.com",
          address: "四川资阳",
          born: "1999/07/13",
          height: "177cm",
          political: "团员",
          school: "成都东软学院",
          record: "本科",
          eduTime: "2017/07-2021/6",
          profession: "物联网工程",
          major: "Java,PHP,C语言,数据库,数据结构",
          campusExTime: "2020/02-2020/06",
          campusExObj: "数字工场",
          campusJobs: "莫得",
          campusExContent: "LALAL",
          skilCert: "莫得",
          selfAss: "LALALALAALA"
        },

        // 梅国标
        {
          picUrl: mgb,

          name: "梅国标",
          national: "汉族",
          phone: "15183886451",
          email: "1316584746@qq.com",
          address: "四川省德阳什邡市",
          born: "07月07日",
          height: "178cm",
          political: "入党积极分子",
          school: "成都东软学院",
          record: "本科",
          position: "java开发工程师",
          eduTime: "2015/07-2021/6",
          profession: "信息工程",
          major: "java面向对象，数据结构，数据库,HTML5,javaWeb",
          campusExTime: "2017/07-2021/6",
          campusExObj: "数字工厂",
          //第一
          //一个content一点哈，填不满的就不填，
          programEX: [],
          //项目名称
          programName: "行走书店",
          programInfo: "书店订单处理、分类管理",
          //如果只有第一个经验就只填一个
          //第二个实践经验
          programEX2: [],
          //项目名称
          programName2: "XXXX考试系统",
          //项目信息
          programInfo2: "随机组卷,随机分发试卷模块",
          //获得荣誉
          campusExContent: [],
          //专业技能
          skilCerts: [
            {
              content: "java"
            },
            {
              content: "word、excel、ppt"
            }
          ],
          selfAss:
            "热爱IT行业，有一定的数学逻辑思维，具备做开发工程师的专业素质和修养，形象气质好,熟悉计算机有关的知识点;热爱计算机喜欢查阅国外人的编码还有他们的论坛,汲取知识;学习能力及应变能力强，具有良好的管理和团队合作能力，十分看重团队的协调"
        },
        // 魏春阳
        {
          picUrl: wcy,

          name: "魏春阳",
          national: "汉族",
          phone: "17621177413",
          email: "1343861570@qq.com",
          address: "上海市宝山区",
          born: "1998/02/27",
          height: "183cm",
          political: "团员",
          school: "成都东软学院",
          record: "本科",
          eduTime: "2017/07-2021/6",
          profession: "软件工程",
          major: "Java,web,C语言,数据库,数据结构",
          campusExTime: "2020/02-2020/06",
          campusExObj: "数字工场",
          campusJobs: "莫得",
          campusExContent: "bulabula",
          skilCert: "莫得",
          selfAss: "bulabulabula"
        },
        // 王欢
        {
          picUrl:
            "http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20181226/97d5877e0ac1445980e755225514efc5.jpeg",
          name: "王欢",
          national: "汉族",
          phone: "15882030084",
          email: "1464612500@qq.com",
          address: "四川省成都市双流区",
          born: "10月21日",
          height: "173cm",
          political: "共青团员",
          school: "成都东软学院",
          record: "本科",
          position: "java开发工程师",
          eduTime: "2017/09-2021/6",
          profession: "软件工程",
          major:
            "数据结构，计算机网络，操作系统，计算机组成原理，h5应用开发，安卓应用开发,C语言,java语言,面向对象分析与设计",
          campusExTime: "2020/03-2020/06",
          campusExObj: "数字工场",
          programEX: [
            {
              content: "基于springboot为主的项目开发"
            },
            {
              content: "基于mysql+redis的数据存储方式"
            },
            {
              content: "基于swagger页面的接口测试"
            },
            {
              content: "基于springMvc模式的项目开发"
            },
            {
              content: "基于高内聚，低耦合的设计原则"
            }
          ],
          //项目名称
          programName: "京东行走书店",
          programInfo: "",
          //获得荣誉
          campusExContent: [
            {
              content: "在2018年获得中国高校计算机大赛团体程序设计三等奖"
            },
            {
              content: "在2017-2018学年的小学期项目实训中获得系部三等奖"
            }
          ],
          //专业技能
          skilCerts: [
            {
              content: "了解JavaScript，Ajax，jQuery等前台开发技术"
            },
            {
              content: "熟悉office办公软件的操作"
            },
            {
              content: "熟悉Java编程，有良好的编码能力，熟悉面向对象编程"
            },
            {
              content: "熟悉mysql的基本操作，熟悉JavaWeb,JDBC,了解HTTP协议。"
            }
          ],
          //自我评价
          selfAss:
            "大学四年,勤奋务实,积极向上,诚信待人,有毅力,随和得性格,对u工作方面,对编程技术很感兴趣。同时团队合作精神,服务意识,较强得组织能力和较强得责任心"
        },
        // 周志林
        {
          picUrl: zzl,
          name: "周志林",
          national: "汉族",
          phone: "17743255424",
          email: "249632602@qq.com",
          address: "四川省内江市威远县",
          born: "2月10日",
          height: "178cm",
          political: "共青团员",
          school: "成都东软学院",
          record: "本科",
          position: "前端开发工程师",
          eduTime: "2017/07-2021/6",
          profession: "计算机科学与技术",
          major: "c++,mysql基础，数据结构，javase,linux",
          campusExTime: "2017/07-2021/6",
          campusExObj: "数字工厂",
          //第一
          //一个content一点哈，填不满的就不填，
          programEX: [],
          //项目名称
          programName: "",
          programInfo: "",
          //如果只有第一个经验就只填一个
          //第二个实践经验
          programEX2: [],
          //项目名称
          programName2: "书城管理系统",
          //项目信息
          programInfo2:
            "关于书城的登录,用户，购物车，下单，订单，菜单以及用户管理",
          //获得荣誉
          campusExContent: [],
          //专业技能
          skilCerts: [
            {
              content: "java程序开发"
            },
            {
              content: "word,excel,ppt"
            }
          ],
          //自我评价
          selfAss: "本人积极好学，乐观，有责任心，有强烈的团队精神"
        },
        // 钟传科
        {
          picUrl:
            "http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20181226/97d5877e0ac1445980e755225514efc5.jpeg",
          name: "钟传科",
          national: "汉族",
          phone: "18228085570",
          email: "2447413886@qq.com",
          address: "四川成都",
          born: "1998/10/15",
          height: "172cm",
          political: "党员",
          school: "成都东软学院",
          record: "本科",
          eduTime: "2017/07-2021/6",
          profession: "物联网工程",
          major: "Java,web,C语言,数据库,数据结构",
          campusExTime: "2020/02-2020/06",
          campusExObj: "数字工场",
          campusJobs: "莫得",
          campusExContent: "bulabula",
          skilCert:
            "熟悉针对stm32，ZigBee，NodeMCU，WiFiduion,Arduion开发板的项目开发,熟悉使用C,Java,C#，PHP，Python编程语言对项目进行开发,熟悉mysql，Redis数据库的使用",
          selfAss:
            "我有很强的适应力，动手能力，学习能力，责任感以及团队合作精神。个人生活方 面态度严谨,平时非常注意自己在人格方面的修养以及人与人之间的沟通与交流 .具备良 好的沟通、语言表达和协调能力，做事有原则，工作学习生活态度积极，能承受较大的工作 压力，有极强的团体协作精神和集体荣誉感"
        },
        // 吴凤岐
        {
          picUrl:
            "http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20181226/97d5877e0ac1445980e755225514efc5.jpeg",
          name: "吴凤岐",
          national: "汉族",
          phone: "14781764352",
          email: "2898985582@qq.com",
          address: "四川省南充市",
          born: "8月17日",
          height: "182cm",
          political: "无产阶级",
          school: "成都东软学院",
          record: "本科",
          position: "Java开发工程师",
          eduTime: "2017/07-2021/6",
          profession: "计算机科学与技术系物联网工程",
          major: "C程序设计语言,数据结构,操作系统,计算机网络,Java程序设计",
          campusExTime: "2017/07-2021/6",
          campusExObj: "数字工厂",
          //第一
          //一个content一点哈，填不满的就不填，
          programEX: [],
          //项目名称
          programName: "jd行走书店",
          programInfo: "spring微服务架构实现的电商系统",

          //如果只有第一个经验就只填一个
          //第二个实践经验
          programEX2: [],
          //项目名称
          programName2: "书城电商系统",
          //项目信息
          programInfo2:
            "关于书城的登录,用户，购物车，下单，订单，菜单以及用户管理",
          //获得荣誉
          campusExContent: [],
          //专业技能
          skilCerts: [
            {
              content: "Java程序开发"
            },
            {
              content: "linux,php,office三件套"
            }
          ],
          //自我评价
          selfAss:
            "本人积极好学，常泡在stackoverflow，富有责任心，有强烈的团队精神"
        },
        // 滕佳林
        {
          picUrl:
            "http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20181226/97d5877e0ac1445980e755225514efc5.jpeg",
          name: "滕佳林",
          national: "汉族",
          phone: "17340209284",
          email: "1821759918@qq.com",
          address: "天津市蓟州区",
          born: "10月13日",
          height: "182cm",
          political: "共产党员",
          school: "成都东软学院",
          record: "本科",
          position: "java开发工程师",
          eduTime: "2017/07-2021/6",
          profession: "软件工程",
          major: "java，数据结构，数据库",
          campusExTime: "2017/07-2021/6",
          campusExObj: "数字工厂",
          //第一
          //一个content一点哈，填不满的就不填，
          programEX: [],
          //项目名称
          programName: "行走书店",
          programInfo: "书店的购买、下单、分类管理",
          //如果只有第一个经验就只填一个
          //第二个实践经验
          programEX2: [],
          //项目名称
          programName2: "",
          //项目信息
          programInfo2: "",
          //获得荣誉
          campusExContent: [
            {
              content: "ACM大赛三等奖"
            },
            {
              content: "MOS认证"
            },
            {
              content: "移动APP创意大赛三等奖"
            }
          ],
          //专业技能
          skilCerts: [
            {
              content: "java"
            },
            {
              content: "word、excel、ppt"
            }
          ],
          //自我评价
          selfAss:
            "本人忠实诚信，讲原则，说到做到，决不推卸责任;有自制力;肯学习,有问题不逃避,愿意虚心向他人学习;会用100%的热情和精力投入到工作中;为人诚恳,性格开朗,积极进取,勤奋好学"
        }
      ]
    };
  },
  methods: {
    visibleChange(name) {
      this.ifmVisible = name;
      // console.log(this.ifmVisible);
      // debugger
    }
  }
};
</script>

<style>
.header {
  text-align: center;
  margin-top: 0.5rem;
  /* padding: 20px; */
}
.el-dialog__body {
  padding: 2px 20px;
  /* color: #606266; */
  /* font-size: 14px; */
  word-break: break-all;
}
.el-dialog__title {
  font-family: 黑体;
  font-size: 30px;
  color: rgb(146, 179, 250);
  /* border-right: rgb(170, 196, 252) 1.4px solid; */
  padding-right: 10px;
}
.pic_row {
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
  align-self: space-between;
  /* justify-content: space-around; */
  /* align-content: space-between; */
  flex-wrap: wrap;
}
.curCard:hover {
  margin-top: -0.5rem;
}
.el-col {
  margin: 16px;
}
.el-card {
  width: 80%;
  height: 100%;
  text-align: center;
  /* padding: 5px; */
}
.el-col-8 {
  width: 12rem;
  margin-right: 2rem;
  margin-bottom: 0.5rem;
}
.name {
  margin-top: 0.8rem;
  /* margin: auto; */
}
.img {
  width: 60%;
  height: 60%;
  margin: auto;
}
.image {
  width: 100%;
  height: 100%;
  display: block;
}
.instruction {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  /* overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap; */
}
</style>