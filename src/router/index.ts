import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import CONSTS from "../utils/CONSTS";

export const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: `/404`,
    name: `404`,
    component: () => import('@/pages/404.vue'),
    meta: { hidden: true },
  },
  {
    path: `/403`,
    name: `403`,
    component: () => import('@/pages/403.vue'),
    meta: { hidden: true },
  },
  {
    path: `/empty`,
    name: `empty`,
    component: () => import('@/pages/empty.vue'),
    meta: { hidden: true },
  },
]


const router = createRouter({
  history: createWebHashHistory(`/${CONSTS.PREFIX_URL}/`),
  routes: baseRoutes,
});

export default router;