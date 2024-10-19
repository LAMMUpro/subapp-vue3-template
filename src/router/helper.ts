import Layout from '@/layouts/index.vue';
import { isExternal } from '@/utils';
import CONSTS from '@/utils/CONSTS';
import { isTopApp } from 'micro-app-tools';
import { RouteRecordRaw } from 'vue-router';

const vueFiles = import.meta.glob<typeof import('*.vue')>('../views/**/*.vue');
/**
 * 获取动态目录文件
 */
function getViewComponent(path: string) {
  return vueFiles[`../views${path}.vue`];
}

/**
 * 处理路由
 * @param routes 
 */
export function generateRoutes(routes: Array<any>): Array<any> {
  return routes.reduce((result, item) => {
    if (item.children?.length) {
      result.push(...generateRoutes(item.children));
    } else {
      /** 过滤外链 / 过滤其它应用的链接 */
      if (!isExternal(item.url) && item.path.startsWith(`/${CONSTS.PREFIX_URL}/#/`)) {
        const pathWithoutPrefix = item.path.replace(`/${CONSTS.PREFIX_URL}/#/`, '/');
        result.push({
          ...item,
          /** 中文name很有可能重复，所以用id代替中文name */
          name: item.id,
          /** 从item.url里面提取path */
          path: pathWithoutPrefix,
          component: getViewComponent(item.component as string),
          meta: {
            title: item.name,
          },
        });
      }
    }
    return result;
  }, [])
}

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