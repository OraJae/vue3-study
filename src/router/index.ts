import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import constantRouter from "./constant";
export const routes: RouteRecordRaw[] = [{
    path: '/docs',
    name: 'index',
    component: () => import('@/views/index.vue'),
    // redirect: '/',
}].concat(constantRouter)

console.log(routes);

const router = createRouter({
    history: createWebHistory(), // createWebHashHistory()
    routes: routes,
    strict: true,
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
