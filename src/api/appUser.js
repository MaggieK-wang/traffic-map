import request from "@/utils/request";
//模块儿的项目名称
var siteName = 'http://106.14.165.150:8083'
var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
    //app用户列表
export function getList(params) {
    var _data = {
        ...params,
        loginAccount: loginAccount,
    }
    console.log('pc端用户列表请求参数');
    console.log(_data);
    //debugger
    return request({
        url: siteName + '/customer/listCustomers',
        method: 'post',
        data: _data
    })
}

//获取用户详情
export function getCustomerDetail(params) {
    var _data = {
        ...params,
        id: params,
    }
    console.log("pc端用户详情请求参数");
    console.log(_data);
    debugger
    return request({
        url: siteName + '/customer/findCustomerById',
        method: 'get',
        params: _data
    })
}
//删除
export  function  getDelete(params)  {  
    var  _data  =   {    ...params,     id: params,    }  
    console.log('删除请求参数');  
    console.log(_data);   //debugger
      
    return  request({     url: siteName  +  '/customer/deleteCustomerById',     method:   'get',     params: _data   })
}