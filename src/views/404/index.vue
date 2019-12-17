<template>
    <div class="404Wrapper">
        <div class="error"> 
            <span>页面找不到了</span>
            <router-link :to="{name:'home'}" target="_blank">返回首页</router-link>
        </div>
        <div class="sun"></div>
        <div class="clouds">
        <div></div>
        <div></div>
        <div></div>
        </div>
        <div class="birds"></div>
        <div class="sea">
        <div class="wave w-1"></div>
        <div class="wave w-2"></div>
        <div class="fish"><span></span><span></span><span></span>
        </div>
        </div>
        <div class="bottom">
        <div class="grass"><span> </span><span> </span><span> </span>
        </div>
        <div class="grass"><span> </span><span> </span><span> </span>
        </div>
        <div class="grass"><span> </span><span> </span><span> </span>
        </div>
        <div class="grass"><span> </span><span> </span><span> </span>
        </div>
        <div class="circle"><span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="circle"><span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="circle"><span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="circle"><span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="grass_tw"></div>
        <div class="grass_tw"></div>
        <div class="grass_tw"></div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
       
    }
}
</script>
<style lang="sass">
@import "@/assets/styles/404";
</style>