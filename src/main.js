import Vue from 'vue'
import less from 'less'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as API from '@/api'
import atm from '@/assets/lazyload.gif'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  // 懒加载默认的图片
  loading: atm
})
Vue.use(less)

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
    // 组件实例的原型的 原型指向的是prototype对象
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
