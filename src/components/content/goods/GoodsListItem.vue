<template>
    <div class="GoodsListItem" @click="itemClick">
        <!-- <a :href="goodsItem.clientUrl"> -->
        <a href="javascript:;">
            <!-- <img :src="showImg" alt="" @load="imageLoad" /> -->
            <!-- 使用懒加载 -->
            <img v-lazy="showImg" alt="" @load="imageLoad" />
            <p>{{ goodsItem.title }}</p>
            <span class="price">￥{{ goodsItem.price }}</span>
            <i></i>
            <span class="cfav">{{ goodsItem.cfav }}</span>
        </a>
    </div>
</template>

<script>
export default {
    name: "GoodsListItem",
    props: {
        goodsItem: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    methods: {
        imageLoad() {
            /* 
        为什么会出现下面有数据 却拉不动的情况
            因为 网络请求是异步的, 浏览器不能等异步进程加载完再执行下面代码, 所以在发送请求完之后,就会立马执行下面的代码. better-scroll里面的代码会计算这个页面的高度, 从而决定可滑动的区域,这时有时候网络请求慢,导致图片还没有加载完成,bs就已经执行完了它的代码, 从而造成实际高度比bs计算的高度小的情况. 就会划到一半划不动了

        解决图片滑动bug的办法
            1.监听每张图片的加载图片的加载
            2.让$bus把事件告诉Home(只有Home可以直接拿到 scroll组件,直接操作scroll对象使用里面的refresh()方法), 这个组件是Home的孙子
            3.在Home.vue里面接收到这个方法,监听这个方法. 最好是在组件被创建时就开始监听, 就不会错过
         */
            this.$bus.$emit("itemImgLoad");
            /* 写完Detail页面后...
                这个方法一直是发送给Home, 我的Detail也用了这个组件,也要发送给我的Detail
             */
            // 1. 方法1,通过route查看当前的路由, 再根据当前路由判断发送给不同的页面
            /* if (this.$route.path.indexOf("/home")) {
                this.$bus.$emit("homeItemImgLoad");
            } else if (this.$route.path.indexOf("/detail")) {
                this.$bus.$emit("detailItemImgLoad");
            } */
            // 2. 方法2, 都发出的是同一个事件 "itemImgLoad"
            // 一旦我进去详情页, 就不必要再监听主页的事件
        },

        // 开始制作详情页 goodsListItem的点击
        itemClick() {
            /* 
                1.这里最好是使用push 因为区别与前面的home, category,不需要返回, 这里是需要返回的
                2.将每个goodsItem.iid取出来交给Detail页面，Detail页面需要发送请求 http://152.136.185.210:7878/api/m5/detail?iid=1m745k0
             */
            this.$router.push("/detail/" + this.goodsItem.iid); // 对应的路由是 path: '/detail/:id'； +后面的变量会赋值给路由的:id, 最后可以用this.$route.params.id里面
            // query路由写法
            /* this.$router.push({
                path: '/detail',
                query:{
                    // 参数
                }
            }) */
        },
    },
    computed: {
        // 主页使用goodList是在item.show.img
        // 详情页是在 item.image
        showImg() {
            return (
                this.goodsItem.img ||
                this.goodsItem.image ||
                this.goodsItem.show.img
            );
            /* 逻辑与: 前面这个为true,执行后面的.  */
            /* 逻辑或: 前面为false,执行后面的 */
        },
    },
};
</script>

<style>
.GoodsListItem {
    /* display: flex; */
    position: relative;
    overflow: hidden;
    width: 46%;
    margin: 0.2rem 0.1rem;
    background-color: #fff;
    border-radius: 0.16rem;
    border: 0.02rem solid #f1f1f1;
    /* padding-bottom: 0.7rem; */
}
.GoodsListItem img {
    width: 100%;
}
.GoodsListItem p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* 上面都是文字一行多余显示 多余的加上 ... */
    font-size: 0.48rem;
    color: inherit;
    margin: 0 0.2rem;
}
/* 价格 */
.price {
    /* position: absolute;
    left: 0;
    bottom: 0; */
    font-size: 0.52rem;
    color: var(--color-high-text);
    font-weight: 700;
    margin: 0 0.2rem;
}
/* star */
.GoodsListItem .cfav {
    /* position: absolute;
    bottom: 0.06rem;
    right: 0.84rem; */
    float: right;
    font-size: 0.4rem;
    margin-right: 0.1rem;
    margin-top: 0.1rem;
}
.GoodsListItem i {
    /* position: absolute;
    bottom: 0.16rem;
    right: 0.2rem; */
    float: right;
    width: 0.52rem;
    height: 0.52rem;
    background: url(~assets/img/star.png) no-repeat;
    background-size: 0.52rem 0.52rem;
    margin-right: 0.3rem;
    margin-top: 0.1rem;
}
</style>