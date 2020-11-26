import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

const data = Mock.mock({
    'items|50': [{

        //用户账号
        userAccount: '@string(10)',

        //用户姓名
        userName: '@cname()',

        //用户性别(0为女，1为男，2为未知)
        "userSex|1": ['0', '1', '2'],

        //手机号
        phone: '@string("number",11)',

        //用户邮箱
        email: '@string(2,8)' + '@qq.com',

        //身份证
        idCard: '@string("number",18)',

        //用户密码
        password: '@string(6)',

        //积分金额
        frontScore: '@float(0,9999,0,2)',

        //是否为管理员
        isAdmin: ['0'],

        //用户id
        id: '@string(0,20)',

        //删除标记,0为未删除，1为已删除
        "isDelete|1": ['0', '1'],

        //创建时间
        createdTime: '@datetime()',

        //创建人
        createdby: '@cname()',

        //更新时间
        updatedTime: '@now()',

        //更新人
        updatedby: '@cname()',

    }]
})

export default [{
        url: '/vue-admin-template/customer/listCustomers',
        type: 'post',
        response: (req, res) => {
            var { pageNum = 1, pageSize = 10, userAccount, userName } = param2Obj(req.url);
            const items = data.items.filter(item => {
                    if (userAccount && item.userAccount.indexOf(userAccount) < 0) return false
                    if (userName && item.userName.indexOf(userName) < 0) return false

                    return true
                })
                //过滤页码
            var pageList = items.filter(
                (item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
            )
            return {
                code: 1,
                msg: '调用成功',
                success: true,
                data: {
                    total: items.length,
                    pageNum: pageNum,
                    pageSize: pageSize,
                    list: pageList
                }
            }
        }
    },

    {
        url: '/vue-admin-template/customer/findCustomerById',
        type: 'post',
        response: (req, res) => {
            const items = data.items
            return {
                code: 1,
                msg: '调用成功',
                success: true,
                data: items[0],
            }
        }
    }
]