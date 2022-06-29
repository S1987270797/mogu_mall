<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
    name: "Scroll",
    data() {
        return {
            scroll: null,
        };
    },
    props: {
        probeType: {
            type: Number,
            default() {
                return 0;
            },
        },
        pullUpLoad: {
            type: Boolean,
            default() {
                return false;
            },
        },
    },
    mounted() {
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            observeDOM: true, // 这个是为了 加上better-scroll可以滑动的(必加)
            click: true, // 这个是让在better-scroll里面的 div等其他的非buttom的元素也可以点击
            probeType: this.probeType, // 让使用者来决定是否需要监听事件, 而不是添加一个默认事件. 每次都监听但是又不用会影响性能. 1.(目前)无效果 2.监听滚动的位置,松手后就结束监听 3.一直监听到页面停下来
            pullUpLoad: this.pullUpLoad, //是否监听下拉
        });
        // 2.监听滚动的位置
        if (this.probeType === 2 || this.probeType == 3) {
            this.scroll.on("scroll", (position) => {
                // 1.判断backTop是否显示
                // 发射事件给Home组件 交给Home来处理
                this.$emit("scroll", position);

                // 2.tabControl是否加吸顶(fixed) 到哪里就加fixed(在home里面做)
            });
        }

        // 3.监听上拉时的事件
        if (this.pullUpLoad) {
            // 加强逻辑 没有的时候就不监听
            this.scroll.on("pullingUp", () => {
                this.$emit("pullingUp");
            });
        }
    },
    methods: {
        // 这里是为了实现封装的思想 不要要父亲直接操作我的东西; 而是我把东西封装好给父亲用,我自愿的. 前者是强制的.
        // 但是我为了代码好读一点 还是直接让父亲操作
        scrollTo(x, y, time = 300) {
            this.scroll.scrollTo(x, y, time);
        },
        // 每次拉完都重新计算下一次下拉
        finishPullUp() {
            this.scroll.finishPullUp();
        },
        // 每次有图片进来就刷新一下better-scroll让他重新计算一下滚动的高度
        refresh() {
            console.log("refresh in scroll");
            this.scroll && this.scroll.refresh();
        },
        // 获取content目前滚动到的位置 y
        getScrollY() {
            return this.scroll.y;
        },
    },
};
</script>

<style>
</style>