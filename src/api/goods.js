import request from "@/utils/request";
var loginAccount = JSON.parse(sessionStorage.getItem("loginAccount"));
var siteName = 'http://106.14.165.150:8083'
    // import siteName from 'vue-admin-template';
    // 所有的url都是请求
export function getList(params) {
    console.log(params);
    var _data = {
        ...params,
        pageNum: params.page,
        pageSize: params.limit
    };
    return request({
        // url: "http://3d160t5497.goho.co/goods/listGoods",
        url: siteName + '/goods/listGoods',
        method: "post",
        data: _data
    });
}
// 创建商品;
export function addGoods(params) {
    var _data = {
        ...params,
        loginAccount: loginAccount,
    };
    console.log(_data);
    debugger;
    return request({
        // url: "http://3d160t5497.goho.co/goods/addGoods",
        url: siteName + '/goods/addGoods',
        method: "post",
        data: _data
    });
}

//更新商品
export function updateGood(params) {
    var _data = {
        ...params,
        loginAccount: loginAccount
    };
    console.log(_data);
    // debugger
    return request({
        // url: "http://3d160t5497.goho.co/goods/updateGoodsInfo",
        url: siteName + '/goods/updateGoodsInfo',
        method: "post",
        data: _data
    });
}
//删除商品
export function deleteGood(params) {
    var _data = {
        ...params,
        loginAccount: loginAccount
    };
    console.log(params);
    debugger;
    return request({
        // url: "http://3d160t5497.goho.co/goods/deleteGoods",
        url: siteName + '/goods/deleteGoods',
        method: "get",
        params: _data
    });
}
// 商家编码
export function getBusiness(params) {
    return request({
        // url: "http://3d160t5497.goho.co/goods/listBusiness",
        url: siteName + '/goods/listBusiness',
        method: "get",
        params
    });
}
// 改变商品状态
export function updateSkuStatus(params) {
    var _data = {
        ...params,
        loginAccount: loginAccount,
        status: +params.status
    };
    console.log(_data);
    debugger

    return request({
        // url: "http://3d160t5497.goho.co/goods/updateGoodStatus",
        url: siteName + '/goods/updateGoodStatus',
        method: "get",
        // _data
        // get请求用什么接
        params: _data
    });
}