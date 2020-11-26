import request from '@/utils/request'
//模块儿的项目名称
var siteName = 'http://106.14.165.150:8083'
var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
    //订单列表
export function getList(params) {
    var _data = {
        ...params,
        loginAccount: loginAccount,
    }
    console.log('订单列表请求参数');
    console.log(_data);
    //debugger
    return request({
        url: siteName + '/order/listOrder',
        method: 'post',
        data: _data
    })
}

//获取用户详情
export function getCustomerDetail(params) {
    var _data = {
        orderCode: params
    }
    console.log('订单详情请求参数');
    console.log(_data);
    //debugger
    return request({
        url: siteName + '/order/findOrderDetailByOrderCode',
        method: 'get',
        params: _data
    })
}