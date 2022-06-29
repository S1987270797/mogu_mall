export function debounce(func, delay = 100) { // 为了有时候可以不执行这个定时器
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args); // apply(对象, 接受的参数-数组); 接受的agrs来自refresh函数传过来的实参
        }, delay);
        if (args[0] == true) {
            clearTimeout(timer)
        }
    };
}
/* export function debounce(func, delay=100) { // 最原始的debounce防抖函数
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args); // apply(对象, 接受的参数-数组); 接受的agrs来自refresh函数传过来的实参
        }, delay);
    };
} */

export function formatDate(date, fmt) {
    // 1.获取年份
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    // 
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;

}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}