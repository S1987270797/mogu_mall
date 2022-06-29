<template>
    <div class="tab-control">
        <div
            v-for="(item, index) in titles"
            :key="index"
            class="tab-control-item"
            :class="{ active: currentIndex == index }"
            @click="itemClick(index)"
        >
            <span>{{ item }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabControl",
    props: {
        titles: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            currentIndex: 0,
        };
    },
    methods: {
        /* 点击切换的做法
        1. 给每个item加上一个index
        2. data设置变量 保存当前的点击的item的index的值 
        3.绑定点击事件 将自己的index传给currentIndex 
        就是每个item 都一直监听着 :class="{ active: currentIndex == index } 一符合我的条件我就给自己加上active属性
         */
        itemClick(index) {
            this.currentIndex = index;
            // 将点击的事件告诉外部 来切换tab栏
            this.$emit("tabClick", index);
        },
    },
};
</script>

<style>
.tab-control {
    display: flex;
    text-align: center;
    font-size: 0.6rem;
    height: 1.85rem;
    line-height: 1.85rem;
    background-color: #fff;
    z-index: 999;
}
.tab-control-item {
    flex: 1;
}
.tab-control-item span {
    padding: 0.2rem;
}
.active {
    color: var(--color-high-text);
    /* 这就话的意思就是如果data里面的currentIndex==我的index属性的值,那么就加上active这个属性 */
}
.active span {
    box-sizing: border-box;
    border-bottom: 3px solid var(--color-high-text);
}
</style>