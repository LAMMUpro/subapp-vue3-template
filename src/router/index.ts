import { defineComponent, h } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import MicroComponent from 'micro-app-utils/vue3/MicroComponent.vue';

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
    path: `/empty`,
    name: `PageEmpty`,
    component: defineComponent({
      setup() {
        return () =>
          h(MicroComponent, {
            _is: 'PageEmpty',
          });
      },
    }),
    meta: { },
  },
  {
    path: `/404`,
    name: `Page404`,
    component: defineComponent({
      setup() {
        return () =>
          h(MicroComponent, {
            _is: 'Page404',
            msg: '组件参数',
          });
      },
    }),
    meta: { },
  },
  {
    path: `/403`,
    name: `Page403`,
    component: defineComponent({
      setup() {
        return () =>
          h(MicroComponent, {
            _is: 'Page403',
          });
      },
    }),
    meta: { },
  },
  ...demoRoutes,
];
