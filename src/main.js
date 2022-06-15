import Vue from 'vue'
import less from 'less'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as API from '@/api'
import VueLazyload from 'vue-lazyload'
Vue.use(less)

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
