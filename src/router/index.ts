import { RouteRecordRaw } from 'vue-router';

/**
 * demo路由
 */
const demoRoutes: Array<RouteRecordRaw> = [
  {
    path: `/demo/micromainComponent`,
    name: `micromainComponent`,
    component: () => import('@/pages/demo/micromainComponent.vue'),
    meta: {},
  },
  {
    path: `/demo/routeComponent`,
    name: `routeComponent`,
    component: () => import('@/pages/demo/routeComponent.vue'),
    meta: {},
  },
];

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
  ...demoRoutes,
];
