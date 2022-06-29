<template>
    <div class="tab-bar-item" v-on:click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div v-bind:style="activeStyle">
            <slot name="item-text"></slot>
            <!-- slot最后会被替换 绑定的事件会跟随slot标签消失 -->
        </div>
    </div>
</template>

<script>
export default {
    name: "TabBarItem",
    props: {
        path: String,
        activeColor: {
            type: String,
            default: "pink",
        },
    },
    data() {
        return {
            // isActive: true,
        };
    },
    computed: {
        isActive() {
            // this.$route.path route里面记录的的是当前活跃的路由 里面要是有我的路径就说明当前点的是我
            return this.$route.path.indexOf(this.path) !== -1;
        },
        activeStyle() {
            // 有就加上这个颜色
            return this.isActive ? { color: this.activeColor } : {};
        },
    },
    methods: {
        itemClick() {
            this.$router.replace(this.path);
        },
    },
};
</script>

<style>
.tab-bar-item {
    display: flex;
    flex: 1;
    font-size: .36rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 500;
}
.tab-bar-item img {
    width: .8rem;
    height: .8rem;
    margin-top: .06rem;
    margin-bottom: .04rem;
    vertical-align: middle;
}
/* .active {
    color: red;
} */
</style>