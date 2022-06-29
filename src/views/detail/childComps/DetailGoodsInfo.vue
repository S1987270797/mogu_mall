<template>
    <div
        id="detail-goods-info"
        v-if="Object.keys(detailGoodsInfo).length !== 0"
    >
        <div class="detail-desc">
            <i></i>
            <p>{{ detailGoodsInfo.desc }}</p>
            <i></i>
        </div>
        <div class="detail-image">
            <h4>
                {{ detailGoodsInfo.detailImage[0].key }}
            </h4>
            <ul class="image-list">
                <li
                    v-for="(item, index) in detailGoodsInfo.detailImage[0].list"
                    :key="index"
                >
                    <!-- <img :src="item" @load="imageLoad" alt="" /> -->
                    <!-- 加入懒加载 -->
                    <img v-lazy="item" @load="imageLoad" alt="" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailGoodsInfo",
    props: {
        detailGoodsInfo: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            counter: 0,
            imagesLength: 0,
        };
    },
    methods: {
        imageLoad() {
            // 为了性能, 等图片全部加载完成就只要发送一次请求
            // 1.自己处理的方法
            /* if (++this.counter === this.imagesLength) {
                this.$emit("imagesLoaded");
            } */
            // 2.通过使用debounce节流阀函数
            this.$emit("imagesLoaded");
        },
    },
    watch: {
        //每次props接收的数据变化时
        detailGoodsInfo() {
            // detailGoodsInfo监听
            this.imagesLength = this.detailGoodsInfo.detailImage[0].list.length;
        },
    },
};
</script>

<style scoped>
#detail-goods-info {
    /* height: 20rem; */
    /* 就因为在这里加了一个20rem 导致我better-scroll可以滚动的区域一直是两千多(20rem加上其他的一些高度)
    一天多才都没改出来. 
    刚开始在这里加是因为为了排版时可以看到下面 这里他妈的又刚好设置的是ID选择器, id选择器比better-scroll设置的content类名权限高 
    不要给要滚动的组件加高度
    我去看看其他的组件加了高度不
    */
    background-color: #fff;
    padding: 0.6rem 0;
    font-size: 0.52rem;
}
.detail-desc {
    overflow: hidden;
}
.detail-desc i {
    position: relative;
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #000;
}
.detail-desc i::after {
    content: "";
    display: block;
    width: 4rem;
    height: 0.4rem;
    border-bottom: 0.02rem solid #000;
}
.detail-desc i:last-child {
    float: right;
}
.detail-desc i:last-child::after {
    /* margin-left: 6rem; */
    position: absolute;
    bottom: 0;
    right: 0;
}
.detail-desc p {
    margin: 0.4rem 0;
}
/* 
细节图片
*/
.detail-image h4 {
    margin: 0.4rem 0;
}
/* 图片开始 */
.image-list img {
    width: 100%;
}
</style>

/* 
    1.监听图片的加载, 加载完成再重新计算better-scroll的高度 
    2. vue.runtime.esm.js?2b0e:619 [Vue warn]: Error in render: "TypeError: Cannot read property '0' of undefined"
        这个报错是在模板已经开始加载了,但是数据是有异步的,这时候会使用默认的空对象, 报错 undefined; 使用 v-if="Object.keys(detailGoodsInfo).length !== 0"
 */

/* 
    所有图片加载完刷新better-scroll高度需要添加 防抖函数 提高性能
    方法1: 监听图片的加载,当已经加载完的图片 等于 需要加载的图片时就发射一次事件告诉Detail组件刷新一次better-scroll
    方法2: 使用之前封装的 debounce
 */