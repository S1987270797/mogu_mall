<template>
    <div class="detailBottomBar">
        <div class="bottomBar">
            <div class="left">
                <div class="service">
                    <i></i>
                    <em>客服</em>
                </div>
                <div class="shop">
                    <i></i>
                    <em>店铺</em>
                </div>
                <div class="star">
                    <i></i>
                    <em>收藏</em>
                </div>
            </div>
            <div class="right">
                <div class="addCart" @click="addToCart">加入购物车</div>
                <div class="buy">购买</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailBottomBar",
    methods: {
        addToCart() {
            this.$emit('cartClick')
        }
    }
};
</script>

<style scoped>
.detailBottomBar {
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    bottom: 0;
    width: 15rem;
    height: 1.76rem;
    background-color: #fff;
    z-index: 99;
    box-shadow: 0rem 0.02rem 0.2rem 0.02rem rgba(0, 0, 0, 0.2);
}
.bottomBar {
    height: 100%;
    display: flex;
}
.bottomBar .left,
.bottomBar .right {
    display: flex;
    flex: 1;
}
.bottomBar .left div {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.4rem;
}
.bottomBar .right div{
    font-size: 0.52rem;
    text-align: center;
    line-height: 1.76rem;
}
.bottomBar .right .addCart {
    width: 60%;
    background-color: #ffe817;
}
.bottomBar .right .buy {
    color: #fff;
    width: 40%;
    background-color: #ff6699;
}
/* 插入图标开始 */
.bottomBar .left i{
    width: 1rem;
    height: 1rem;
    background-color: #fff;
    background: url('~assets/img/detail/detail_bottom.png') no-repeat;
    background-size: 0.88rem 6rem;
    background-position: 0rem 0rem;
    margin-bottom: 0.1rem;
}
.bottomBar .left .service i {
    background-position: 0.08rem -2rem;
}
.bottomBar .left .shop i {
    background-position: 0.08rem -3.8rem;
}
.bottomBar .left .star i {
    background-position: 0.08rem 0.17rem;
}
</style>