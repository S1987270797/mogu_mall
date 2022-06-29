<template>
    <div class="toast">
        <div class="box" ref="box" v-show="true">
            <i class="iconfont icon-gou1"></i>
            <p>添加成功, 在购物车等亲~</p>
        </div>
    </div>
</template>

<script>
import { debounce } from "common/utils";
export default {
    name: "ToastSelf",
    data() {
        return {
            hidden: null,
        };
    },
    mounted() {
        this.hidden = debounce(() => {
            this.$refs.box.style.display = "none";
        }, 2000);
    },
    methods: {
        showToast() {
            this.$refs.box.style.display = "block";
            this.hidden();
        },
    },
    destroyed() {
        // 因为在两秒之内debounce防抖函数还没有执行之前离开detail页面,页面被destroy,读不到页面里面的元素,就会报undefined的错误,所以我们离开就把这个函数和定时器一起销毁
        this.hidden(true); // debounce已经被改造, 执行返回的函数的第一个参数是一个boolean,为true则代表这次定时器立马中止
    },
};
</script>

<style scoped>
.toast .box {
    display: none;
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 30px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.6);
    text-align: center;
    border-radius: 0.2rem;
}
.box i {
    font-size: 1rem;
    color: var(--color-high-text);
}
.box p {
    white-space: nowrap;
    font-size: 0.56rem;
}
</style>

/* 
    制作点击加购 显示提示框
    1.监听购物车按钮点击事件, 发送给父亲Detail, 父亲再执行detailAlert组件的显示alert框的方法
    2.使用防抖函数, 不要让 display:none 持续执行.
 */