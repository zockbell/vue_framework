import qs from "qs"
import axios from "axios"

// 用户登录的平台秘钥（获取用户信息携带）
window.platform_key="pep_click";

// 登录
export async function Login(data) {
    const res = await axios.post("user/ak/"+window.platform_key+"/login.anys", qs.stringify(data));
    return res.data;
}

// 课文朗读
export async function Read() {
    const res = await axios.get('/static/repository/audio_res.json');
    return res.data;
}

// 幻灯片
export async function Carousel() {
    const res = await axios.get('/system/carousel_img.anys?app_version=3.8.0');
    return res.data;
}