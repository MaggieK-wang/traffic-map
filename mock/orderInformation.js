import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

const data = Mock.mock({
  'items|50': [{
    //订单编码
    orderCode:'@string(10)',

    //商品编码
    skuCode:'@string(10)',

    //商品名称
    skuName:'@string(8)',

    //购买商品数量
    shopNum:'@natural(1,99)',

    //该商品总金额
    skuSmount:'@float(0,9999,0,2)',

    //售价
    salePrice:'@float(0,9999,0,2)',

    //定价
    costPrice:'@float(0,9999,0,2)',

    //图片路径 images


    //用户id
    id:'@string(0,20)',

    ////删除标记,0为未删除，1为已删除
    "isDelete|1": ['0','1'], 

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

export default [
  {
    url: '/vue-admin-template/order/listOrderDetails',
    type: 'get',
    response:(req,res)  => {
      var {pageNum=1,pageSize=10,userAccount,userName} = param2Obj(req.url);
      const items = data.items.filter(item=>{
        if(userAccount&&item.userAccount.indexOf(userAccount)<0) return false
        if(userName&&item.userName.indexOf(userName)<0) return false

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
  url: '/vue-admin-template/order/listOrderDetails',
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
