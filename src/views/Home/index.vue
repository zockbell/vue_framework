<template>
  <div class="homeWrapper">
    <HeaderNav :back="false">首页</HeaderNav>
    <h1 class="animated infinite pulse iconfont icon-Favorites"></h1>
    <Count />
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import Count from '@/components/Count'

export default {
  name: 'home',
  components: {
    HeaderNav,
    Count
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/home';
</style>
