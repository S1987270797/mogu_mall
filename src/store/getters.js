export default {
    cartLength(state) {
        return state.cartList.length;
    },
    cartList(state) {
        return state.cartList
    },
    totalChecked(state) {
        return state.cartList.filter((item, index) => {
            return item.checked;
        })
    },
    totalPrice(state, getters) {
        return getters.totalChecked.reduce((prev, cur, index, arr) => {
            return prev + parseFloat(cur.lowNowPrice) * cur.count;
        }, 0).toFixed(2);
    }
}