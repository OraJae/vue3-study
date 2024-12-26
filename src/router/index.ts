import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
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
];

console.log(routes);

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL), // createWebHashHistory()
  history: createWebHashHistory(), // createWebHashHistory()
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
  document.title = (to?.meta?.title ?? "tiger") as string;
  let token = sessionStorage.getItem("token");
  // if (token == "admin321")         {
  //     next()
  // } else {
  //     if (to.name === 'login') {
  //         next()
  //     } else {
  //         next({ path: "/login" })
  //     }
  // }
  if (token) {
    console.log(1);
    to.name === "login" ? next({ path: "/home" }) : next();
  } else {
    to.name === "login" ? next() : next({ path: "/login" });
  }
});

export default router;
