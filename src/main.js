import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//全局方法
import Verify from './utils/validator'
Vue.config.productionTip = false
//注册全局组件
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
Vue.component("Footer",Footer)
Vue.component("Header",Header)

Vue.prototype.$Verify = Verify
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
