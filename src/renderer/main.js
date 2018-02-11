import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';




import App from './App';

Vue.use(Element, { size: 'small' });
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.baseURL = "http://59.110.163.181:3000"; //服务器
axios.defaults.baseURL = "http://localhost:3000"; //本地
axios.defaults.withCredentials = true; //允许设置 cookie
Vue.use(VueAxios, axios); 

Vue.config.productionTip = false;
let loading;
router.beforeEach((to, from, next) => {
  loading = Element.Loading.service();
  next()
})

router.afterEach((to, from, next) => {
  loading.close();
})

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app');
