import { App, createApp } from 'vue';
import AppVue from '@/App.vue';
import { baseRoutes } from '@/router';
import { isSubApp } from 'micro-app-utils';
import { Router, createRouter, createWebHashHistory } from 'vue-router';
import CONSTS from '@/utils/CONSTS';
import { parseRoutesMetaParentComponent } from '@/router/helper';

let app: App<Element> | undefined = undefined;
let router: Router | undefined = undefined;

window.mount = () => {
  /** 每次mount需要重新构建路由 */
  router = createRouter({
    /** 统一使用hash模式 */
    history: createWebHashHistory(`/${CONSTS.PREFIX_URL}/`),
    routes: parseRoutesMetaParentComponent(baseRoutes),
    linkActiveClass: 'active',
  });
  
  app = createApp(AppVue);
  app.use(router);
  app.mount('#__subapp_vue3');
}

window.unmount = () => {
  console.log('vue3卸载')
  app?.unmount();
  app = undefined;
  router = undefined;
}

if (!isSubApp) {
  window.mount();
}




