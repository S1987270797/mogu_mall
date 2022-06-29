import { ADD_COUNT, ADD_TO_CART } from "./mutations-type"
export default {
    addCart(context, payload) {
        // 2.coderwhy方法
        // 这个方法即做了添加元素又做了商品的数量+1 所以我们将复杂的数据放在actions
        return new Promise((resolve, reject) => {
            let existProduct = context.state.cartList.find(item => { // 这个数组的方法的用法作用是遍历所有元素,且在函数体里面判断满足函数体内的条件的话就返回这个item
                return item.iid === payload.iid
            })
            if (existProduct) {
                // existProduct.count += 1
                context.commit(ADD_COUNT, existProduct)
                resolve('商品count+1')
            } else {
                payload.count = 1;
                // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('追加商品')
            }
        })
    }
}