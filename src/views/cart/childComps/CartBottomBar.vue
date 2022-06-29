<template>
    <div class="bottom-bar">
        <check-button
            class="check-button"
            :is-select="isCheckedAll"
            @click.native="checkAllClick"
        ></check-button>
        <div class="content">
            <i>全选</i>
            <em>合计:￥{{ totalPrice }}</em>
            <span @click="cartClick">去结算{{ totalChecked.length }}</span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "./CheckButton.vue";
export default {
    name: "CartBottomBar",
    components: {
        CheckButton,
    },
    computed: {
        ...mapGetters(["cartList", "totalChecked", "totalPrice"]),
        // 根据元素判断是否 点亮全选按钮
        isCheckedAll() {
            if (this.cartList.length === 0) return false;
            return !this.cartList.find((item) => {
                // find返回的是匹配的第一个元素, 没有符合的元素返回undefined
                return !item.checked; // 有等于false的item代表 不全选
            });
        },
    },
    methods: {
        // 点击全选按钮
        checkAllClick() {
            if (this.isCheckedAll) {
                // 为true就是全选按钮已经点亮, 现在要做的就是全部不选
                /* this.cartList.forEach((item) => {
                    item.checked = false;
                }); */
                // 需要在mutations里面操作store数据
                this.$store.commit("checkedChangeAll", false);
            } else {
                this.$store.commit("checkedChangeAll", true);
            }
        },
        // 是否显示 "请选择商品文字"
        // 一个没选的时候 和 购物车没有东西的时候
        cartClick() {
            if (!this.totalChecked.length) {
                this.$emit("cartClick"); // 未解决
            }
        },
    },
};
</script>

<style scoped>
.bottom-bar {
    max-width: 750px;
    min-width: 320px;
    /* 有了fixed就已经不在body里面了 */
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    bottom: 1.76rem;
    width: 100%;
    height: 1.56rem;
    background-color: #fff;
    box-shadow: 0 0.02rem 0.4rem rgba(0, 0, 0, 0.2);
}
.bottom-bar .content {
    font-size: 0.72rem;
    float: right;
    width: 90%;
    height: 1.56rem;
    line-height: 1.56rem;
}
.bottom-bar .content em {
    margin-left: 0.6rem;
}
.bottom-bar .content span {
    float: right;
    width: 30%;
    height: 1.56rem;
    text-align: center;
    background-color: #ea2b01;
    color: #fff;
}
</style>
