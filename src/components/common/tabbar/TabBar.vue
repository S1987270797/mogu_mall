<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "TabBar",
};
</script>

<style>
#tab-bar {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    max-width: 750px;
    min-width: 320px;
    z-index: 1;
    width: 100%;
    font-size: 0.32rem;
    /* 上面的是调整fixed定位 */
    display: flex;
    position: fixed;
    /* bottom: 0;
    left: 0;
    right: 0; */
    height: 1.76rem;
    background-color: #f6f6f6;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
}
</style>