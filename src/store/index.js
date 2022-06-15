import Vue from 'vue'
import Vuex from 'vuex'
// 引入小仓库
import login from './login'
import home from './home'
import music from './music'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    home,
    music
  }
})
