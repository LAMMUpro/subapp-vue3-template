import Layout from '@/layouts/index.vue';
import { isTopApp } from 'micro-app-utils';
import { RouteRecordRaw } from 'vue-router';

/** 
 * 处理路由meta的parentComponent
 * 如果路由meta存在parentComponent，在本地环境 + 非主应用环境下打开，路由会包上一层Layout
 */
export function parseRoutesMetaParentComponent(
  /** 路由 */
  routes: Array<RouteRecordRaw>,
  /** 是否强制添加Layout(条件匹配下) */
  forceAdd: boolean = false
) {
  if (isTopApp) {
    return routes.map(item => {
      if (forceAdd || item.meta?.parentComponent) {
        return {
          path: '/',
          name: 'LayoutDevAutoAdd' + Date.now() + Math.random().toString(36).substring(2),
          component: forceAdd ? Layout : item.meta?.parentComponent!,
          children: [ item ],
        }
      }
      return item;
    })
  } else {
    return routes;
  }
}