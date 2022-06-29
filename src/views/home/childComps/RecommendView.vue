<template>
    <div class="recommend">
        <div v-for="item in recommend" class="item">
            <a :href="item.link">
                <img :src="item.image" alt="" />
                <div>{{ item.title }}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "RecommendView",
    props: {
        recommend: {
            type: Array,
            default() {
                return [];
            },
        },
    },
};
</script>

<style>
.recommend {
    display: flex;
    text-align: center;
    margin-top: .2rem;
    padding-bottom: .6rem;
    border-bottom: .16rem solid #eee;
    font-size: .36rem;
    background-color: #fff;
}
.item {
    flex: 1;
    margin-top: .6rem;
}
.item img {
    width: 2rem;
    margin-bottom: .06rem;
}
</style>