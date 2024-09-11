import { App, createApp } from 'vue';
import AppVue from '@/App.vue';
import { baseRoutes } from '@/router';
import { isSubApp, sendDataDown, sendDataUp, MicroAppInit } from 'micro-app-utils';
import { Router, createRouter, createWebHashHistory } from 'vue-router';
import CONSTS from '@/utils/CONSTS';
import { parseRoutesMetaParentComponent } from '@/router/helper';
import { generateDataListener } from 'micro-app-utils/listener';
import { MicroComponentSlotMap } from 'micro-app-utils/data';
import microApp from '@micro-zoe/micro-app';

window._subAppSettingList_ = window.rawWindow?._subAppSettingList_ || [];

/** 初始化微前端配置 */
MicroAppInit<'localhost' | 'test' | 'pre' | 'master'>({
  env: process.env.NODE_ENV === 'development' ? 'localhost' : 'master',
  tagName: CONSTS.microAppTagName,
  dataListener: generateDataListener({
    /** 子应用接收到这个请求需要往上传递，直到传给顶部主应用 */
    micro_component_request: (data) => {
      sendDataUp({
        emitName: 'micro_component_request',
        parameters: [{
          ...data,
          subAppNameList: [...data.subAppNameList, window.__MICRO_APP_NAME__!]
        }],
      });
    },
    /** 子应用接收到这个请求需要往上传递，直到传给顶部主应用 */
    micro_component_destroy: (elementId) => {
      sendDataUp({
        emitName: 'micro_component_destroy',
        parameters: [elementId],
      });
    },
  }),
  subAppSettingList: window._subAppSettingList_,
});

/** 启动微前端 */
microApp.start({
  tagName: CONSTS.microAppTagName,
  /** 防止子应用请求父应用资源（部署时需要配置这个url指向这个文件） */
  iframeSrc: `/micromain/empty.html`,
  'keep-router-state': true,
});

let app: App<Element> | undefined = undefined;
let router: Router | undefined = undefined;

/** 监听微前端主应用数据 */
let dataListener: (data: BaseObj<any>) => void;

/**
 * 微前端渲染钩子
 */
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

  dataListener = generateDataListener({
    micro_component_slot: ({ subAppNameList, slotName, elementId, props, parentElementId }) => {
      /**
       * 当前子应用即为目标子应用
       */
      if (subAppNameList.length === 0) {
        const Element = document.body.querySelector(`#${elementId}`);
        const component = MicroComponentSlotMap[parentElementId]?.[slotName];
        if (Element && component) {
          createApp(component, props).mount(Element);
        }
      } else {
        /**
         * 往下继续传递事件
         */
        const nextSubAppName = subAppNameList.slice(-1)[0];
        sendDataDown(nextSubAppName, {
          emitName: 'micro_component_slot',
          parameters: [
            {
              slotName, elementId, props, parentElementId,
              subAppNameList: subAppNameList.slice(0, -1),
            }
          ],
        })
      }
    },
  });
  window.microApp?.addDataListener(dataListener, true);
};

/**
 * 微前端卸载钩子
 */
window.unmount = () => {
  app?.unmount();
  app = undefined;
  router = undefined;

  window.microApp?.removeDataListener(dataListener);
};

/**
 * 应用独立运行时，直接运行渲染钩子函数
 */
if (!isSubApp) {
  window.mount();
}
