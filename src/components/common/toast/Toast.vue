<template>
    <div class="toast" v-show="isShow">
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: "Toast",
    /* props: {
        message: {
            type: String,
            default: "",
        },
        isShow: {
            type: Boolean,
            default: false,
        },
    }, */
    data() {
        return {
            // imgSrc: "../../../assets/img/star.png",
            // imgSrc: require("assets/img/star.png"), // 为什么上面的不行, 一般绑定的:src都是一个url路径.
            imgSrc: "",
            message: "",
            isShow: false,
        };
    },
    methods: {
        show(message = "Alert", duration = 2000) {
            this.message = message;
            this.isShow = true;

            setTimeout(() => {
                this.isShow = false;
            }, duration);
        },
    },
};
</script>

<style scoped>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.64rem;
    padding: 0.4rem;
    border-radius: 0.16rem;
    color: #fff;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
}
.toast img {
    width: 1rem;
    height: 1rem;
}
</style>