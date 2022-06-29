<template>
    <div class="categoryMiniWall">
        <tab-control :titles="titles" class="tabControl"></tab-control>
        <goods-list v-bind="$attrs"></goods-list>
    </div>
</template>

<script>
import TabControl from "components/content/TabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
export default {
    name: "CategoryMiniWall",
    components: {
        TabControl,
        GoodsList,
    },
    data() {
        return {
            titles: ["综合", "新品", "销量"],
        };
    },
};
</script>

<style scoped>
.categoryMiniWall {
    background-color: #fff;
    margin-top: 0.4rem;
}
</style>