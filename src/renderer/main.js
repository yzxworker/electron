import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';

// vue-ueditor
import '../../static/UE/ueditor.config.js'
import '../../static/UE/ueditor.all.min.js'
import '../../static/UE/lang/zh-cn/zh-cn.js'
import '../../static/UE/ueditor.parse.min.js'



import App from './App';

Vue.use(Element, { size: 'small' });
axios.defaults.headers.post['Content-Type'] = 'application/json';
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
