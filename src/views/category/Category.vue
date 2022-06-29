<template>
    <div id="Category">
        <!-- navbar -->
        <nav-bar class="navbar">
            <div slot="center">分类</div>
        </nav-bar>
        <!-- menu -->
        <category-menu
            :categories="categories"
            @menuClick="menuClick"
        ></category-menu>
        <!-- better-scroll -->
        <scroll class="content" ref="scroll">
            <!-- CategorySub -->
            <category-sub :subCategories="subCategories"></category-sub>
            <!-- CategoryMiniWall -->
            <category-mini-wall :goods="miniWallGoods"></category-mini-wall>
        </scroll>
    </div>
</template>

<script>
// navBar
import NavBar from "components/common/navbar/NavBar";
// menu
import CategoryMenu from "./childComps/CategoryMenu.vue";
// subcategory
import CategorySub from "./childComps/CategorySub.vue";
// CategoryMiniWall
import CategoryMiniWall from "./childComps/CategoryMiniWall";
// better-scroll
import Scroll from "components/common/scroll/Scroll";
import { itemListenerMixin } from "common/mixins";
// 网络请求
import { getCategory, getSubCategory, getMiniWall } from "network/category";
export default {
    name: "Category",
    mixins: [itemListenerMixin],
    components: {
        NavBar,
        CategoryMenu,
        CategorySub,
        CategoryMiniWall,
        Scroll,
    },
    data() {
        return {
            categories: [],
            subCategories: [],
            miniWallGoods: [],
        };
    },
    created() {
        this._getCategory(); // 刚创建时就开始请求数据
    },
    methods: {
        /* 网络相关的方法 */
        _getCategory() {
            // 这个外层的基础数据
            getCategory().then((res) => {
                console.log(res);
                this.categories = res.data.category.list;
                // 顺便请求一下subcategory的第一页的数据
                this.menuClick(0);
            });
            // 顺便也帮我执行一下
            // this.menuClick(0); // 为什么这里执行这个会保存, 因为上面的是异步方法
        },
        _getSubCategory(index) {
            // 需要将maitKey传过去
            let maitKey = this.categories[index].maitKey;
            // 发送请求
            getSubCategory(maitKey).then((res) => {
                console.log(res);
                this.subCategories = res.data.list;
            });

            // 下面是发送category右下方的miniWall的数据
            let miniWallkey = this.categories[index].miniWallkey;
            this._getMiniWall(miniWallkey);
        },
        _getMiniWall(key) {
            // 网络请求的方法
            getMiniWall(key).then((res) => {
                console.log(res);
                this.miniWallGoods = res;
            });
        },
        /* 网络相关方法结束 */

        // 拿到被点击的menu的index
        menuClick(index) {
            // 这个方法需要在页面刚刷新时就要执行一次拿到第一个menu的数据, 就放在最外面数据请求的地方
            // 再根据被点击的menu的index拿出他的maitKey, 有maitKey就可以获取对应的subcate的数据
            this._getSubCategory(index);
            // 每次点击一个标题就重新让右侧的scroll滚回顶部
            this.$refs.scroll.scrollTo(0, 0);
        },
    },
    activated() {
        this.$refs.scroll.refresh();
    },
    deactivated() {
        this.$bus.$off("itemImgLoad", this.itemImgListener);
    },
};
</script>

<style scoped>
#Category {
    height: 100vh;
}
.navbar {
    position: relative;
    color: #fff;
    background-color: var(--color-tint);
}
/* menu和右边的盒子都是块盒子 */
.content {
    float: left;
    width: 75%;
    height: calc(100% - var(--nav-hight) - var(--tabbar-hight));
    overflow: hidden;
}
</style>

/* ####开始制作分类页
    1.发送请求,请求数据. 请求大致的数据: http://152.136.185.210:7878/api/m5/categroy
    2.封装组件menu, data.category.list 获取分类的数据,将其渲染在左边的目录上面.
    3.封装组件subcategory, http://152.136.185.210:7878/api/m5/subcategory?maitKey=3627, maitKey在data.category.list里面存着各个分类各自的对应的数据
    4.封装组件CategoryMiniWall, http://152.136.185.210:7878/api/m5/subcategory/detail?miniWallkey=10062603, miniWallkey在data.category.list里面存着各个分类各自的对应的数据,
        这里没有下拉加载就不做按页请求数据的数据请求.
        如果要做:
        1. 写好可以传入 需要请求数据的类型如pop、new、sell等和页数 的发送网络请求的方法
        2. 页面刚创建就发送请求,发送每个type的第一页的数据,
        3. 再获取用户当前在哪个type里面, 传给goodslist不同的数据
        4. 下拉加载更多, 每次下拉都发送给请求,再让页数+1, 获取当前的type,page再发送请求, 传给goodslist进行展示
    ~这里我们不做页数也没有下拉更多,就直接将数据请求过来进行展示
 */