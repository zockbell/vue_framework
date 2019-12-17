<template>
    <!-- 底部tab切换 -->
    <div class="tabWrapper">
        <router-link to="/login">
            <i class="iconfont icon-dl"></i>
            登录
        </router-link>
        <router-link to="/home">
            <i class="iconfont icon-shouye"></i>
            首页
        </router-link>
        <router-link to="/read">
            <i class="iconfont icon-yinpin"></i>
            音频
        </router-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/components/tab';
</style>