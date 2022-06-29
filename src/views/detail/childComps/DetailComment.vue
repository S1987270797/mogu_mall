<template>
    <div class="DetailComment" v-if="Object.keys(rate).length !== 0">
        <!-- 评论区 -->
        <div class="comment">
            <div class="chead">
                <b>用户评价</b>
                <a>更多 {{ rate.cRate }}</a>
                <i class="iconfont icon-jiantou1"></i>
            </div>
            <div class="cbody">
                <div class="user">
                    <img :src="rate.list[0].user.avatar" alt="" />
                    <span>{{ rate.list[0].user.uname }}</span>
                </div>
                <div class="content">
                    {{ rate.list[0].content }}
                </div>
                <div class="size">
                    {{ rate.list[0].created | showDate }}
                    {{ rate.list[0].style }}
                </div>
                <div class="photo" v-if="rate.list[0].images">
                    <!-- <ul>
                        <li
                            v-for="(item, index) in rate.list[0].images"
                            :key="index"
                        >
                            <img :src="item" alt="" />
                        </li>
                    </ul> -->
                    <span
                        v-for="(item, index) in rate.list[0].images"
                        :key="index"
                    >
                        <img :src="item" alt="" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 导入时间戳格式化函数
import { formatDate } from "common/utils";
export default {
    name: "DetailComment",
    props: {
        rate: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    computed: {},
    filters: {
        showDate(value) {
            // 1.将时间戳转为date对象
            const date = new Date(value * 1000);
            // 2.将date进行格式化
            return formatDate(date, "yyyy-MM-dd");
        },
    },
};
</script>

<style>
/* 评论区开始 */
.DetailComment {
    font-size: 0.48rem;
    margin-top: 1rem;
    padding: 0.2rem 0.5rem 0;
    background-color: #fff;
}
.comment .chead {
    font-size: 0.56rem;
    position: relative;
    font-weight: 700;
}
.comment .chead a {
    position: absolute;
    top: 0;
    right: 0.4rem;
    color: var(--color-high-text);
}
.comment .chead i {
    position: absolute;
    top: -0.02rem;
    right: 0;
    font-size: 0.52rem;
    color: var(--color-high-text);
}
.comment .cbody {
    overflow: hidden;
    margin-top: 0.4rem;
    border-top: 0.02rem solid #f2f2f2;
}
.comment .cbody .user {
    margin-top: 0.5rem;
}
.comment .cbody .user img {
    width: 1rem;
    vertical-align: middle;
    border-radius: 10rem;
    margin-right: 0.3rem;
}
.comment .cbody .content {
    margin-top: 0.4rem;
}
.comment .cbody .size {
    margin: 0.2rem 0;
    color: #999;
    font-size: 0.4rem;
}
/* .comment .cbody .photo li {
    float: left;
} */
.comment .cbody .photo img {
    width: 2rem;
    margin-right: 0.1rem;
}
</style>