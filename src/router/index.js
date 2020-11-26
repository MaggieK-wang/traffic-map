import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: "/login",
        component: () =>
            import ("@/views/login/index"),
        hidden: true
    },
    {
        path: "/404",
        component: () =>
            import ("@/views/404"),
        hidden: true
    },
    {
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [{
            path: "dashboard",
            name: "首页",
            component: () =>
                import ("@/views/dashboard/index"),
            meta: { title: "首页", icon: "dashboard" }
        }]
    },

    {
        path: "/userInfo",
        component: Layout,
        hidden: true,
        redirect: "/userInfo",
        children: [{
            path: "index",
            name: "个人信息",
            component: () =>
                import ("@/views/userInfo/index"),
            meta: { title: "个人信息", icon: "eye" }
        }]
    },


    {
        path: "/sysAdmin",
        component: Layout,
        redirect: "/sysAdmin/pcUserAdmin",
        name: "系统管理",
        meta: { title: "系统管理", icon: "系统管理" },
        children: [{
                path: "pcUserAdmin",
                name: "系统用户管理",
                component: () =>
                    import ("@/views/sysAdmin/pcUserAdmin"),
                meta: { title: "系统用户管理", icon: "系统用户管理svg" }
            },
            {
                path: "menuAdmin",
                name: "菜单管理",
                component: () =>
                    import ("@/views/sysAdmin/menuAdmin"),
                meta: { title: "菜单管理", icon: "菜单管理" }
            }
        ]
    },

    {
        path: "/goods",
        component: Layout,
        redirect: "/goods",
        children: [{
            path: "goods",
            name: "商品管理",
            component: () =>
                import ("@/views/goods/index"),
            meta: { title: "商品管理", icon: "商品管理" }
        }]
    },

    {
        path: "/banner",
        component: Layout,
        redirect: "/banner",
        children: [{
            path: "banner",
            name: "轮播图管理",
            component: () =>
                import ("@/views/banner/index"),
            meta: { title: "轮播图管理", icon: "预览" }
        }]
    },

    {
        path: "/category",
        component: Layout,
        redirect: "/category",
        children: [{
            path: "category",
            name: "商品分类管理",
            component: () =>
                import ("@/views/category/index"),
            meta: { title: "商品分类管理", icon: "商品管理 分类" }
        }]
    },

    {
        path: "/appUser",
        component: Layout,
        redirect: "/appUser",
        children: [{
            path: "appUser",
            name: "用户管理",
            component: () =>
                import ("@/views/appUser/index"),
            meta: { title: "用户管理", icon: "用户管理" }
        }]
    },
    {
        path: "/order",
        component: Layout,
        redirect: "/order",
        children: [{
            path: "order",
            name: "订单管理",
            component: () =>
                import ("@/views/order/index"),
            meta: { title: "订单管理", icon: "订单管理" }
        }]
    },

    // 404 page must be placed at the end !!!
    { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;