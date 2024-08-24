import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { isSubApp } from 'micro-app-utils';

let app;

window.mount = () => {
  app = createApp(App);
  app.use(router);
  app.mount('#__main_app');
}

window.unmount = () => {
  app = undefined;
}

if (!isSubApp) {
  window.mount();
}




