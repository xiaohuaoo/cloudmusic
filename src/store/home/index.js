// 引入home模块下的所有数据
import { reqPersonalized } from '@/api'

const state = {
  PersonalizedList: {}
}

const mutations = {
  GETPERSONALIZED (state, data) {
    state.PersonalizedList = data
  }
}

const actions = {
  // 获取热门推荐
  async getPersonalized ({ commit }, limit) {
    const result = await reqPersonalized(limit)
    if (result.code === 200) {
      commit('GETPERSONALIZED', result.result)
    }
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
