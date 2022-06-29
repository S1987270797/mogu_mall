<template>
    <div class="GoodsList">
        <goods-list-item
            v-for="(item, index) in goods"
            :key="index"
            :goodsItem="item"
        ></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
    name: "GoodsList",
    props: {
        goods: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    components: {
        GoodsListItem,
    },
};
</script>

<style>
.GoodsList {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-evenly;
    padding-top: .2rem;
}
</style>