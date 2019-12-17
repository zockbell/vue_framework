import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
import count from './modules/count'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,  // 只能通过mutations来更改状态，不支持异步
  modules: {
    count
  },  
  plugins: [logger()]  // 打印vuex日志插件
})
