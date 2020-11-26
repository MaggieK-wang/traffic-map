import Mock from "mockjs";
// import { param2Obj } from '@/utils'
import { param2Obj } from "../src/utils";

const data = Mock.mock({
    "items|50": [{
        id: "@id",
        // 商品编码
        skuCode: "@string(5)",
        // 商家编码
        businessCode: "@string(5)",
        // Isbn书号
        ISBN: "@integer(0,99999)",
        // 商品名称
        skuName: "@cword(5,20)",
        // 商家名称
        businessName: "@cword(5,20)",
        // 定价
        costPrice: "@float(0,200,0,2)",
        // 售价
        salePrice: "@float(0,200,0,2)",
        // 销售数量
        saleNum: "@integer(0,9999)",
        // 浏览量
        visiteNum: "@integer(0,99999)",
        // 库存
        storeNum: "@integer(0,9999)",
        // 广告词
        skuAd: "@csentence(0,50)",
        // 商品介绍
        skuIntroduction: "@csentence(0,20)",
        // 商品状态(0:在售 1; 已下架，2：未发布)
        "skuStatus|1": ["0", "1", "2"],
        // 删除标记
        "IsDelete|1": ["0", "1"],
        // 创建时间
        createdTime: "@datetime()",
        // 更新时间
        updatedTime: "@datetime()",
        // 上架时间
        saleTime: "@datetime()",
        // 创建人
        createdby: "@cname()",
        // 更新人
        updatedby: "@cname()",
        // image: []

    }]
});
export default [{
        url: "/vue-admin-template/picture/listPic",
        type: "post",
        response: (req, res) => {
            var { picStatus } = param2Obj(req.url);

            const items = data.items.filter(item => {
                if (picStatus && +item.picStatus !== +picStatus) return false;
                return true;
            });

            return {
                code: 1,
                msg: "查询成功",
                success: true,
                data: {
                    data: items
                }
            };
        }
    },
    {
        url: "/vue-admin-template/picture/addPic",
        type: "post",
        response: (req, res) => {
            var { picUrl } = param2Obj(req.url);
            return {
                code: 1,
                msg: "添加成功",
                success: true,
                data: {}
            };
        }
    },
    //上传图片
    {
        url: "/vue-admin-template/goods/uploadImage",
        type: "post",
        response: (req, res) => {
            return {
                code: 1,
                msg: "上传成功",
                success: true,
                data: "https://tse4-mm.cn.bing.net/th/id/OIP.XSUDIxJvvEHY0yBJ7XyclQHaCy?pid=Api&rs=1"
            };
        }
    },
    // 商品列表
    {
        url: "/vue-admin-template/goods/listGoods",
        type: "post",
        response: (req, res) => {
            var { page = 1, limit = 20, skuName, skuStatus } = param2Obj(req.url);
            // mock后的数据先条件过滤，在分页
            const items = data.items.filter(item => {
                // 商品名称过滤
                if (skuName && item.skuName.indexOf(skuName) < 0) return false;

                // 商品状态过滤
                if (skuStatus && item.skuStatus !== skuStatus) return false;

                return true;
            });
            // const items = data.items
            var pageList = items.filter(
                (item, index) => index < limit * page && index >= limit * (page - 1)
            );
            return {
                code: 1,
                msg: "添加商品",
                success: true,
                data: {
                    total: items.length,
                    items: pageList
                }
            };
        }
    },
    // 新增商品
    {
        url: "/vue-admin-template/goods/addGoods",
        type: "post",
        response: (req, res) => {
            // console.log(param2Obj(req.url));
            console.log("添加接口调用");
            return {
                code: 1,
                msg: "添加商品成功",
                success: true,
                data: {}
            };
        }
    },
    // 更新商品
    {
        url: "/vue-admin-template/goods/updateGoodsInfo",
        type: "post",
        response: (req, res) => {
            console.log(param2Obj(req.url));
            console.log("更新接口调用");

            return {
                code: 1,
                success: true,
                msg: "更新商品成功",

                data: {}
            };
        }
    },
    // 删除商品
    {
        url: "/vue-admin-template/goods/deleteGoods",
        type: "get",
        response: config => {
            console.log("删除接口调用");
            console.log(param2Obj(config.url));

            return {
                code: 1,
                success: true,
                msg: "删除商品成功",

                data: {}
            };
        }
    },

    {
        url: "/vue-admin-template/goods/listBusiness",
        type: "get",
        response: config => {
            // console.log("删除接口调用");
            console.log(param2Obj(config.url));
            var A_bussnessList = data.items.reduce((acc, cur) => {
                acc.push({
                    businessCode: cur.businessCode,
                    businessName: cur.businessName
                })
                return acc;
            }, []);
            return {
                code: 1,
                success: true,
                msg: "获取商品成功",

                data: A_bussnessList
            };
        }
    }
];