import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由组件
import routes from './routes.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

export default router
