<template>
    <!-- 轮播图 -->
    <swiper>
        <swiper-item v-for="(item, index) in banners" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad" />
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
// 导入swiper  里面就包含swiper的两个组件
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
    name: "HomeSwiper",
    props: {
        banners: {
            //接收一个父亲banners
            type: Array,
            default() {
                return []; // 默认是一个数组
            },
        },
    },
    data() {
        return {
            isLoad: false,
        };
    },
    components: {
        Swiper,
        SwiperItem,
    },
    methods: {
        // 监听轮播图的加载 发送给Home
        imageLoad() {
            if (!this.isLoad) {
                this.$emit("swiperImageLoad");
                this.isLoad = true;
            }
        },
    },
};
</script>
<style>
/* 给home加上padding */
/* #hy-swiper { 
    margin-top: .88rem;
} */
.indicator {
    bottom: 20px !important;
}
</style>