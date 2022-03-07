import { createApp, reactive } from 'vue';
import * as VueRouter from 'vue-router';
import './frontend/styles/index.pcss';
import Main from '@/frontend/pages/Main';
import { handleResponse } from '@/frontend/utils/handleResponse';
import { routes } from '@/frontend/routes';
import { ipcRenderer } from 'electron';

const AppContext = reactive({
  showLoader: true,
  dataverseClientConfig: null,
});

const loadDataVerse = async () => {
  try {
    if (!AppContext.dataverseClientConfig) {
      const loadClientResponse = await handleResponse(
        ipcRenderer.invoke('load-dataverse-client'),
      );
      if (loadClientResponse) {
        AppContext.dataverseClientConfig = {
          host: loadClientResponse.host,
          apikey: loadClientResponse.apikey,
        };
        return true;
      } else {
        return '/config';
      }
    } else {
      return true;
    }
  } catch (e) {
    return `/error/${e.message.toString()}/${e.stack.toString()}`;
  }
};

const router = VueRouter.createRouter({
  history: VueRouter.createMemoryHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (to.path === '/') {
    return await loadDataVerse();
  }
  return true;
});

const app = createApp(Main);
app.use(router);
app.provide('AppContext', AppContext);
app.mount('#app');
