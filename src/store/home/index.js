// 引入home模块下的所有数据
import { reqPersonalized, reqAlbumNewset, reqAlbumNew } from '@/api'

const state = {
  PersonalizedList: {},
  newAlbum: []
}

const mutations = {
  GETPERSONALIZED (state, data) {
    state.PersonalizedList = data
  },
  GETNEW (state, data) {
    state.newAlbum = data
  }
}

const actions = {
  // 获取热门推荐
  async getPersonalized ({ commit }, limit) {
    const result = await reqPersonalized(limit)
    if (result.code === 200) {
      commit('GETPERSONALIZED', result.result)
    }
  },
  // 获取新碟上架
  async getNew ({commit}) {
    let result = await reqAlbumNewset()
    if (result.code == 200) {
      commit('GETNEW', result.albums)
    }
  },
  // 获取全部新碟
  async getAlbumAll ({commit}, {limit, offset, area}) {
    let result = await reqAlbumNew(limit = limit, offset = offset, area = area)
    console.log(result)
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
