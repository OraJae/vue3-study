export default [
    {
        path: '/',
        name: 'index',
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '首页'
                },
                component: () => import('@/views/index.vue'),
            },
            {
                path: 'seal',
                name: 'seal',
                meta: {
                    title: 'pdf印章'
                },
                component: () => import('@/views/seal/index.vue'),
            },
            {
                path: 'sheet',
                name: 'sheet',
                meta: {
                    title: 'sheet表格'
                },
                component: () => import('@/views/sheet/index.vue'),
            },
            {
                path: 'h5/pageCache/list',
                name: 'h5PageCacheList',
                meta: {
                    title: 'h5页面缓存方案'
                },
                component: () => import('@/views/h5/pageCache/index.vue'),
            },
            {
                path: 'h5/pageCache/detail',
                name: 'h5PageCacheDetail',
                meta: {
                    title: 'h5页面缓存方案详情'
                },
                component: () => import('@/views/h5/pageCache/detail.vue'),
            },
            {
                path: 'h5/pageLayout',
                name: 'h5PageLayout',
                meta: {
                    title: 'h5页面布局组件'
                },
                component: () => import('@/views/h5/pageLayout/index.vue'),
            },
            {
                path: 'h5/iframe/postMessage',
                name: 'h5IframePostMessage',
                meta: {
                    title: 'iframe father'
                },
                component: () => import('@/views/h5/iframe/postMessage/index.vue'),
            },
            {
                path: 'h5/iframe/postMessage/son',
                name: 'h5IframePostMessageSon',
                meta: {
                    title: 'iframe son'
                },
                component: () => import('@/views/h5/iframe/postMessage/son.vue'),
            },
            {
                path: 'h5/iframe/postMessage/grandson',
                name: 'h5IframePostMessageGrandson',
                meta: {
                    title: 'iframe grandson'
                },
                component: () => import('@/views/h5/iframe/postMessage/grandson.vue'),
            },
            {
                path: 'h5/vant',
                name: 'h5Vant',
                meta: {
                    title: 'h5Vant组件'
                },
                component: () => import('@/views/h5/vant/index.vue'),
            },
        ]
    },
    // {
    //     path: '/h5',
    //     name: 'h5Page',
    //     component: () => import('@/views/h5/index.vue'),
    //     children: [
    //         {
    //             path: 'pageCache/list',
    //             name: 'h5PageCacheList',
    //             meta: {
    //                 title: 'h5页面缓存方案'
    //             },
    //             component: () => import('@/views/h5/pageCache/index.vue'),
    //         },
    //         {
    //             path: 'pageCache/detail',
    //             name: 'h5PageCacheDetail',
    //             meta: {
    //                 title: 'h5页面缓存方案详情'
    //             },
    //             component: () => import('@/views/h5/pageCache/detail.vue'),
    //         }
    //     ]
    // },
];
