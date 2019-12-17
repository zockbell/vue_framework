<template>
    <div class="readWrapper">
        <HeaderNav :back="true">音频</HeaderNav>

        <div class="adver-img">
            <img :src="banner_url" :onerror="defaultImg" alt="央视主持人课文朗读">
        </div>
        
        <div class="content">
            <!-- tab -->
            <van-tabs type="line" v-model="active" animated swipeable>
                <!-- 简介 -->
                <van-tab title="简介">
                    <div class="abstract">
                    　　<p>“中小学语文示范诵读库”是中央广播电视总台和教育部合作的一项公益项目，该项目已被列入《国家语言文字事业“十三五”发展规划》。</p>
                        <p>该项目发挥了中央广播电视总台播音员主持人的专业优势，再加上顶尖的音频制作团队，
                        在创作上精益求精、在声音品质和呈现方式上努力创新，使每件作品达到最佳传播效果。
                        该项目使中央广电总台的播音主持实力和教育部教材的权威性相结合，试图更好地诠释中华传统文化，
                        让社会主义核心价值观融入祖国少年儿童的基因里、血脉中。</p>
                    </div>
                </van-tab>

                <van-tab title="音频">
                    <div class="audio">
                        <!-- 搜索条 -->
                        <van-search placeholder="点此搜索您想听的音频课程" v-model="audioSearch" />

                        <!-- 音频 -->
                        <van-row type="flex" justify="space-around" align="center" v-for="(item , index) in pageList" :key="index">
                            <van-col span="19">
                                <dl>
                                    <dt>{{item.title}}</dt>
                                    <dd>册次：{{item.register}}</dd>
                                    <dd>朗读：{{item.recite}}</dd>
                                </dl>
                            </van-col>
                            <van-col span="5">
                                <i class="iconfont icon-bofang"></i>
                            </van-col>
                        </van-row>
                        
                        <!-- 分页 -->
                        <van-pagination 
                            v-model="currentPage" 
                            :page-count="totalPages"
                            mode="simple"
                            @change="pagination"
                        />
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import { Read } from "@/api/http";

export default { 
    components: {
        HeaderNav
    },  
    data() {
        return {
            active: 1,
            audio:null,
            paused:"",
            value: 0,

            audioData:[],       // 总内容
            lists: 1,           // 总条数
            pageList: [],       // 当前页码显示的内容数
            currentPage: 1,     // 当前页码
            totalPages: 1,      // 总页码
            pageContents: 5,    // 每页显示的条数

            audioSearch: '',
            banner_url: null,
            defaultImg: 'this.src="' + require('@/assets/images/gray_2.png') + '"'
        }
    },
    created() {
        Read({
            appkey: window.platform_key,
            userID: localStorage.getItem("user_id")
        })
        .then(res => {
            // window.console.log(res);
            this.banner_url = res.banner_url;
            this.audioData = res.content;
            this.lists = res.content.length;
            this.pagination();
        })
        .catch(err => {
            window.console.log(err);
        })
    },
    methods: {
        pagination(){
            // 数据一次性加载，后台并未做分布，前端页码遍历
            this.totalPages = Math.ceil(this.lists / this.pageContents);
            this.pageList = this.audioData.slice((this.currentPage - 1) * this.pageContents, ((this.currentPage - 1) * this.pageContents + this.pageContents));
        },
        onChange(value) {
            console.log('当前值：' + value);
        }
    }
}
</script>
<style lang="sass">
@import "@/assets/styles/read"
</style>