<template>
    <div class="cart-list-item">
        <!-- check按钮 -->
        <check-button
            class="check-button"
            :is-select="productItem.checked"
            @click.native="checkClick"
        ></check-button>
        <!-- 内容 -->
        <div class="product-info">
            <!-- 商品图片 -->
            <img :src="productItem.image" alt="" />
            <!-- 商品信息 -->
            <div class="info-right">
                <h6>{{ productItem.title }}</h6>
                <p>{{ productItem.desc }}</p>
                <span class="price">
                    <i>￥</i> <em>{{ productItem.lowNowPrice }}</em>
                </span>
                <div class="count">
                    <button
                        @click="decrease"
                        ref="decreaseButton"
                        class="decrease"
                    >
                        -
                    </button>
                    {{ productItem.count }}
                    <button @click="increase">+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script scoped>
import { mapGetters } from "vuex";
import CheckButton from "./CheckButton.vue";
// 导入mutations的type
import { CHECKEDCHANGE, ADD_COUNT, LESSCOUNT } from "store/mutations-type.js";
export default {
    name: "CartListItem",
    components: {
        CheckButton,
    },
    props: {
        productItem: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    computed: {
        // ?? 有没有别的方法拿到store里面的getters方法
        ...mapGetters(["cartList"]), // 会自动放在props里面
    },
    methods: {
        // 点击选择点击取消
        checkClick() {
            // 1.这个数据来源于vuex，最好是直接修改vuex里面的内容才对
            // this.$store.state.cartList[this.productItem.cartOrder].checked =
            //     !this.productItem.checked;
            this.$store.commit(CHECKEDCHANGE, this.productItem);
        },
        // decrease
        decrease() {
            /* 
            this.$store.state.cartList[this.productItem.cartOrder].count =
                this.$store.state.cartList[this.productItem.cartOrder].count * 1 -1; */

            // 不能少于1
            this.$store.commit(LESSCOUNT, this.productItem);
            if (
                // this.$store.state.cartList[this.productItem.cartOrder].count <=
                // 1
                this.cartList[this.productItem.cartOrder].count <= 1
            ) {
                this.$refs.decreaseButton.disabled = true;
            }
        },
        increase() {
            this.$store.commit(ADD_COUNT, this.productItem);
            // 将 - 号的disabled变回来
            if (this.cartList[this.productItem.cartOrder].count >= 2) {
                this.$refs.decreaseButton.disabled = false;
            }
        },
    },
};
</script>

<style>
.cart-list-item {
    position: relative;
    font-size: 0.72rem;
    height: 6rem;
    background-color: #fff;
    border-bottom: 0.02rem solid #ccc;
    padding: 0.4rem 0.3rem;
}
.check-button {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
}
.product-info {
    margin-left: 1.6rem;
}
.product-info img {
    display: inline-block;
    width: 3.4rem;
    border-radius: 0.3rem;
    vertical-align: top;
}
.product-info .info-right {
    width: 72%;
    display: inline-block;
    padding-left: 0.5rem;
    margin-top: 0.2rem;
}
.product-info h6,
.product-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.product-info h6 {
    font-size: 0.76rem;
}
.product-info p {
    font-size: 0.72rem;
    margin: 0.6rem 0 0.7rem;
}
.product-info .price {
    color: red;
    font-size: 0.92rem;
}
.product-info .price i {
    margin-left: -0.26rem;
}
.product-info .price em {
    margin-left: -0.36rem;
}
.product-info .count {
    float: right;
    margin-top: 0.16rem;
    /* height: 0.76rem;
    border: 1px solid #ccc; */
}
.product-info .count button {
    width: 0.76rem;
    height: 0.76rem;
    line-height: 0.76rem;
    text-align: center;
    border: 0.02rem solid #ccc;
    background-color: #fff;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
}
button:focus {
    outline: none;
}
</style>