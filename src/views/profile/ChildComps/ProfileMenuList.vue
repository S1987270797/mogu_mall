<template>
    <div class="ProfileMenuList">
        <ul class="list">
            <li v-for="(item, index) in listData" :key="index">
                <img :src="showIcon(item)" alt="" />
                <p>{{ item.info }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "ProfileMenuList",
    props: {
        listData: {
            type: Array,
            default: [],
        },
    },
    methods: {
        showIcon(item) {
            return require("assets/img/profile/" + item.icon);
        },
    },
};
</script>

<style scoped>
.ProfileMenuList {
    font-size: 0.56rem;
    margin-top: 0.6rem;
}
.list li {
    display: flex;
    padding: 0.32rem 0.64rem;
    background-color: #fff;
    border-bottom: 0.02rem solid #f2f2f2;
}
.list li img {
    width: 1rem;
    vertical-align: center;
}
.list li p {
    margin-top: 0.1rem;
    margin: 0.1rem 0 0 0.24rem;
}
</style>