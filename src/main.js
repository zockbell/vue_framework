import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import '../src/utils/rem'
import 'animate.css'
import "./assets/styles/common.scss"
import "./assets/fonts/iconfont.css"
import "@/api/axiosConfig"

// 声明全局axios
Vue.prototype.$axios = axios;

// 全局过滤器
import * as filtration from '@/utils/filter'
Object.keys(filtration).forEach(key => {
  Vue.filter(key, filtration[key])
})

// vant框架按需引入组件
import { CellGroup, Field, NumberKeyboard, Button, Search , Row, Col, Tab, Tabs, Popup, Skeleton, Swipe, SwipeItem, Lazyload, Pagination, Slider } from 'vant';
const vantComponents = [];
vantComponents.push(CellGroup, Field, NumberKeyboard, Button, Search , Row, Col, Tab, Tabs, Popup, Skeleton, Swipe, SwipeItem, Lazyload, Pagination, Slider);
vantComponents.forEach(item => {
  Vue.use(item);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
