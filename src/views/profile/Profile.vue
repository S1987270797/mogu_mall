<template>
    <div class="profile">
        <!-- navbar -->
        <nav-bar class="navbar">
            <div slot="center">我的</div>
        </nav-bar>
        <!-- 头部 用户名手机号 -->
        <profile-user-info></profile-user-info>
        <!-- 余额 积分等info -->
        <profile-account-info></profile-account-info>
        <!-- 菜单列表 -->
        <profile-menu-list :listData="orderList"></profile-menu-list>
        <profile-menu-list :listData="serviceList"></profile-menu-list>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import ProfileUserInfo from "./ChildComps/ProfileUserInfo.vue";
import ProfileAccountInfo from "./ChildComps/ProfileAccountInfo.vue";
import ProfileMenuList from "./ChildComps/ProfileMenuList.vue";
export default {
    name: "Profile",
    components: {
        NavBar,
        ProfileUserInfo,
        ProfileAccountInfo,
        ProfileMenuList,
    },
    data() {
        return {
            orderList: [
                { icon: "message.svg", info: "我的消息" },
                { icon: "pointer.svg", info: "积分商城" },
                { icon: "vip.svg", info: "会员卡" },
            ],
            serviceList: [
                { icon: "cart.svg", info: "我的购物车" },
                { icon: "shopping.svg", info: "下载购物APP" },
            ],
        };
    },
};
</script>

<style scoped>
.navbar {
    position: relative;
    color: #fff;
    background-color: var(--color-tint);
}
</style>