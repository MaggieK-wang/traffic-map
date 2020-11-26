import Mock from 'mockjs'
import { config } from '@vue/test-utils'
import { param2Obj } from '../src/utils'
const data = Mock.mock({
    'items|3': [{
        // 节点id
        nodeId: '@guid',
        // 节点名称
        nodeName: '@ctitle(6)',
        // 节点属性
        attribute: {
            // 商品分类名称
            cateName: '@ctitle(6)',
            // 商品分类编码
            cateCode: '@integer(10)',
            // 父级商品分类编码
            parentCateCode: '@integer(10)',
            // 父级商品分类名称
            parentCateName: '@string(10)',
            // 备注
            remark: '@csentence(20)',
            // 分类级别
            'level|1': ['1', '2'],
            // 用户id
            id: '@id',
            // 删除标记
            isDelete: '0',
            // 创建时间
            createdTime: '@datetime()',
            // 创建人
            createdBy: '@cname()'
        },
        // 子节点
        childNodes: [{
            // 子节点id
            nodeId: '@guid',
            // 子节点名称
            nodeName: '@ctitle(6)',
            // 子节点属性
            attribute: {
                // 商品分类名称
                cateName: '@ctitle(6)',
                // 商品分类编码
                cateCode: '@integer(10)',
                // 父级商品分类编码
                parentCateCode: '',
                // 父级商品分类名称
                parentCateName: '',
                // 备注
                remark: '@sentence(20)',
                // 分类级别
                'level|1': ['1', '2'],
                // 用户id
                id: '@id',
                // 删除标记
                isDelete: '0',
                // 创建时间
                createdTime: '@datetime()',
                // 创建人
                createdBy: '@cname()'
            },
        }]
    }]
})

export default [{
        url: '/vue-admin-template/cateGory/findCateGoryTree',
        type: 'get',
        response: config => {
            console.log(param2Obj(config.url));

            return {
                code: 1,
                msg: '查询成功',
                success: true,
                data: data.items,

            }
        }
    },
    {
        url: '/vue-admin-template/cateGory/addCateGory',
        type: 'post',
        response: (req, res) => {
            console.log(param2Obj(req.url));

            return {
                code: 1,
                msg: '新增类别成功',
                success: true,
                data: {},

            }
        }
    },
    {
        url: '/vue-admin-template/cateGory/findCateGoryByCode',
        type: 'get',
        response: config => {
            console.log(param2Obj(config.url));

            return {
                code: 1,
                msg: '查询成功',
                success: true,
                data: data.items[0],

            }
        }
    },
    {
        url: '/vue-admin-template/cateGory/deleteMenuBycode',
        type: 'get',
        response: (req, res) => {
            console.log(param20j(req.url));

            return {
                code: 1,
                msg: '删除成功',
                success: true,
                data: {},

            }
        }
    },


]