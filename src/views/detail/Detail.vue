<template>
    <div id="detail">
        <detail-nav-bar
            class="detail-nav-bar"
            @titleClick="titleClick"
            ref="navBar"
        ></detail-nav-bar>
        <scroll
            class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
        >
            <detail-swiper :top-images="topImages"></detail-swiper>
            <!-- 绑定的数据都用top-images形式, 尽管接收的地方写的是topImages -->
            <detail-base-info :goods-info="goodsInfo"></detail-base-info>
            <detail-store-info :store-info="storeInfo"></detail-store-info>
            <detail-goods-info
                :detail-goods-info="detailInfo"
                @imagesLoaded="imagesLoaded"
            ></detail-goods-info>
            <detail-size-info
                :size-info="sizeInfo"
                ref="size"
            ></detail-size-info>
            <detail-comment :rate="rate" ref="comment"></detail-comment>
            <!-- 使用之前封装的goodsList -->
            <!-- <goods-list :goods="recommendInfo"></goods-list> -->
            <detail-recommend
                :goods="recommendInfo"
                ref="recommend"
            ></detail-recommend>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
        <detail-bottom-bar @cartClick="cartClick"></detail-bottom-bar>
        <toast-self ref="toastSelf"></toast-self>
    </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
// 引入swiper
import DetailSwiper from "./childComps/DetailSwiper.vue";
// base-info
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
// store-info
import DetailStoreInfo from "./childComps/DetailStoreInfo.vue";
// goods-detail
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
// DetailSizeInfo
import DetailSizeInfo from "./childComps/DetailSizeInfo.vue";
// DetailComment
import DetailComment from "./childComps/DetailComment.vue";
// DetailRecommend
import DetailRecommend from "./childComps/DetailRecommend.vue";
// DetailBottomBar
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
// ToastSelf
import ToastSelf from "components/common/toast/ToastSelf.vue";
// better-scroll
import Scroll from "components/common/scroll/Scroll";
// 映射vuex的actions的方法 actions也是可以映射的
import { mapActions } from "vuex";
// debounce防抖函数
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixins";
// detail的数据请求
import {
    getDetail,
    GoodsInfo,
    StoreInfo,
    ItemParams,
    getDetailRecommend,
} from "network/detail";
export default {
    name: "Detail",
    mixins: [itemListenerMixin, backTopMixin],
    data() {
        return {
            iid: null,
            // resResult: {},
            topImages: [],
            goodsInfo: {}, // 装简介信息的对象
            storeInfo: {}, // detail的商家信息
            // 前面的都是先过去数据再通过构造函数将数据处理好再赋值给data
            detailInfo: {},
            sizeInfo: {}, // 商品的尺寸等信息
            rate: {}, // 评论
            recommendInfo: [], // 推荐, 直接使用了goodslist组件
            // itemImgListener: null, // 保存的是需要被this.$bus.$off 取消监听的函数, 也放在mixin了
            themeTopYs: [], // 记录的是各个theme的位置 offsetTop
            getThemeTopYs: null, // 给getThemeTopYs赋值（对给themeTopYs赋值的操作进行防抖）
            navCurrentIndex: 0, // navbar的当前位置
        };
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailStoreInfo,
        DetailGoodsInfo,
        DetailSizeInfo,
        DetailComment,
        DetailRecommend,
        DetailBottomBar,
        ToastSelf,
        Scroll,
    },
    created() {
        // 接收goodlistitem传过来的iid的参数
        this.iid = this.$route.params.iid;
        // 发送网络请求
        getDetail(this.iid).then((res) => {
            console.log(res);
            // 拿到顶部轮播图数据
            const data = res.result;
            this.topImages = data.itemInfo.topImages;
            // 1.拿到商品的基本信息base
            this.goodsInfo = new GoodsInfo(
                data.itemInfo,
                data.columns,
                data.shopInfo.services
            );
            // 2.商品的商家信息 store
            this.storeInfo = new StoreInfo(data.shopInfo);
            // 3.获取细节图片数据
            this.detailInfo = data.detailInfo;
            // 4.尺寸等信息
            this.sizeInfo = new ItemParams(data.itemParams);
            // 5.评论
            this.rate = data.rate;

            /* // 赋值完数据后再计算offsetTop 失败
            // 还会进行updated(){} 生命周期函数 才会渲染到页面
            this.themeTopYs = [];
                // 由于updated每次页面有更新就会执行,所以会push多组数据, 先清空前面再复制
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.size.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                // mounted：为什么中间两个el没有 因为这两个组件在渲染前都进行了判断，只有有数据的时候才加载template。而这个时候我们连数据都还没有请求过来
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                console.log(this.themeTopYs);
            // 因此需要加上 $nextTick 下一帧, 即可获取,但是不包含图片. 赋值传递数据 -> 渲染html骨架 -> 样式图片
            this.$nextTick(() => {
                // 根据最新的数据, 对应的DOM已经被渲染出来
                // 但是图片依然时没有加载完(目前获取到offsetTop不包含其中的图片, 之前可以是因为图片已经被缓存)
                this.themeTopYs = [];
                // 由于updated每次页面有更新就会执行,所以会push多组数据, 先清空前面再复制
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.size.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                // mounted：为什么中间两个el没有 因为这两个组件在渲染前都进行了判断，只有有数据的时候才加载template。而这个时候我们连数据都还没有请求过来
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                console.log(this.themeTopYs);
            }); */
        });
        // 单独的网页 请求推荐数据
        getDetailRecommend().then((res) => {
            this.recommendInfo = res.data.list;
        });
        // 给getThemeTopYs赋值（对给themeTopYs赋值的操作进行防抖）
        this.getThemeTopYs = debounce(() => {
            // 在created的时候创建好获取offsetTop的函数顺便写上防抖函数
            this.themeTopYs = [];
            // 由于updated每次页面有更新就会执行,所以会push多组数据, 先清空前面再复制
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.size.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            // mounted：为什么中间两个el没有 因为这两个组件在渲染前都进行了判断，只有有数据的时候才加载template。而这个时候我们连数据都还没有请求过来
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            console.log(this.themeTopYs);
        }, 500);
    },
    methods: {
        ...mapActions(["addCart"]),
        imagesLoaded() {
            // 方法1 在DetailGoodsInfo里面判断
            // this.$refs.scroll.refresh();
            // 方法2 debounce (is better)
            this.newRefresh(); // 在mixin里面的函数

            this.getThemeTopYs(); // 在created时已经创建好这个函数，是一个防抖函数
        },
        // nav的点击 跳转到指定位置
        titleClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
        },
        // 制作滑动时nav的theme跟随变换
        contentScroll(position) {
            // theme们的offsetTop是正值,换成相同的值来比较.
            // console.log(position.y);
            let y = -position.y;
            if (y < this.themeTopYs[1]) {
                this.navCurrentIndex = 0;
            } else if (y < this.themeTopYs[2]) {
                this.navCurrentIndex = 1;
            } else if (y < this.themeTopYs[3]) {
                this.navCurrentIndex = 2;
            } else {
                this.navCurrentIndex = 3;
            }
            // this.navCurrentIndex = this.navCurrentIndex !== y ? this.navCurrentIndex = y : this.navCurrentIndex;
            this.$refs.navBar.currentIndex = this.navCurrentIndex; // 这里赋值的频繁
            // 判断是否显示backTop按钮
            this.ListenIsShowBackTop(position);
        },
        // 点击加入购物车按钮
        cartClick() {
            // 1.记录一些当前在Detail显示的产品的信息, 为了在购物车里展示
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goodsInfo.title;
            product.desc = this.goodsInfo.desc;
            product.lowNowPrice = this.goodsInfo.lowNowPrice;
            product.iid = this.iid;

            // 2.调用store里的方法保存数据
            /* this.$store.dispatch("addCart", product).then((res) => {
                console.log(res);
            }); */
            this.addCart(product).then((res) => {
                // 这是映射之后的写法,就等于自己的函数
                // 3.添加数据后显示 添加弹窗toast
                this.$refs.toastSelf.showToast(); // 1.调用alert里面的显示"加购成功"的box
                console.log(res);
            });
        },
    },
    mounted() {
        // 已经放在mixin里面
        /* const newRefresh = debounce(this.$refs.scroll.refresh, 200);
        this.itemImgListener = () => {
            // 监听的这个事件也是需要取消掉 需要取消掉就需要将他抽取到一个变量里面
            newRefresh();
        };
        this.$bus.$on("itemImgLoad", this.itemImgListener); */
        // 计算出各个组件的高度， 可能不行因为图片可能还没有加载完全
        /* this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.size.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // mounted：为什么中间两个el没有 因为这两个组件在渲染前都进行了判断，只有有数据的时候才加载template。而这个时候我们连数据都还没有请求过来
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
 */
    },
    updated() {
        /* this.themeTopYs = [];
        // 由于updated每次页面有更新就会执行,所以会push多组数据, 先清空前面再复制
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.size.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // mounted：为什么中间两个el没有 因为这两个组件在渲染前都进行了判断，只有有数据的时候才加载template。而这个时候我们连数据都还没有请求过来
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs); */
    },
    // 但是我们的Detail是不在keep-alive里面的
    // activated 和 deactivated这两个生命周期函数只会存在 有缓存的keep-alive里面 才会执行; 当时我们是为了做进每个首页item都是不一样的,所以让它每次都销毁,传入新的iid,打开新的网页
    // 所以这个函数是不会被执行的, 我们的取消监听this.$bus.$off不能写在这个函数里面
    deactivated() {},
    destroyed() {
        // 这条代码在Home和Detail都写了,但是在不同的生命周期函数里面. 我们的Detail不在keep-alive里面,所以不会执行activated和deactivated两个生命函数
        // 所以最好还是自己写一下
        this.$bus.$off("itemImgLoad", this.itemImgListener);
    },
};
</script>

<style scoped>
#detail {
    position: relative;
    background-color: #f2f2f2;
    z-index: 99;
    height: 100vh;
}
.detail-nav-bar {
    position: relative;
    z-index: 10;
    background-color: #fff;
}
.content {
    /* height: 1200px; */
    /* height: 100vh; */
    height: calc(100% - 1.76rem - 1.76rem);
    /* overflow: hidden; */
    /* position: absolute;
    top: 1.76rem;
    bottom: 1.76rem;
    left: 0;
    right: 0; */
}
</style> 

/* 
    1. 切换商品时 detail页面没有变化 因为detail页面页keep-alive了; 在App.vue的route-view里面写上 keep-alive exclude="Detail"
    2. 设置轮播图的大小的时候给轮播图保存的标签加上了 swiper 类名,导致轮播图不能正常显示滑动. 这是因为轮播图组件也定义了一样的类名
    3. "TypeError: Cannot convert undefined or null to object" 这个报错出现在传参的时候, data的goods: null; 
    初始值是一个null,在detail自己的页面没有问题.但是作为参数传给detailBaseInfo的时候就出现了typeError的报错. 因为两个参数一直在交流, 在还没有执行created函数的时候, detail组件已经将goods传给了detailBaseInfo, 而detailBaseInfodetailBaseInfo的props的goods接收的是一个Object, 但detail传过去的却是一个null.
    4. 1.为什么在mounted()获取不到data中的数据？
    这是因为在mounted()钩子函数中，this 指向的是window作用域，所以会出现获取到的data中的数据出现没有定义的情况。
 */

/* 
    样式
    1. 滚动, 采用的是将下面的mainTabBar覆盖遮住的做法
 */

/* 
    添加better-scroll
    1. 因为我在DetailGoodsInfo.vue的根元素写了一个hight:20rem, 结果每个detail页面能滑动的高度都是固定的
 */

 /* 
    添加完recommend数据后里面用的是goodslist, 而goodslist里面又用了goodslistitem, goodslistitem里面有imageLoad监听图片加载更新better-scroll的高度. 但是里面的事件是发射给Home组件,就造成我们我detail里面用goodslistitem还是发送事件给了Home,而不是更新Detail页面的better-scroll的高度.
    解决方法: 在GoodSListItem发射的方法里面写上判断语句,分别发送给不同的页面
    1.通过路由来判断
    2.通过混入来将需要用到的mounted生命周期函数里面的方法抽取到mixin里面来
        步骤
        1   创建mixin.js, 在里面写上一个函数,函数名自定义,再将他导出. 
        2   里面写上data, mounted等vue实例里面的属性和函数,
        3   导入, 在需要用到的页面将mixin导入, 再在vue实例里面写上等级与data, props, components等属性同样等级的 mixins:[], 是一个数组,再将从mixin.js导出的对象放在这个数组里面.
        4   完成
  */ 

  /* 
    五.开始制作detail页面的nav点击滑动到指定页面的效果
        1.将组件的点击事件传给父亲
        2.计算出各个组件的y值并保存
        log 
            我们尝试在mounted里面计算，为什么中间两个el没有 因为这两个组件在渲染前都进行了判断，只有有数据的时候才加载template。而这个时候我们连数据都还没有请求过来
            尝试在获取数据完之后再计算 失败; // 赋值完数据后再计算offsetTop 失败, 还会进行updated(){} 生命周期函数 才会渲染到页面. 因此我们有加上this.nextTick(下一帧),但是 赋值传递数据 -> 渲染html骨架 -> 样式图片, 会不包含图片
            最后将这些代码放在了监听图片加载完成的回调函数之中, 使用了debounce防抖函数
   */

   /* 
    六.开始制作滑动位置navbar跟着变化
        1.获取当前content的y轴的位置
        2.判断y与theme的位置,根据位置操作navbar组件的currentIndex;
    */

    /* 
    七.开始制作backTop按钮
        1.导入组件 注册组件 将backTop在Home的方法拿过来
        2.写进mixins就ok
     */

    /* 
    八. 制作点击加购 显示提示框
    1.监听购物车按钮点击事件, 发送给父亲Detail, 父亲再执行detailAlert组件的显示alert框的方法
    2.使用防抖函数, 不要让 display:none 持续执行.
     */

    /* 
    九. 开始制作点击添加到购物车
    1.监听购物车点击事件,发送给父亲Detail,因为父亲有所有的数据, 父亲开始记录当前在Detail页面展示的数据的信息并且放在vuex里面
     */

     /* 
     十. 开始制作点击添加购物车显示 toast弹窗
        ~ 原来我是在bottom组件里面监听 添加购物车按钮 的点击, 交给detail页面,detail再调用alert组件的方法显示toast在detail页面上面
        1. 需要在store里面正真添加数据之后再执行显示弹窗,就需要在actions里面添加数据之后执行一个回调告诉外面已经添加成功,actions可以return一个promise
        用dispatch调用actions的异步方法会返回一个promise
      */
