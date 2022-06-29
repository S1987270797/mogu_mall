import { debounce } from "common/utils";
// 引入常量
import { BACKTOP_ALTITUDE } from "common/const";
// 返回顶部
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
    /* 
        这个是为了 detail 和 home 都使用了goodsListItem组件, goodsListItem组件会发送一个事件来告诉我的图片加载完成.
        原来是只会发送给Home但是我们Detail也使用这个组件,在Detail使用依然是发送事件给Home,这明显不合理.
        所以我们将两个大组件都使用了的方法和属性都放在mixin里面,避免重复代码. (里面有一些处理防抖函数的细节)
    */
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 500);
        // 由于监听和取消都需要使用这个函数, 所以将他抽取
        this.itemImgListener = () => {
            this.newRefresh();
            console.log('newRefresh');
        };
        this.$bus.$on("itemImgLoad", this.itemImgListener);
    },
}


export const backTopMixin = {
    /* 
    2.backTop
多个页面需要使用 backTop按钮 需要使用方法和变量 需要两个组件的数据的交互
所以将这些数据抽取到一个mixin将这些变量和方法混入
 */
    data() {
        return {
            isShowBackTop: false, // backTop
        }
    },
    components: {
        BackTop
    },
    methods: {
        // 点击返回顶部
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500); // 通过$refs拿到带有ref属性值为scroll的组件,组件里面有scroll对象, 对象里面有scrollTo方法
        },
        ListenIsShowBackTop(position) {
            // 判断是否显示backTop按钮
            this.isShowBackTop = position.y < -BACKTOP_ALTITUDE;
            // 必须在能获取页面高度的方法里面加上下面的 函数调用语句(且传入position)
            // this.ListenIsShowBackTop(position);
        },
    },
}