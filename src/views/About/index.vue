<template>
  <div class="aboutWrapper">
    <HeaderNav :back="true">关于我们</HeaderNav>

    <!-- 骨架屏应用 -->
    <van-skeleton
      title
      :row="3"
      :loading="loading"
    >
      <!-- 幻灯片 -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <a :href="image.link">
            <img :src="image.url" />
          </a>
        </van-swipe-item>
      </van-swipe>
    </van-skeleton>

    <div class="profile">
      <h2>公司简介</h2>
      <p>人教数字出版有限公司成立于2012年5月23日，是人民教育出版社为加快推进数字化转型升级而成立的专职、专业、专注的教育数字出版公司，是国家高新技术企业，注册资本2.25亿元。</p>
      <p>公司以传统出版战略转型和产业升级为契机，以人民教育出版社的品牌优势、资源优势和市场优势为基础，以服务基础教育信息化和数字化学习为导向，以建设优质数字教育资源为重点，不断推出适合教学需要和市场需求的优质数字产品和服务，为数字化教与学提供整体解决方案，全力打造中国基础教育数字出版第一品牌。</p>
    </div>

  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import { Carousel } from '@/api/http'

export default {
  components: {
    HeaderNav
  },
  data() {
    return {
      loading: true,
      images: []
    }
  },
  created(){
    // setTimeout(() => {  //这里的setTimeout为了测试骨架屏
      Carousel()
      .then(res => {
        this.loading = false;
        // window.console.log(res);
        this.images = res.imgs;
        // for(let i=0; i<res.imgs.length; i++){
        //   this.links.push(res.imgs[i].link)
        //   this.images.push(res.imgs[i].url);
        // }
      })
      .catch(err => {
        window.console.log(err);
      })
    // },1000)
  }
}
</script>

<style lang="sass">
@import "@/assets/styles/about";
</style>