<template>
    <!-- <div class="detail-swiper"> 不需要根 -->
    <!-- 轮播图 -->
    <swiper class="detail-swiper">
        <swiper-item v-for="(item,index) in topImages" :key="index">
            <img :src="item" alt="" />
        </swiper-item>
    </swiper>
    <!-- </div> -->
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
    name: "DetailSwiper",
    props: {
        topImages: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            topImagesN: [],
        };
    },
    components: {
        Swiper,
        SwiperItem,
    },
};
</script>

<style scoped>
.detail-swiper {
    height: 16rem;
}
</style>