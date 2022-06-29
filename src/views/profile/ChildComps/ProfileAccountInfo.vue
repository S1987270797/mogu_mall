<template>
    <div class="ProfileAccountInfo">
        <div class="surplus">
            <span><em>0.00</em>元</span>
            <p>我的余额</p>
        </div>
        <div class="coupon">
            <span><em>0.00</em>个</span>
            <p>我的优惠</p>
        </div>
        <div class="bonusPoints">
            <span><em>0.00</em>分</span>
            <p>我的积分</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileAccountInfo",
};
</script>

<style scoped>
.ProfileAccountInfo {
    display: flex;
    height: 3.44rem;
    background-color: #fff;
}
.ProfileAccountInfo div {
    flex: 1;
    text-align: center;
    font-size: 0.52rem;
    height: 3.44rem;
}
.ProfileAccountInfo div span em {
    font-size: 0.96rem;
}
.ProfileAccountInfo div span {
    /* 只有block的盒子才可以使用margin和padding */
    display: inline-block;
    margin-top: 0.48rem;
    font-size: 0.44rem;
}
</style>