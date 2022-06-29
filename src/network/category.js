import { request } from "./request"

// 整体外面一层的数据
export function getCategory() {
    return request({
        url: '/category'
    })
}
// 右边内容的上面部分
export function getSubCategory(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey: maitKey
        }
    })
}

// miniWall
export function getMiniWall(key) {
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey: key,
        }
    })
}