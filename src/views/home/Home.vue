<template>
    <div id="Home">
        <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
        <!-- 为了制作tabControl的吸顶效果而多加的一份tabControl
        好像是用了两个这个组件
         -->
        <tab-control
            class="tab-control"
            :titles="titles"
            @tabClick="tabbClick"
            ref="tabControl2"
            v-show="isTabControlShow"
        ></tab-control>
        <!-- better-scroll区域 -->
        <scroll
            class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentscroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
        >
            <home-swiper
                :banners="banners"
                @swiperImageLoad="swiperImageLoad"
            ></home-swiper>
            <recommend-view :recommend="recommend"></recommend-view>
            <feature-view class="feature-view"></feature-view>
            <tab-control
                :titles="titles"
                @tabClick="tabbClick"
                ref="tabControl1"
            ></tab-control>
            <goods-list :goods="showType"></goods-list>
        </scroll>
        <!-- backTop小按钮
        直接监听组件的点击
        .native监听组件根元素的 事件
         -->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
// 轮播图
import HomeSwiper from "./childComps/HomeSwiper";
// 四个推荐的圆圈
import RecommendView from "./childComps/RecommendView";
// 本周推荐的八个圈圈
import FeatureView from "./childComps/FeatureView";

// navBar
import NavBar from "components/common/navbar/NavBar.vue";
// TabControl
import TabControl from "components/content/TabControl/TabControl.vue";
// 主页展示的商品列表
import GoodsList from "components/content/goods/GoodsList";
// better-scroll
import Scroll from "components/common/scroll/Scroll";

// 发送网络请求
import { getHomeMutidata, getHomeGoods } from "network/home.js";
import { itemListenerMixin, backTopMixin } from "common/mixins";
// utils优化函数
// import { debounce } from "common/utils"; // 抽取到Mixin就不再需要了
export default {
    name: "Home",
    mixins: [itemListenerMixin, backTopMixin],
    data() {
        return {
            // result: null,
            banners: [],
            recommend: [],
            // 传给TabControl的title
            titles: ["流行", "新款", "精选"],
            goods: {
                pop: { page: 0, list: [] },
                new: { page: 0, list: [] },
                sell: { page: 0, list: [] },
            },
            currentType: "pop",
            tabControlOffsetTop: 0, // tabcontrol的offset
            scrollOffsetTop: 0,
            isTabControlShow: false,
            saveY: 0,
            // itemImgListener: null, // 保存的是需要被this.$bus.$off 取消监听的函数, 也放在mixin了
        };
    },
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
    },
    created() {
        // 里面只放主要逻辑 细节放在methods里面

        // 1.请求多个数据
        this.getHomeMutidata();
        // 2.请求商品数据
        this.getHomeGoods("pop");
        this.getHomeGoods("new");
        this.getHomeGoods("sell");

        // 监听每张图片的加载

        // coderwhy老师说说: 写在这里会造成this.$refs.scroll还没生成就使用
        // scroll是挂在mounted生命函数上的
        // 事件从GoodsListItem里面发出, 监听的是图片的加载, 图片的加载是在Home的created生命周期函数加载,每有图片加载就会调用methods里面的方法发送事件.
        // 建议写在mounted函数里面
        /* this.$bus.$on("itemImgLoad", () => {
            this.$refs.scroll.refresh();
        }); */

        // this.tabbClick(0)
    },
    mounted() {
        // 1.图片加载完成的事件监听
        /* debounce(func, delay) {
            let timer = null;
            return function (...args) {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args); // apply(对象, 接受的参数-数组); 接受的agrs来自refresh函数传过来的实参
                }, delay);
            };
        }, */

        /* 写完Detail.vue后加的代码 start; 已经抽取到common的Mixin里面了 */
        /* const newRefresh = debounce(this.$refs.scroll.refresh, 200);
        // 由于监听和取消都需要使用这个函数, 所以将他抽取
        this.itemImgListener = () => {
            newRefresh();
        };
        this.$bus.$on("itemImgLoad", this.itemImgListener); */
        /* 写完Detail.vue后加的代码 end */

        // 2.获取tabControl的offsetTop
        // 所有的组件都有一个$el: 用于获取组件中的元素
        setTimeout(() => {
            // 自己感觉用定时器也可以做到
            this.tabControlOffsetTop = this.$refs.tabControl1.$el.offsetTop;
        }, 200);
    },
    destroyed() {
        console.log("home destroyed");
    },
    activated() {
        this.$refs.scroll.refresh();
        // 活跃的时候再将这个高度手动给content滚回去
        this.$refs.scroll.scrollTo(0, this.saveY, 0);
        // coderwhy最好再刷新一次better-scroll
        // 一定要加 refresh() , 而且要加在activated的头上。
        // 之前我加在底下，反而适得其反。因为加在最后面每次activated的时候他跳到了正确的位置但是你有刷新了一次，刷新整个content他自然就会重新计算滑动距离等等，然后回到最初的位置。
        // this.$refs.scroll.refresh();
        // 加在头顶完美解决
    },
    deactivated() {
        // 1.保存Y值
        // 在主页与其他路由切换的时候 Home keep-alive后由于使用了better-scroll的原因有时候不会保存Home滑动到的位置
        this.saveY = this.$refs.scroll.getScrollY();

        // 2. 取消全局事件的监听
        // 这个方法不能单独只传一个事件, 只传一个事件意味着所有地方的这个事件都会被取消掉, 需要传入第二个参数,就是被监听的函数
        this.$bus.$off("itemImgLoad", this.itemImgListener);
    },
    methods: {
        // 监听首页轮播图的加载
        // 为了正常判断tabcontrol的位置
        swiperImageLoad() {
            this.tabControlOffsetTop = this.$refs.tabControl1.$el.offsetTop;
        },
        // 加载图片的防抖函数
        // 已经抽取到一个独立的函数 在common里面
        /* debounce(func, delay) {
            let timer = null;
            return function (...args) {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args); // apply(对象, 接受的参数-数组); 接受的agrs来自refresh函数传过来的实参
                }, delay);
            };
        }, */
        // 下拉加载更多
        loadMore() {
            // 下拉时再次发送请求 请求下一页的数据
            this.getHomeGoods(this.currentType);
        },
        // 到地方再显示backtop按钮
        contentscroll(position) {
            // 1.判断backTop是否显示
            // this.isShowBackTop = position.y < -1000; // 被mixin取代
            this.ListenIsShowBackTop(position);
            // 2.决定tabControl是否吸顶(加上position: fixed)
            this.isTabControlShow = -position.y > this.tabControlOffsetTop;
            /* if (this.isTabControlFixed) {
                this.$refs.tabControl1.$el.style.top = -position.y + "px";
            } */
            // 3.
            // console.log(position);
            // this.$refs.tabControl1.$el.style.backgroundColor
        },
        // 流行 新款 精选的切换
        tabbClick(index) {
            switch (index) {
                case 0:
                    this.currentType = "pop";
                    break;
                case 1:
                    this.currentType = "new";
                    break;
                case 2:
                    this.currentType = "sell";
                    break;
            }
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        /* 
        网络相关的方法
         */
        getHomeMutidata() {
            getHomeMutidata().then((res) => {
                // 这个返回的是一个promise
                this.banners = res.data.banner.list;
                this.recommend = res.data.recommend.list;
            });
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then((res) => {
                this.goods[type].list.push(...res.data.list);
                // 数据变化还要让页码加1
                this.goods[type].page++;
            });
            // 使用完pullingup事件后要主动结束一次 不让就不会执行下一次 next 类似next()
            this.$refs.scroll && this.$refs.scroll.finishPullUp();
            /* 这里第一次打开页面为什么会报错 Error in created hook: "TypeError: Cannot read property 'finishPullUp' of undefined"
            这里浅显的原因是 刷新页面用户还没有下拉,但是加载第一页数据的时候还是会执行一次finishPullUp, 都还没开始pullUp怎么finish, 所以找不到这个方法, 因为还没有生成
            解决: 加上this.$refs.scroll && ; 先判断是否有scroll这个对象存在, 因为scroll是在mounted时候创建的, 而我们的网络是在created时候发送的,这个finish也会在这个时候执行, 就是还没有这个scroll对象时就加载它的方法,肯定会报undefined的错, 就是还没有上拉就finish,报错.

            为什么会出现下面有数据 却拉不动的情况 better-scroll的bug
                因为 网络请求是异步的, 浏览器不能等异步进程加载完再执行下面代码, 所以在发送请求完之后,就会立马执行下面的代码. better-scroll里面的代码会计算这个页面的高度, 从而决定可滑动的区域,这时有时候网络请求慢,导致图片还没有加载完成,bs就已经执行完了它的代码, 从而造成实际高度比bs计算的高度小的情况. 就会划到一半划不动了
            */
        },
    },
    computed: {
        showType() {
            return this.goods[this.currentType].list;
        },
    },
};
</script>

<style scoped>
.home-nav {
    position: relative;
    background-color: var(--color-tint);
    color: #fff;
}
#Home {
    position: relative;
    /* 整个home的样式 */
    /* margin-top: 0.88rem; */
    height: 100vh;
}
/* .tab-control {  用了better-scroll会使里面的fixed定位失效,不用原生的滚动这个已经没用了
    position: sticky;
    top: 0.98rem;
    border-top: 0.02rem solid #eee;
} */
.feature-view {
    padding-bottom: 0.3rem;
    border-bottom: 0.16rem solid #eee;
}
.content {
    position: absolute;
    top: 1.76rem;
    bottom: 1.76rem;
    left: 0;
    right: 0;
}
.tab-control {
    position: relative;
    z-index: 9;
}

.fixed {
    /* 已废弃 没人使用 */
    /* 
        不用coderwhy老师的方法: 再复制一份tabControl组件放在最顶端, 到了地方再让这个组件显示
        自己的方法: 不好用, 位置有偏移
        1. 获取这个content的y滑动的实时位置 position
        2. 让this.$refs.tabControl1.$el.style.top = -position.y + "px";
        3. 判断content是否滑动到了tabControl的位置  this.isTabControlFixed = -position.y > this.tabControlOffsetTop;
        4. 滑动到了tabControl的位置, 加上fixed属性, 再让tabControl的top等于content滑动的高度
        原理即是 加上fixed后脱离标准流 跟随transform: translate 到了content的最顶端
        :class="{ fixed: isTabControlFixed }" // 给tabControl组件绑定的属性
     */
    position: fixed;
    top: 88px;
    left: 0;
    right: 0;
}
</style>>


    /* 加上overflow:hidden 就可以让整个页面超出不会滚动 */
