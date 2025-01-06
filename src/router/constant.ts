export default [
    {
        path: "/",
        name: "index",
        redirect: "/home",
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录",
        },
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/home",
        name: "home",
        meta: {
            title: "首页",
        },
        component: () => import("@/views/index.vue"),
    },
    {
        path: "/components",
        name: "components",
        meta: {
            title: "封装组件展示",
        },
        component: () => import("@/views/components/index.vue"),
        children: [
            {
                path: "h5/pageLayout",
                name: "h5PageLayout",
                meta: {
                    title: "h5页面布局组件",
                },
                component: () => import("@/views/components/h5/pageLayout/index.vue"),
            },
            {
                path: "h5/vant",
                name: "h5Vant",
                meta: {
                    title: "h5Vant组件",
                },
                component: () => import("@/views/components/h5/vant/index.vue"),
            },
        ]
    },
    {
        path: "/plugin",
        name: "plugin",
        meta: {
            title: "第三方插件使用",
        },
        component: () => import("@/views/plugin/index.vue"),
        children: [
            {
                path: "seal",
                name: "seal",
                meta: {
                    title: "pdf印章",
                },
                component: () => import("@/views/plugin/seal/index.vue"),
            },
            {
                path: "sheet",
                name: "sheet",
                meta: {
                    title: "sheet表格",
                },
                component: () => import("@/views/plugin/sheet/index.vue"),
            },
            {
                path: "filePreview",
                name: "filePreview",
                meta: {
                    title: "文件预览",
                },
                component: () => import("@/views/plugin/filePreview/index.vue"),
            },
            {
                path: "amap",
                name: "amap",
                meta: {
                    title: "高德地图",
                },
                component: () => import("@/views/plugin/amap/index.vue"),
            },
            {
                path: "mdReader",
                name: "mdReader",
                meta: {
                    title: "mdReader",
                },
                component: () => import("@/views/plugin/mdReader/index.vue"),
            },
            {
                path: "three",
                name: "three",
                meta: {
                    title: "three",
                },
                component: () => import("@/views/plugin/three/index.vue"),
            },
        ],
    },
    {
        path: "/scene",
        name: "scene",
        meta: {
            title: "业务场景方案",
        },
        component: () => import("@/views/scene/index.vue"),
        children: [
            {
                path: "pageCache/list",
                name: "pageCacheList",
                meta: {
                    title: "h5页面缓存方案",
                },
                component: () => import("@/views/scene/pageCache/index.vue"),
            },
            {
                path: "pageCache/detail",
                name: "pageCacheDetail",
                meta: {
                    title: "h5页面缓存方案详情",
                },
                component: () => import("@/views/scene/pageCache/detail.vue"),
            },
            {
                path: "postMessage",
                name: "postMessage",
                meta: {
                    title: "iframe father",
                },
                component: () => import("@/views/scene/postMessage/index.vue"),
            },
            {
                path: "postMessage/son",
                name: "postMessageSon",
                meta: {
                    title: "iframe son",
                },
                component: () => import("@/views/scene/postMessage/son.vue"),
            },
            {
                path: "postMessage/grandson",
                name: "postMessageGrandson",
                meta: {
                    title: "iframe grandson",
                },
                component: () => import("@/views/scene/postMessage/grandson.vue"),
            },
        ],
    },
    {
        path: "/toolFunction",
        name: "toolFunction",
        meta: {
            title: "工具函数封装",
        },
        component: () => import("@/views/toolFunction/index.vue"),
        children: [
            {
                path: "excelExport",
                name: "excelExport",
                meta: {
                    title: "excel导出通用工具函数",
                },
                component: () => import("@/views/toolFunction/excelExport/index.vue"),
            },
        ],
    },
    {
        path: "/webPage",
        name: "webPage",
        meta: {
            title: "功能网页",
        },
        component: () => import("@/views/webPage/index.vue"),
        children: [
            {
                path: "download",
                name: "download",
                meta: {
                    title: "download",
                },
                component: () => import("@/views/webPage/download/index.vue"),
            },
            {
                path: "cover",
                name: "cover",
                meta: {
                    title: "cover",
                },
                component: () => import("@/views/webPage/cover/index.vue"),
            },
        ],
    },
];
