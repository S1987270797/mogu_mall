<template>
    <div class="CategoryMenu">
        <scroll class="content">
            <ul class="Menu">
                <li
                    v-for="(item, index) in categories"
                    :key="index"
                    :class="{ active: currentIndex == index }"
                    @click="itemClick(index)"
                >
                    {{ item.title }}
                </li>
            </ul>
        </scroll>
    </div>
</template>

<script>
// better-scroll
import Scroll from "components/common/scroll/Scroll";
export default {
    name: "CategoryMenu",
    components: {
        Scroll,
    },
    data() {
        return {
            currentIndex: 0,
        };
    },
    props: {
        categories: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            // 将点击的哪个告诉父亲, 父亲才好给我们对应的数据
            this.$emit("menuClick", index);
        },
    },
};
</script>

<style scoped>
.CategoryMenu {
    float: left;
    width: 25%;
    height: 100vh;
    /* 为什么这里也要减去88px 其实是下面的. 100vh是能看见的高度,不管navbar是不是fixed布局. 我都要减去他.  */
    font-size: 0.56rem;
    font-weight: 700;
    background-color: #f6f6f6;
}
.Menu li {
    height: 2rem;
    text-align: center;
    line-height: 2rem;
}
.content {
    width: 100%;
    height: calc(100% - var(--nav-hight)*2);
    overflow: hidden;
}
.active {
    color: var(--color-high-text);
    border-left: 0.1rem solid var(--color-high-text);
    /* border-right: 0.1rem solid transparent; */
    background: #fff;
}
</style>