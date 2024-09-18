import { RouteRecordRaw } from 'vue-router';

/** 存储默认路由（工作台 或 第一个有效路由） */
export const defaultRoute = {
  path: '',
};

/** 默认路由路径（不一定存在, 使用前需要校验） */
export const defaultRoutePath = '/home';

/**
 * 导出路由
 * ps：如果直接打开子应用，这些路由是不需要Layout的
 */
export const exportRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: "/xxx",
  //   name: "xxx",
  //   component: () => import("@/pages/xxx.vue"),
  //   meta: { title: "xxx" },
  // },
];