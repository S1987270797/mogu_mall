<template>
    <div class="UserInfo">
        <!-- 头像 -->
        <div class="avatar">
            <img src="~assets/img/profile/avatar.svg" alt="" />
        </div>
        <!-- 信息 -->
        <div class="info iconfont icon-jiantou1">
            <p>登录/注册</p>
            <span>
                <i>
                    <img src="~assets/img/profile/phone.svg" alt="" />
                </i>
                暂无绑定手机号
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileUserInfo",
};
</script>

<style scoped>
.UserInfo {
    position: relative;
    color: #fff;
    height: 3.5rem;
    background-color: var(--color-tint);
}
.avatar {
    float: left;
    margin: 0.24rem 0 0 0.5rem;
}
.avatar img {
    width: 3rem;
}
.info {
    display: inline-block;
    margin-top: 0.66rem;
    margin-left: 0.3rem;
}
.info span img {
    width: 0.78rem;
    vertical-align: middle;
}
.info p {
    font-size: 0.56rem;
    margin-left: 0.2rem;
}
.info span {
    font-size: 0.48rem;
}
.icon-jiantou1::before {
    position: absolute;
    right: 0.52rem;
    top: 1rem;
    font-size: 0.96rem;
}
</style>