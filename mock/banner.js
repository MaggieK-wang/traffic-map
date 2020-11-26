import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

const data = Mock.mock({
    'items|20': [{
        // 图片路径
        picUrl: "https://tse4-mm.cn.bing.net/th/id/OIP.XSUDIxJvvEHY0yBJ7XyclQHaCy?pid=Api&rs=1",
        // 图片的状态（1：启用 2;禁用）
        'picStatus|1': ['1', '2'],
        // id
        id: '@id',
        // 删除标记：0：未删除 1：已删除
        "isDelete|1": ['0', '1'],
        // 创建时间
        createdTime: '@datetime()',
        // 创建人
        createdby: '@cname()',
        // 更新时间
        updatedTime: '@datetime()',
        // 更新人
        updatedby: '@cname()',
    }]
})

export default [{
        url: '/vue-admin-template/picture/listPic',
        type: 'post',
        response: (req, res) => {
            var { picStatus } = param2Obj(req.url);
            const items = data.items.filter(item => {
                    if (picStatus && +item.picStatus !== +picStatus)
                        return false;
                    return true;
                })
                //  var items = data.items;
            return {
                code: 1,
                msg: '调用成功',
                success: true,
                data: items,
            };
        }
    },
    {
        url: '/vue-admin-template/picture/addPic',
        type: 'post',
        response: (req, res) => {
            var { picStatus } = param2Obj(req.url);
            return {
                code: 1,
                msg: '添加成功',
                success: true,
                data: {}
            }
        }
    },
    // 
    {
        url: '/vue-admin-template/picture/updatePic',
        type: 'get',
        response: (req, res) => {
            var { picStatus } = param2Obj(req.url);
            return {
                code: 1,
                msg: '更新成功',
                success: true,
                data: {}

            }
        }
    },
]