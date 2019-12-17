/**
 * 全局过滤器
 */

// 保存两位小数
let keepTwoNum = value => {
    return value.toFixed(2)
}

// 折扣金额添加人民币标识(￥)
let discountRmbPrice = value => {
    return '&yen;' + (value).toFixed(2)
}

// 有效期天数转为月份
let month = value => {    
    return value = parseInt(value / 30)
}

// 添加过滤器，手机号中间四位用*号代码
let oldCellphone = value => {
    let start = value.slice(0,4);
    let end = value.slice(-4);
    return `${start}****${end}`;
}

// mp3时间格式
let timeFormat = value => {
    if(value < 10){
        return '00:0' + parseInt(value);
    }else if(value >= 10 && value < 60){
        return '00:' + parseInt(value);
    }else if(value > 60){
        let min = Math.floor(value/60);
        if(min < 10){
            min = "0" + min
        }
        let sec = parseInt(value % 60);
        if(sec < 10){
            sec = "0" + sec;
        }
        return min + ':' + sec;
    }
}

// 将秒钟转换成分钟
let secondToMinute = value => {
    if(value < 10){        
        return '00:' + addZero(value);
    }else if (value >= 10 && value < 60){
        return "00:" + addZero(value);
    }else if(value >= 60){
        const m = Math.floor(value / 60);
        const s = value % 60;
        return addZero(m) + ':' + addZero(s);
    }
}

// 判断数字小于10，在前添加0
const addZero = value => {
    return value < 10 ? '0' + value : value;
}

export { 
    keepTwoNum,
    month,
    oldCellphone,
    discountRmbPrice,
    timeFormat,
    secondToMinute
}