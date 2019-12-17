import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { // 初始
    path: '/',
    redirect: '/login'
  },
  { // home
    path: '/home',
    name: 'home',
    component: () => import('../views/Home'),
    meta:{
      title:"home",
      keepAlive: true
    }
  },  
  { // 关于我们
    path: '/about',
    name: 'about',
    component: () => import('../views/About'),
    meta:{
      title:"关于我们"
    }
  },
  { // 登录
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
    meta:{
      title:"登录"      
    }
  },
  { // 课文朗读
    path: '/read',
    name: 'read',
    component: () => import('../views/Read'),
    meta:{
      title:"课文朗读",
      login: true
    }
  },
  { // 404
    path: '*',
    name: 'NotFound404',
    component: () => import('../views/404'),
    meta:{
      title:"页面不存在"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savePosition){
    if(savePosition){
      return savePosition;
    } else {
      return {x: 0, y:0}
    }
  }
})

/**
 * 导航守卫
 * 全局前置守卫，判断用户是否为登录状态
 */
router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
  if(to.matched.some((item) => item.meta.login)){

    let user_id = localStorage.getItem("user_id")
    if(user_id){
      next()
    }else{
      router.push({
        path: "/login",
        query: {
          redirect: to.path.slice(1)
        }
      })
    }

  }else{

  }
  next()
})

export default router
