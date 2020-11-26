import Mock from 'mockjs'
import { param2Obj } from '../src/utils'
import moment from 'moment'

const data = Mock.mock({
  'items|50': [{
    
    //下单人
    orderUserName:'@cname()',

    //订单编码
    orderCode:'@string(10)',

    //订单状态 0为已下单，1为已发货，2为已完成未评价，3为已完成已评价，4为已取消
    "orderStatus|1":['0','1','2','3','4'],

    //下单人手机号
    phone:'@string("number",11)',

    //下单开始时间
    orderStartTime:'@datetime()',

    //订单结束时间
    orderEndTime:'@datetime()',

    //当前页是第几页
    pageNum:'@natural(1,99)',

    //每页显示多少条
    pageSize:'@natural(1,50)',

    //总条数
    total:'@natural(1)',

    //下单人id
    orderUserId:'@id',

    //订单总价
    orderAmount:'@float(0,200,0,2)',

    //支付状态 0为未支付，1为已支付
    'payStstus|1':['0','1'],

    //商家编码
    businessCode:'@string(5)',

    //订单状态名称
    statusName:null,

    //id
    id: '@id',

    //删除标记,0为删除，1为未删除
    "IsDelete|1": ['0','1'], 

    //创建时间
    createdTime:'@datetime()',

    //创建人
    createdby:'@cname()',

    //更新时间
    updatedTime:'@now()',

    //更新人
    updatedby:'@cname()',
  }]
})
//订单状态码表
const orderStusMapper = ['已下单','已发货','已完成未评价','已完成已评价','已取消']
data.items.map(v=>v.statusName = orderStusMapper[v.orderStatus]);



export default [
  {
    url: '/vue-admin-template/customer/listOrders',
    type: 'post',
    response:(req,res)  => {
      var {
        pageNum=1,
        pageSize=10,
        orderUserName,
        orderCode,
        orderStatus,
        phone,
        orderStartTime,
        orderEndTime    
        } = param2Obj(req.url);

      const items = data.items.filter(item=>{
        if(orderUserName&&item.orderUserName.indexOf(orderUserName)<0) return false
        if(orderCode&&item.orderCode.indexOf(orderCode)<0) return false
        if(orderStatus&& +item.orderStatus !== +orderStatus) return false
        if(phone&&item.phone.indexOf(phone)<0) return false
        if(orderStartTime&&moment(orderStartTime) > moment(item.orderStartTime)) return false
        if(orderEndTime&&moment(orderEndTime) < moment(item.orderEndTime)) return false

        return true
      })
      //过滤页码
      var pageList = items.filter(
         (item,index) => index<pageSize * pageNum && index >= pageSize*(pageNum - 1)
      )
      return {
        code: 1,
        msg:'调用成功',
        success:true,
        data: {
          total: items.length,
          pageNum:pageNum,
          pageSize:pageSize,
          list: pageList
      }
    }
  }
},

{
  url: '/vue-admin-template/customer/findCustomerById',
  type: 'post',
  response:(req,res)  => {
    const items = data.items
    return{
      code: 1,
      msg:'调用成功',
      success:true,
      data:items[0],
  }
 }
}
]
