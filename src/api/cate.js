import request from "@/utils/request";
// var siteName = "http://3160d547y9.qicp.vip";
var loginAccount = sessionStorage.getItem("loginAccount");
export function getCate(params) {
    return request({
        // url: "http://3d160t5497.goho.co/cate/listCateTree",
        url: "http://106.14.165.150:8083/cate/listCateTree",
        method: "get",
        params
    });
}
export function addCate(params) {
    return request({
        // url: "http://3d160t5497.goho.co/cate/addCate",
        url: "http://106.14.165.150:8083/cate/addCate",
        method: "post",
        data: params
    });
}
export function findCateByCode(params) {
    return request({
        // url: "http://3d160t5497.goho.co/cate/findCateByCode",
        url: "http://106.14.165.150:8083/cate/findCateByCode",
        method: "get",
        params
    });
}
export function updateCate(params) {
    return request({
        url: "http://106.14.165.150:8083/cate/updateCateByCode",
        // url: 'http://3d160t5497.goho.co/cate/updateCateByCode',
        method: "post",
        data: params
    });
}
export function deleteCate(params) {
    return request({
        url: "http://106.14.165.150:8083/cate/deleteCateByCode",
        // url: 'http://3d160t5497.goho.co/cate/deleteCateByCode',
        method: "get",
        params
    });
}