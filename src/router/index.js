import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Category = () => import('../views/category/Category.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')
// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
    {
        path: '/',
        redirect: '/home',
        // component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        // 使用动态路由
        path: '/detail/:iid',
        component: Detail
        // query的路由
        /* this.$router.push({
                path: '/detail',
                query:{
                    // 参数
                }
        }) */
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})

// 3.导出router
export default router


// 在用vue-router 做单页应用的时候重复点击一个跳转的路由会出现报错
// 这个报错是重复路由引起的
// 只需在注册路由组建后使用下方重写路由就可以
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
// 下面这个是使用push改变路径使用
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }