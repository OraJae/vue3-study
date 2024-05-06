import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import constantRouter from "./constant";
export const routes: RouteRecordRaw[] = [
    ...constantRouter,
    // {
    //     path: '/404',
    //     component: () => import('@/views/404.vue'),
    // },
    // {
    //     path: '/:pathMatch(.*)',
    //     redirect: '/404',
    // },
]

console.log(routes);

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // createWebHashHistory()
    routes: routes,
    // strict: true,
    // scrollBehavior(to, from, savedPosition) {
    //     return new Promise(resolve => {
    //         if (savedPosition) {
    //             return savedPosition
    //         } else {
    //             if (from.meta.saveSrollTop) {
    //                 const top: number = document.documentElement.scrollTop || document.body.scrollTop
    //                 resolve({ left: 0, top })
    //             }
    //         }
    //     })
    // },
});

// 路由拦截
router.beforeEach((to, from, next) => {
    document.title = (to?.meta?.title ?? 'tiger') as string
    next()
})

export default router;
