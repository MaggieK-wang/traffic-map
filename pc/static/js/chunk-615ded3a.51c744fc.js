(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-615ded3a"],{"2f73":function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return u}));var a=n("db72"),i=n("b775"),r="http://106.14.165.150:8083",s=JSON.parse(sessionStorage.getItem("loginAccount"));function o(e){var t=Object(a["a"])({},e,{loginAccount:s});return console.log("pc端用户列表请求参数"),console.log(t),Object(i["a"])({url:r+"/customer/listCustomers",method:"post",data:t})}function l(e){var t=Object(a["a"])({},e,{id:e});return console.log("pc端用户详情请求参数"),console.log(t),Object(i["a"])({url:r+"/customer/findCustomerById",method:"get",params:t})}function u(e){var t=Object(a["a"])({},e,{id:e});return console.log("删除请求参数"),console.log(t),Object(i["a"])({url:r+"/customer/deleteCustomerById",method:"get",params:t})}},"333d":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",{attrs:{background:e.background,"current-page":e.currentPage,layout:e.layout,"page-size":e.pageSize,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},i=[],r=(n("c5f6"),{name:"Pagination",props:{hidden:{type:Boolean,default:!1},background:{type:Boolean,default:!0},total:{required:!0,type:Number},page:{type:Number},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total,sizes,prev,next,pager,jumper"}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e})},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize})}}}),s=r,o=(n("5c29"),n("2877")),l=Object(o["a"])(s,a,i,!1,null,null,null);t["a"]=l.exports},"46d8":function(e,t,n){},"5c29":function(e,t,n){"use strict";var a=n("90b0"),i=n.n(a);i.a},8278:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"filter-container"},[n("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"用户账号"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.userAccount,callback:function(t){e.$set(e.listQuery,"userAccount",t)},expression:"listQuery.userAccount"}}),e._v(" "),n("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"用户名"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.userName,callback:function(t){e.$set(e.listQuery,"userName",t)},expression:"listQuery.userName"}}),e._v(" "),n("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.handleFilter()}}},[e._v("查询")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{wideth:"100%"},attrs:{data:e.list,border:"","element-Loading-text":"数据加载中",stripe:"",fit:"","highligth-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"id",type:"index",width:"60"}}),e._v(" "),n("el-table-column",{attrs:{label:"用户账号",align:"center",type:"index",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.userAccount))]),e._v(" "),"1"===t.row.isDelete?n("el-tag",{attrs:{type:"info"}},[e._v(e._s(e._f("isDelFilter")(t.row.isDelete)))]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"用户姓名",width:"100px",prop:"userName"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"性别",width:"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tag",{attrs:{type:"info"}},[e._v(e._s(e._f("sexFilter")(t.row.userSex)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"left",label:"邮箱",prop:"email",width:"220px"}}),e._v(" "),n("el-table-column",{attrs:{align:"left",label:"积分金额",prop:"score",width:"100px"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"创建人",prop:"createdBy",width:"100px"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"创建时间",prop:"createdTime",width:"260px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("datetimeFilter")(t.row.createdTime)))]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.handleDetail(t.row)}}},[e._v("详情")]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),n("Pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{limit:e.listQuery.pageSize,page:e.listQuery.pageNum,total:e.total},on:{"update:limit":function(t){return e.$set(e.listQuery,"pageSize",t)},"update:page":function(t){return e.$set(e.listQuery,"pageNum",t)},pagination:e.fetchData}}),e._v(" "),n("el-dialog",{attrs:{title:"用户详情",visible:e.dialogVis},on:{"update:visible":function(t){e.dialogVis=t}}},[n("p",[n("span",[e._v("用户账号:")]),e._v("\n      "+e._s(e.customer.userAccount)+"\n    ")]),e._v(" "),n("p",[n("span",[e._v("用户名:")]),e._v("\n      "+e._s(e.customer.userName)+"\n    ")]),e._v(" "),n("p",[n("span",[e._v("性别:")]),e._v("\n      "+e._s(e._f("sexFilter")(e.customer.userSex))+"\n    ")]),e._v(" "),n("p",[n("span",[e._v("手机号:")]),e._v("\n      "+e._s(e.customer.phone)+"\n    ")]),e._v(" "),n("p",[n("span",[e._v("邮箱:")]),e._v("\n      "+e._s(e.customer.email)+"\n    ")]),e._v(" "),n("p",[n("span",[e._v("身份证:")]),e._v("\n      "+e._s(e.customer.password)+"\n    ")]),e._v(" "),n("p",[n("span",[e._v("用户密码:")]),e._v("\n      "+e._s(e.customer.idCard)+"\n    ")]),e._v(" "),n("p",[n("span",[e._v("积分金额:")]),e._v("\n      "+e._s(e.customer.frontScore)+"\n    ")]),e._v(" "),n("p",[n("span",[e._v("是否为管理员:")]),e._v("\n      "+e._s(e._f("adminFilter")(e.customer.isAdmin))+"\n    ")]),e._v(" "),n("p",[n("span",[e._v("用户id:")]),e._v("\n      "+e._s(e.customer.id)+"\n    ")]),e._v(" "),n("p",[n("span",[e._v("创建人:")]),e._v("\n      "+e._s(e.customer.createdBy)+"\n    ")]),e._v(" "),n("p",[n("span",[e._v("创建时间:")]),e._v("\n      "+e._s(e._f("datetimeFilter")(e.customer.createdTime))+"\n    ")]),e._v(" "),n("p",[n("span",[e._v("更新时间:")]),e._v("\n      "+e._s(e._f("datetimeFilter")(e.customer.updatedTime))+"\n    ")]),e._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVis=!1}}},[e._v("关闭")])],1)])],1)},i=[],r=n("2f73"),s=n("c1df"),o=n.n(s),l=n("333d"),u={name:"appUser",components:{Pagination:l["a"]},filters:{isDelFilter:function(e){return["未删除","已删除"][parseInt(e)]},sexFilter:function(e){return["女","男","未知"][parseInt(e)]},adminFilter:function(e){return["否"][parseInt(e)]},datetimeFilter:function(e){return o()(e).format("YYYY-MM-DD")}},data:function(){return{list:[],listLoading:!0,total:20,listQuery:{userAccount:void 0,userName:void 0,pageNum:1,pageSize:10,isAdmin:"0"},customer:{},dialogVis:!1}},created:function(){this.fetchData()},methods:{fetchData:function(){var e=this;this.listLoading=!0,Object(r["c"])(this.listQuery).then((function(t){e.list=t.data.list,e.total=t.data.total,e.listQuery.pageNum=parseInt(t.data.pageNum),e.listQuery.pageSize=parseInt(t.data.pageSize),e.listLoading=!1}))},handleDelete:function(e){var t=this;Object(r["b"])(e.id).then((function(e){t.fetchData(),t.$notify({title:"删除成功",message:"删除成功",type:"success",duration:4e3})}))},handleFilter:function(){this.listQuery.pageNum=1,this.fetchData()},handleDetail:function(e){var t=this;Object(r["a"])(e.id).then((function(e){t.customer=e.data,t.dialogVis=!0}))}}},c=u,p=(n("e11f"),n("2877")),d=Object(p["a"])(c,a,i,!1,null,"53e6b9c0",null);t["default"]=d.exports},"90b0":function(e,t,n){},aa77:function(e,t,n){var a=n("5ca1"),i=n("be13"),r=n("79e5"),s=n("fdef"),o="["+s+"]",l="​",u=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),p=function(e,t,n){var i={},o=r((function(){return!!s[e]()||l[e]()!=l})),u=i[e]=o?t(d):s[e];n&&(i[n]=u),a(a.P+a.F*o,"String",i)},d=p.trim=function(e,t){return e=String(i(e)),1&t&&(e=e.replace(u,"")),2&t&&(e=e.replace(c,"")),e};e.exports=p},c5f6:function(e,t,n){"use strict";var a=n("7726"),i=n("69a8"),r=n("2d95"),s=n("5dbc"),o=n("6a99"),l=n("79e5"),u=n("9093").f,c=n("11e9").f,p=n("86cc").f,d=n("aa77").trim,f="Number",g=a[f],m=g,_=g.prototype,v=r(n("2aeb")(_))==f,h="trim"in String.prototype,y=function(e){var t=o(e,!1);if("string"==typeof t&&t.length>2){t=h?t.trim():d(t,3);var n,a,i,r=t.charCodeAt(0);if(43===r||45===r){if(n=t.charCodeAt(2),88===n||120===n)return NaN}else if(48===r){switch(t.charCodeAt(1)){case 66:case 98:a=2,i=49;break;case 79:case 111:a=8,i=55;break;default:return+t}for(var s,l=t.slice(2),u=0,c=l.length;u<c;u++)if(s=l.charCodeAt(u),s<48||s>i)return NaN;return parseInt(l,a)}}return+t};if(!g(" 0o1")||!g("0b1")||g("+0x1")){g=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof g&&(v?l((function(){_.valueOf.call(n)})):r(n)!=f)?s(new m(y(t)),n,g):y(t)};for(var b,N=n("9e1e")?u(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;N.length>S;S++)i(m,b=N[S])&&!i(g,b)&&p(g,b,c(m,b));g.prototype=_,_.constructor=g,n("2aba")(a,f,g)}},e11f:function(e,t,n){"use strict";var a=n("46d8"),i=n.n(a);i.a},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);