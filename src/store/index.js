import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem  } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user'), //当前登录用户的登录状态
    loginIs: false   //是否登录
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      //本地数据持久化
      setItem("user",JSON.stringify(state.user))
    },
    setLoginIs(state,data) {
      state.loginIs = data
    }
  },
  actions: {
  },
  modules: {
  }
})
