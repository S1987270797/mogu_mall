import axios from 'axios';

// 封装 4
export function request(config) {
    // return new Promise((resolve, reject) => {  //没有必要写这个promise,因为instance(其实也是axios)发送请求默认就是返回一个promise
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    // 2.axios拦截器
    instance.interceptors.request.use(config => {
        // console.log(config);
        return config; // 拦截后 又不将它返回, 调用的地方就拿不到需要的东西就会,调用的地方就会调用获取失败时获取的函数
        /*
            什么时候使用拦截器
            1.比如config中的一些信息不符合服务器的要求
            2.比如每次发送网络请求时,都希望在界面中显示一个请求的图标
            3.某些网络请求(比如登录注册(token)),就必须携带一些特殊的信息
         */
    }, err => {
        console.log(err);
    })

    // 2.2 响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        // 拦截后 处理完数据 还要将数据返回 不然客户端接收不到数据
        return res.data; // 只需要返回data就够了
    }, err => {
        console.log(err);
    })
    // 发送真正的网络请求
    return instance(config)
    /*      .then(res => {
             resolve(res)
         })
         .catch(err => {
             reject(err)
         })
         //  将then和catch返回到调用的地方处理
         */
    // })
}
