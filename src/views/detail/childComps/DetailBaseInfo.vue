<template>
    <div v-if="Object.keys(goodsInfo).length !== 0" class="base-info">
        <!-- 头部文字简介 -->
        <h2 class="info-title">{{ goodsInfo.title }}</h2>
        <!-- 价格样式 -->
        <div class="info-price">
            <span class="price-n">{{ goodsInfo.newPrice }}</span>
            <span class="price-o" v-if="goodsInfo.oldPrice">
                {{ goodsInfo.oldPrice }}
            </span>
            <span class="discount-desc" v-if="goodsInfo.discountDesc"> {{ goodsInfo.discountDesc }}</span>
        </div>
        <!-- 底部其他样式 -->
        <div class="info-other">
            <span>{{ goodsInfo.columns[0] }}</span>
            <span>{{ goodsInfo.columns[1] }}</span>
            <span>{{ goodsInfo.columns[2] }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailBaseInfo",
    props: {
        goodsInfo: {
            type: Object,
            default() {
                return {};
            },
        },
    },
};
</script>
<style scoped>
.base-info {
    margin-top: 0.5rem;
    background-color: #fff;
    padding: 0.2rem 0.16rem 1rem;
}
.info-title {
    font-size: 0.72rem;
    line-height: 1.2;
    font-weight: 400;
    color: #000;
}
/* 价格样式 */
.info-price {
    margin: 0.3rem 0;
}
.price-n {
    font-size: 1rem;
    color: var(--color-high-text);
}
.price-o {
    font-size: 0.64rem;
    margin-left: 0.24rem;
    color: #8a8991;
    text-decoration: line-through;
}
.discount-desc {
    font-size: 0.7rem;
    font-weight: 700;
    color: #fff;
    padding: 0.06rem 0.24rem 0.06rem 0.12rem;
    border-radius: 10rem;
    background-color: var(--color-tint);
    text-align: center;
    margin-left: 0.12rem;
}
/* 底部其他样式 */
.info-other {
    display: flex;
    font-size: 0.6rem;
    color: #9a9b9a;
    justify-content: space-between;
    margin-top: 1.8rem;
}
</style>