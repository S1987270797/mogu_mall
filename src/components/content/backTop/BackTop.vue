<template>
    <div class="back-top">
        <img src="~assets/img/common/top.png" alt="" />
    </div>
</template>

<script>
export default {
    name: "BackTop",
};
</script>

<style scoped>
.back-top {
    position: fixed;
    left: 50%;
    transform: translate(5.2rem);
    bottom: 2.1rem;
}
.back-top img {
    /* 因为移动端有两倍图的什么东西, 在手机上图片都会被放大两倍 */
    width: 2.12rem;
    height: 2.12rem;
}
</style>