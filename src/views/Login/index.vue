<template>
    <div class="loginwrap">
        <div class="logo"><img src="../../assets/images/pep.png" alt="人教数字"></div>
        <van-cell-group>
            <!-- <van-field
                v-model="username"
                required
                clearable
                label="用户名"
                placeholder="请输入用户名"
            />

            <van-field
                v-model="password"
                type="password"
                clearable
                label="密码"
                placeholder="请输入密码"
                required
            /> -->

            <van-field
                readonly
                required
                clickable
                label="用户名"
                placeholder="请输入用户名"
                :value="username"
                @touchstart.native.stop="show = true"
            />

            <van-field
                readonly
                required
                clickable
                label="密码"
                placeholder="请输入密码"
                :value="password"
                type="password"
                @touchstart.native.stop="show2 = true"
            />

            <van-number-keyboard
                v-model="username"
                :show="show"
                extra-key='pep'
                @blur="show = false"
            />

            <van-number-keyboard
                v-model="password"
                :show="show2"
                extra-key='pep'
                @blur="show2 = false"
            />
        </van-cell-group>
        <van-button type="info" block @click="userLogin">登 录</van-button>
        <van-button type="default"  block>新用户注册</van-button>

        <!-- 游客模式 -->
        <router-link class="visitor" :to="{name:'about'}" target="_blank"><i class="iconfont icon-jiaoyin"></i>游客模式</router-link>

        <!-- loading -->
        <Loading v-if="loading" />

        <!-- popup弹出层 -->
        <van-popup
            v-model="showVantPopup"
            round
            position="bottom"
            :style="{ height: '10%' }"
        >
            {{activeText}}
        </van-popup>
    </div>
</template>

<script>
import Loading from '@/components/Loading'
import { Login } from "@/api/http";

export default {
    components: {
        Loading
    },
    data(){
        return {
            loading: false,
            show: false,
            show2: false,
            value: '',
            showVantPopup: false,
            username: '',
            password: '',
            dev_id: "111",
            dev_name: "111",
            activeText: "账号或密码错误!"
        }
    },
    created(){
        //请求拦截器
        this.$axios.interceptors.request.use((config)=>{
                //在请求发出之前进行一些操作
                this.loading = true;
                return config;
            },function(err){
                return Promise.reject(error);
        });
    },
    methods: {
        userLogin(){
            let param=null;
            //账号密码登录
            if (!this.username || !this.password) {
                this.activeText="账号或密码错误!"
                this.showPopup();
                return;
            }

            if(!this.dev_id){                
                this.activeText = '请填写dev_id';
                this.showPopup();
                return;
            }

            if(!this.dev_name){
                this.activeText = '请填写dev_name';
                this.showPopup();
                return;
            }

            param = {
                username: this.username,
                pwd: this.password,
                dev_id: this.dev_id,
                dev_name: this.dev_name
            }

            Login(param)
            .then((res) => {
                // console.log(res)
                if (res.errcode == 110) {
                    localStorage.setItem("access_token", res.access_token);
                    localStorage.setItem("user_id", res.user_info.user_id);
                    localStorage.setItem("name", res.user_info.name);
                    window.access_token=res.access_token;
                    window.user_id=res.user_info.user_id;
                    window.name=res.user_info.name;

                    // 登录成功后跳转
                    // this.$router.push({ name: "User" });
                    let redirect = this.$route.query.redirect
                    if(!redirect){
                        redirect = "home"
                    }
                    this.$router.push({ 
                        path: '/' + redirect
                    });

                }else if(res.errcode == 500482){//账号密码错误
                    this.showPopup();
                    this.activeText = "用户名或密码错误!"
                }else if(res.errcode == 500481){//用户不存在
                    this.showPopup();
                    this.activeText = "用户不存在!"
                }else if(res.errcode == 500487){//设备数量超限
                    this.showPopup();
                    this.activeText = "设备数量超限!"
                }
                else{
                    this.activeText = res.errmsg
                }
            })
            .catch(error => {
                window.console.log(error);
                // this.loadingImg=require("../assets/images/fault.gif")
            });
        },
        showPopup() {
            this.showVantPopup = true;
            this.loading = false;
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/styles/login";
</style>