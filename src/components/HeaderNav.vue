<template>
    <div class="headerNavWrapper">
        <i v-if="back" class="iconfont icon-fanhui" @click="goBack"></i>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        back:{
            type: Boolean,
            default: false
        }
    },
    methods: {
        goBack(){
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/components/headerNav';
</style>