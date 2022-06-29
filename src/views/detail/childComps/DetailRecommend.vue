<template>
    <div class="DetailRecommend">
        <!-- 推荐的标题 -->
        <div class="recommendTitle">
            <i></i>
            <h5>热卖推荐</h5>
        </div>
        <goods-list v-bind="$attrs"></goods-list>
    </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";
export default {
    name: "DetailRecommend",
    components: {
        GoodsList,
    },
};
</script>

<style scoped>
/* 
recommend的title
 */
.recommendTitle {
    height: 1rem;
    text-align: center;
    line-height: 1.24rem;
}
.recommendTitle h5 {
    position: relative;
    display: inline-block;
    height: 100%;
    font-size: 0.56rem;
    font-weight: 400;
}
.recommendTitle i {
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    background: url('~assets/img/detail/detail_bottom.png') no-repeat;
    background-size: 0.6rem;
    background-position: -0.02rem -1.42rem;
    margin-bottom: -0.1rem;
    margin-right: 0.1rem;
}
.recommendTitle h5::before,
.recommendTitle h5::after {
    content: '';
    position: absolute;
    top: 0.64rem;
    left: -2rem;
    width: 1rem;
    height: 0.02rem;
    background-color: red;
}
.recommendTitle h5::after {
    left: 2.5rem;
}
</style>

/* 
    使用了爷传孙 
    爷 用                   <detail-recommend :goods="recommendInfo"></detail-recommend> 
    父 props没有recommend 通过v-bind="$attrs" 把不接受的数据放在$attrs里面 子孙们就可以使用props得到$attrs里面的数据(采用键值对的形式)
                            <goods-list v-bind="$attrs"></goods-list>
    子 props: {
        goods: {
            type: Array,
            default() {
                return [];
            },
        },
    },
 */