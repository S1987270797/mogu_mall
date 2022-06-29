import { request } from './request';

// 发送detail页面的请求
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
export function getDetailRecommend() {
    return request({
        url:'/recommend',
    })
}

// 1.获取商品基本简介信息
export class GoodsInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discountDesc = itemInfo.discountDesc
        this.lowNowPrice = itemInfo.lowNowPrice
        this.columns = columns
        this.services = services
    }
}
// 2.获取商品商家信息
export class StoreInfo {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.cFans = shopInfo.cFans;
        this.cGoods = shopInfo.cGoods;
        this.cSells = shopInfo.cSells;
        this.score = shopInfo.score;
    }
}
// 3.获取详情图片参数 
// 比较简单直接在获取数据时处理

// 4.获取尺寸相关的数据,参数信息
export class ItemParams {
    constructor(ItemParams) {
        // 尺寸、
        this.disclaimer = ItemParams.rule.disclaimer;
        this.sizeTable = ItemParams.rule.tables[0];
        this.infoSet = ItemParams.info.set;
        // 评价 rating, 太简单了直接传了，为了少在detail主页里面传几个数据，还是在这写了
        /* this.user = rate.list[0].user;
        this.rContent = rate.list[0]; */
        // this.rate = rate;
    }
}
