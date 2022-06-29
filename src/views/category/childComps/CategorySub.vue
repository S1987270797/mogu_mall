<template>
    <div class="categorySub">
        <ul class="box">
            <li v-for="(item, index) in subCategories" :key="index">
                <a :href="item.link">
                    <img :src="item.image" alt="" />
                    <p>{{ item.title }}</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "categorySub",
    props: {
        subCategories: {
            type: Array,
            default() {
                return [];
            },
        },
    },
};
</script>

<style scoped>
.categorySub {
    background-color: #fff;
}
.box {
    display: flex;
    flex-wrap: wrap;
}
.box li {
    width: 33.3333%;
    text-align: center;
    font-size: 0.44rem;
    padding: 0.24rem 0.16rem;
}
.box img {
    width: 3rem;
    padding: 0.24rem 0.16rem;
}
</style>