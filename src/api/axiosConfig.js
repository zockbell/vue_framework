import axios from "axios";

// 接口前缀
console.log(process.env.NODE_ENV, '环境')
let dev_pro  = process.env.NODE_ENV;
if(dev_pro == 'production'){
    axios.defaults.baseURL = '/';          // 生产环境配置 
}else{
    axios.defaults.baseURL = '/api/';      // 开发环境配置    
}

axios.defaults.timeout = 20000;


//添加响应拦截器
/*
axios.interceptors.response.use((res)=>{
    //在这里对返回的数据进行处理
    if(res.data.errcode==95||res.data.errcode==96){
        window.source.cancel();
        window.location.href="/login"
    }
    return res;
},(error)=>{
    return Promise.reject(error);
})
*/