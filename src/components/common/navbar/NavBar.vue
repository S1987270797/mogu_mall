<template>
    <div class="nav-bar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    name: "NavBar",
};
</script>

<style scoped>
.nav-bar {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    max-width: 750px;
    min-width: 320px;
    z-index: 1;
    width: 100%;
    font-size: 0.56rem;
    /* 上面的是调整fixed定位 */
    display: flex;
    height: 1.76rem;
    line-height: 1.76rem;
    box-shadow: 0 0.02rem 0.04rem rgba(100, 100, 100, 0.1);
}
.left,
.right {
    width: 1.32rem;
}
.center {
    flex: 1;
    text-align: center;
    justify-content: center;
}
</style>