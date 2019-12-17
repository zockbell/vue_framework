<template>
  <div id="app">
    <!-- 动画 -->
    <transition name="fadeIn">
      <!-- 需要缓存的路由页面 -->
      <keep-alive>        
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition name="fadeIn">
      <router-view style="position:absolute; left:0; top:0; width: 100%; box-sizing: border-box;" v-if="!$route.meta.keepAlive"></router-view>
    </transition>

    <Tab />
  </div>
</template>

<script>
/**
 * 1. 引入组件 
 * 2. 注册组件 
 * 3. 使用组件
 */
import Tab from '@/components/Tab.vue'

export default {
  components: {
    Tab
  }
}
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fadeIn-enter {
  opacity: 0;
}

.fadeIn-enter-active {
  transition: all .2s linear;
  opacity: 1;
}

.fadeIn-leave-active {
  transition: all .2s linear;
  opacity: 0;
}
</style>
