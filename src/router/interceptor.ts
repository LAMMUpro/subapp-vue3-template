import { Router } from "vue-router";
import { addAsyncRoute } from '.';
import { isAddedAsyncRoutes, routerTo, updateIsAddedAsyncRoutes } from './hook';
import { modifyData } from '@/utils';
import { isSubApp } from 'micro-app-tools';
import { defaultRoute } from './config';
import CONSTS from '@/utils/CONSTS';
import useGlobalStore from '@/store';
import { appPageLoading } from '@/hooks';

let timeStamp = 0;

/**
 * 初始化权限管理
 */
export function initRouteInterceptor(router: Router) {
  const globalStore = useGlobalStore();
  /** 初始化变量 */
  updateIsAddedAsyncRoutes(false);
  /** 初始化routerTo */
  modifyData(routerTo, { path: '', query: {} });
  /** 初始化defaultRoute */
  defaultRoute.path = '';

  router.afterEach((to) => {
    const timeCount = Date.now() - timeStamp;
    if (timeCount < 600) {
      setTimeout(() => {
        appPageLoading.value = false;
      }, 600-timeCount)
    } else {
      appPageLoading.value = false;
    }

    /** 根据路由名动态设置文档的标题 */
    const title = `${CONSTS.PREFIX_DOCUMENT_TITLE} - ${to.meta.title as string || '管理后台'}` ;
    if (isSubApp) {
      window.rawDocument!.title = title;
    } else {
      document.title = title;
    }
  });

  /**
   * 默认非独立运行(无需考虑 登录问题 / 初始化数据问题 / isFirstJump|firstRedirect / 菜单激活问题 / home重定向问题)
   */
  router.beforeEach(async (to, _, next) => {
    /** 
     * 是否是不知名路由（同时也意味未添加动态路由，如果添加过了，有兜底路由to.name肯定不为空）
     * true - 未添加动态路由
     * false - 不一定添加了动态路由，有可能匹配了baseRoutes
     */
    const isUnknownRoute = to.name === undefined;
    
    /**
     * 如果未添加动态路由 && 不知名路由 => 暂存路由
     */
    if (!isAddedAsyncRoutes && isUnknownRoute) {
      modifyData(routerTo, to);
    }

    /**
     * 记录页面跳转时间
     */
    appPageLoading.value = true;
    timeStamp = Date.now();

    /**
     * 如果未添加动态路由 => 动态添加路由、【跳转】目标页或当前页(添加完后需要重新跳)
     */
    if (!isAddedAsyncRoutes) {
      if (addAsyncRoute(router)) return next(routerTo.path ? { ...routerTo, replace: true } : { path: to.path , query: to.query, replace: true });
    }

    /**
     * 如果path是/ => 【跳转】默认路由
     */
    if (to.path === '/' && defaultRoute.path && defaultRoute.path !== '/') {
      return next(defaultRoute);
    }

    /** 访问未注册路由，跳到登录页（子应用独立运行时） */
    if (!isSubApp && !isAddedAsyncRoutes && isUnknownRoute && !globalStore.menus.length) {
      modifyData(routerTo, to);
      return next({ path: '/login' })
    }

    next();
  });
}
