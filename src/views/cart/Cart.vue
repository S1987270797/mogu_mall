<template>
    <div class="cart">
        <!-- 导航栏 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{ cartLength }})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <scroll class="content" ref="scroll">
            <cart-list></cart-list>
        </scroll>
        <!-- 底部bar -->
        <cart-bottom-bar @cartClick="cartClick"></cart-bottom-bar>
        <!-- 弹窗 -->
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
import scroll from "components/common/scroll/Scroll";
export default {
    name: "Cart",
    components: {
        NavBar,
        CartList,
        CartBottomBar,
        scroll,
    },
    computed: {
        // 1.如何做到直接将store里面的getters的属性直接放在组件里面使用. 1)导入mapGetters 2)使用mapGetters
        ...mapGetters(["cartLength"]), // 语法1
        // 语法2,自定义名称
        /* ...mapGetters({
            length: "cartLength",
        }), */
    },
    methods: {
        cartClick() {
            /* this.isShow = true;  // 原始封住插件的调用
            this.message = "请选择商品";

            setTimeout(() => {
                this.isShow = false;
            }, 2000); */
            this.$toast.show("请选择商品", 2000);
        },
    },
    activated() {
        this.$refs.scroll.refresh();
    },
};
</script>

<style scoped>
.cart {
    height: 100vh;
}
.nav-bar {
    /* position: relative; */
    background-color: var(--color-tint);
    color: #fff;
}
.content {
    height: calc(100% - 1.76rem - 1.76rem - 1.56rem);
    margin-top: 1.76rem;
    overflow: hidden;
}
</style>

/* 
1.开始制作点击按钮 选中商品
    需求是加入购物车之后，打开购物车所有商品默认是选中状态。需要在actions里面或者mutations里面加上payload.checked = true;
2.制作点击选择点击取消
    直接在CartListItem写，改变vuex里面的数据,改变checked属性.
    点击哪个需要告诉vuex的state的cartList, 再根据下标找到对应的商品进行修改.
 */