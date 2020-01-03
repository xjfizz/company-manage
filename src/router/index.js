import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/product',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/product.vue'),
                    meta: { title: '产品管理' }
                },
                {
                    path: '/banner',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/banner.vue'),
                    meta: { title: '轮播图管理' }
                },
                {
                    path: '/message',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/message.vue'),
                    meta: { title: '联系留言管理' }
                },
               
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/news',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/news.vue'),
                    meta: { title: '新闻动态' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
