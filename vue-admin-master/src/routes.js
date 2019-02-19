import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page3 from './views/nav2/Page3.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import Page6a from './views/nav3/Page6a.vue'
import Page6b from './views/nav3/Page6b.vue'
import echarts from './views/charts/echarts.vue'
import Page7 from './views/nav4/Page7.vue'
import Page7a from './views/nav4/Page7-1.vue'
import Page7b from './views/nav4/Page7-2.vue'

import Page8 from './views/nav5/Page8.vue'
import Page9 from './views/nav5/Page9.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '文章管理',
        iconCls: 'fa fa-newspaper-o',
        // leaf: true,
        children: [
            { path: '/page3', component: Page3, name: '已审核'},
            { path: '/page4', component: Page4, name: '未审核' },
            { path: '/page5', component: Page5, name: '全部文章' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '申请认证',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/Page6a', component: Page6a, name: '已通过' },
            { path: '/Page6b', component: Page6b, name: '未通过' },
            { path: '/Page6', component: Page6, name: '申请认证' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '会员管理',
        iconCls: 'fa fa-id-card-o',
        children:[
            {path: '/Page7-1', component: Page7a, name: '已通过'},
            {path: '/Page7-2', component: Page7b, name: '未通过'},

            {path: '/Page7', component: Page7, name: '会员管理'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '财务管理',
        iconCls: 'fa fa-money',
        children:[
            {path: '/Page8', component: Page8, name: '未审核'},
            {path: '/Page9', component: Page9, name: '流水明细'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;