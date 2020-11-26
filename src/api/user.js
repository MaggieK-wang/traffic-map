import request from "@/utils/request";
var loginAccount = JSON.parse(sessionStorage.getItem('loginAccount'))
var siteName = "http://106.14.165.150:8083";
export function login(params) {
    // console.log(params);
    // debugger;
    // post 请求用data接收
    console.log(params);

    return request({
        url: "http://106.14.165.150:8083/customer/login",
        method: "post",
        data: params
    });
}

export function getInfo(token) {
    return request({
        url: "http://106.14.165.150:8083/goods/findGoodsBySkuCode",
        method: "get",
        params: { token }
    });
}

//用户退出
export function logout(params) {
    var _params = {
        userAccount: loginAccount
    }
    console.log(_params);
    debugger
    return request({
        url: siteName + '/customer/loginOut',
        // url: '/vue-admin-template/customer/loginOut',
        method: 'get',
        params: _params
    })
}
// 用户注册
export function addCustomer(params) {

    // console.log("注册成功");
    // console.log(data);
    debugger;
    return request({
        url: siteName + "/customer/addCustomer",
        method: "post",
        data: params
    });
}
//获取首页数据(通)
// http://3d160t5497.goho.co
export  function  getDash(params)  {  
    var  _data  =   {    
        loginAccount: JSON.parse(sessionStorage.getItem('loginAccount'))
    }
    console.log(_data);

    return  request({    
        url: siteName + '/statisticsinfo/selctMessage',
            method: 'get',
            params: _data  
    })
}