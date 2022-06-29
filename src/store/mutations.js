// import { ADD_COUNT, ADD_TO_CART, CHECKEDCHANGE } from "./mutations-type"
import * as MTypes from "./mutations-type" // 全部导入
export default {
    // 商品数量加 1
    [MTypes.ADD_COUNT](state, payload) {
        payload.count++; // 这里可以直接改这个东西 ? . confirmed确实可以 state的数据也会变化. vuex应该会自动匹配在参数state里面找state里面的数据
    },
    // 商品数量 -1
    [MTypes.LESSCOUNT](state, payload) {
        payload.count--;
    },
    // 新增一个商品
    [MTypes.ADD_TO_CART](state, payload) {
        payload.checked = true;
        payload.cartOrder = state.cartOrder++; // 给数据在购物车里面排序
        state.cartList.push(payload)
    },
    // 改变商品选择的状态
    [MTypes.CHECKEDCHANGE](state, payload) {
        payload.checked = !payload.checked;
        // state.cartList[payload.cartOrder].checked = !payload.checked;
    },
    // 改变所有商品的选择状态
    checkedChangeAll(state, payload) {
        state.cartList.forEach((item) => {
            item.checked = payload;
        });
    },

}