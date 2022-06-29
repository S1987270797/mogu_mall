<template>
    <div class="check-button" :class="{ selected: isSelect }">
        <img src="~assets/img/cart/tick.svg" alt="" />
    </div>
</template>

<script>
export default {
    name: "CheckButton",
    data() {
        return {};
    },
    props: {
        isSelect: false,
    },
    methods: {
        /*  @click="changeSelect"
        changeSelect() {
            this.isSelect = !this.isSelect;
        }, */
    },
};
</script>

<style scoped>
.check-button {
    display: inline-block;
    box-sizing: border-box;
    width: 0.84rem;
    height: 0.84rem;
    /* background-color: red; */
    border: 0.02rem solid #aaa;
    border-radius: 50%;
}
.check-button img {
    width: 100%;
    margin-bottom: 0.1rem;
}
/* 是否被选中 */
.selected {
    background-color: var(--color-tint);
    border: 0.02rem solid var(--color-tint);
}
</style>