import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import NutUI from '@nutui/nutui';
import '../public/config/style/main.css';
import '@nutui/nutui/dist/nutui.css';
import {appEnv} from '../public/config/env/index' //定制环境变量
import imgUrl from '../public/config/imgFormat/imgUrl' //控制图片URL
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
NutUI.install(Vue);
Vue.config.productionTip = false
Vue.prototype.$sysConfig = appEnv()
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.filter('imgurl', imgUrl);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
