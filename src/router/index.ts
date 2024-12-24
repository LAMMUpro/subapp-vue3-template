import { defineComponent, h } from 'vue';
import { RouteRecordRaw, Router } from 'vue-router';
import MicroComponent from 'micro-app-tools/vue3/MicroComponent.vue';
import { defaultRoute, defaultRoutePath } from './config';
import { asyncRoutes, updateAsyncRoutes, updateIsAddedAsyncRoutes } from './hook';
import { isSubApp } from 'micro-app-tools';
import { generateRoutes, parseRoutesMetaParentComponent } from './helper';
import Layout from '@/layouts/index.vue';
import useGlobalStore from '@/store';

/** 用户路由(登录成功后动态路由添加后才添加) */
export const userRoutes: Array<RouteRecordRaw> = parseRoutesMetaParentComponent([
  {
    path: "/:catchAll(.*)",
    name: "_noMatch_",
    component: defineComponent({
      setup() {
        return () =>
          h(MicroComponent, {
            _is: 'Page404',
            msg: '组件参数',
          });
      },
    }),
    meta: { title: "不存在该页面", parentComponent: Layout },
  }
]);

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
  {
    path: `/demo/reactComponent`,
    name: `reactComponent`,
    component: () => import('@/pages/demo/reactComponent.vue'),
    meta: {},
  },
  {
    path: '/demo/frame-less-ui',
    name: 'frameLessUI',
    component: () => import('@/pages/demo/frameLessUI.vue'),
    meta: { title: 'frame-less-ui组件库测试' },
  },
  {
    path: `/home`,
    name: `home`,
    component: () => import('@/pages/home.vue'),
    meta: {},
  },
  {
    path: `/menuManage`,
    name: `menuManage`,
    component: () => import('@/pages/menuManage.vue'),
    meta: {},
  },
];

/** 
 * 基础路由
 */
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

/**
 * 添加动态路由，最后添加通配指向404，并更新默认路由
 * @return 是否添加成功
 */
export function addAsyncRoute(router?: Router) {
  const globalStore = useGlobalStore();
  if (!router || !globalStore.menus.length) return;

  updateAsyncRoutes(parseRoutesMetaParentComponent(generateRoutes(globalStore.menus), true));
  asyncRoutes.forEach(item => {
    if (!router.hasRoute(item.name!)) {
      router.addRoute(item);
    }
  })
  userRoutes.forEach(item => {
    if (!router.hasRoute(item.name!)) {
      router.addRoute(item);
    }
  })
  updateIsAddedAsyncRoutes(true);

  /** 默认路由不存在则更新为第一个有效路由 */
  if (asyncRoutes.find(item => item.path === defaultRoutePath)) {
    defaultRoute.path = defaultRoutePath;
  } else {
    defaultRoute.path = isSubApp ? asyncRoutes[0]?.path : asyncRoutes[0]?.children[0]?.path;
  }
  return true;
}