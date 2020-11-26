import Mock from "mockjs";
import { param2Obj } from "../src/utils";

const data = Mock.mock({
    "items|50": [{
        id: "@id",
        // 商品编码
        skuCode: "@string(5)",
        // 商家编码
        businessCode: "@string(5)",
        // Isbn书号
        isbn: "@string(5)",
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
        skuAd: "@csentence(0,10)",
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
        updatedby: "@cname()"
    }]
});

export default [{
        url: "/vue-admin-template/goods/listGoods",
        type: "get",
        response: config => {
            var { page = 1, limit = 20, skuName, skuStatus } = param2Obj(config.url);
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
                code: 20000,
                data: {
                    total: items.length,
                    items: pageList
                }
            };
        }
    },
    {
        url: "/vue-admin-template/goods/createGood",
        type: "post",
        response: config => {
            return {
                code: 20000,
                data: {
                    data: "添加成功"
                }
            };
        }
    },
    {
        url: "/vue-admin-template/goods/updateGood",
        type: "post",
        response: config => {
            console.log("更新接口调用");

            return {
                code: 20000,
                data: {
                    data: "更新成功"
                }
            };
        }
    },
    {
        url: "/vue-admin-template/goods/deleteGood",
        type: "post",
        response: config => {
            console.log("删除接口调用");

            return {
                code: 20000,
                data: {
                    data: "删除成功"
                }
            };
        }
    }
];