import { request } from './request'

// home的轮播图和推荐请求
export function getHomeMutidata() {
    return request({
        url: '/home/multidata'
    })
}

// home的 tabControl
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}