import request from "@/utils/request";
var loginAccount = JSON.parse(sessionStorage.getItem("loginAccount"));
var siteName = 'http://106.14.165.150:8083'
    //图片列表
export function getList(params) {
    console.log(params);
    // debugger;
    return request({
        // url: "http://3d160t5497.goho.co/picture/listPic",
        url: siteName + "/picture/listPic",
        method: "post",
        data: params
    });
}
// 添加轮播图
export function addPic(params) {
    var _data = {
        ...params,
        loginAccount: loginAccount,

    };
    console.log(_data);
    // debugger;
    return request({
        url: "http://106.14.165.150:8083/picture/addPic",
        // url: siteName + "/picture/addPic",
        method: "post",
        data: _data
    });
}
export function updatePic(params) {
    var _data = {
        ...params,
        loginAccount: loginAccount
            // stus:
    };
    console.log(_data);
    // debugger;
    return request({
        // url: "http://3d160t5497.goho.co/picture/updatePic",
        url: siteName + "/picture/updatePic",
        method: "post",
        data: _data
    });
}