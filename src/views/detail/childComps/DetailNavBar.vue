<template>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <i>箭头</i>
        </div>
        <div slot="center" class="title">
            <div
                v-for="(item, index) in titles"
                :key="index"
                class="title-item"
                :class="{ active: index === currentIndex }"
                @click="titleClick(index)"
            >
                {{ item }}
            </div>
        </div>
        <div slot="right" @click="cartClick" class="cartIcon">
            <i class="iconfont icon-gouwucheman"></i>
        </div>
    </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
    name: "DetailNavBar",
    data() {
        return {
            titles: ["商品", "参数", "评论", "推荐"],
            currentIndex: 0, // 默认选择第一个
        };
    },
    components: {
        NavBar,
    },
    methods: {
        titleClick(index) {
            this.currentIndex = index;
            this.$emit("titleClick", index);
        },
        backClick() {
            this.$router.back();
        },
        cartClick() {
            this.$router.replace("/cart");
        },
    },
};
</script>

<style scoped>
.title {
    display: flex;
    justify-content: center;
}
.title .title-item {
    width: 2rem;
    text-align: center;
    font-size: 0.56rem;
}
.active {
    color: var(--color-high-text);
}
.back {
    position: relative;
    width: 100%;
    height: 100%;
}
.back i {
    position: absolute;
    top: 0.7rem;
    left: 0.6rem;
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    border-left: 0.04rem solid #000;
    border-top: 0.04rem solid #000;
    transform: rotate(-45deg);
    font-size: 0;
}
/* cartIcon */
.cartIcon i {
    font-size: 0.64rem;
    color: var(--color-high-text);
}
</style>