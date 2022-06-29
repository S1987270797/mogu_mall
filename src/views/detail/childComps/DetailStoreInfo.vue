<template>
    <div class="detail-store">
        <div class="store-top">
            <img :src="storeInfo.logo" alt="" class="top-log" />
            <span>{{ storeInfo.name }}</span>
        </div>
        <div class="store-info">
            <div class="info-left">
                <span class="cSells">
                    <i>{{ storeInfo.cSells | sellCountFilter }}</i>
                    <p>总销量</p>
                </span>
                <span class="cGoods">
                    <i>{{ storeInfo.cGoods }}</i>
                    <p>全部宝贝</p>
                </span>
                <em>分割线而已啦</em>
            </div>
            <div class="info-right">
                <div v-for="(item, index) in storeInfo.score" :key="index">
                    <p>{{ item.name }}</p>
                    <b :class="{ 'better-fontcolor': item.isBetter }">
                        {{ item.score }}
                    </b>
                    <i :class="{ 'better-bgcolor': item.isBetter }">
                        {{ item.isBetter ? "高" : "低" }}
                    </i>
                </div>
            </div>
        </div>
        <p>进店逛逛</p>
    </div>
</template>

<script>
export default {
    name: "DetailStoreInfo",
    props: {
        storeInfo: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    filters: {
        sellCountFilter: function (value) {
            if (value < 10000) return value;
            return (value / 10000).toFixed(1) + "万";
            // 过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，capitalize 过滤器函数将会收到 message 的值作为第一个参数。
        },
    },
};
</script>

<style scoped>
.detail-store {
    font-size: 0.6rem;
    background-color: #fff;
    padding: 0.3rem 0.26rem 0;
    margin-top: 0.2rem;
}
.store-top .top-log {
    width: 2rem;
    vertical-align: bottom;
}
.store-top span {
    font-size: 0.84rem;
    margin-left: 0.6rem;
    line-height: 2rem;
}
/* store-info.store-info */
.store-info {
    display: flex;
    height: 4.6rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
}
.store-info > div {
    display: flex;
    flex: 1;
}
.store-info span {
    flex: 1;
}
.store-info i {
    font-style: normal;
}
.info-left span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.cSells i,
.cGoods i {
    font-size: 0.84rem;
}
.cSells p,
.cGoods p {
    font-size: 0.56rem;
}
.info-left em {
    font-size: 0;
    align-self: center;
    height: 2.4rem;
    border-right: 0.02rem solid gray;
}
/* info-right */
.info-right {
    /* 前面也有display:flex, flex:1 */
    flex-direction: column;
    justify-content: center;
}
.info-right p {
    display: inline;
    font-size: 0.64rem;
}
.info-right > div {
    height: 28%;
    margin-left: 1.1rem;
}
.info-right div b {
    display: inline-block;
    width: 1.2rem;
    margin: 0 0.4rem 0 0.6rem;
    color: green;
}
.info-right div i {
    display: inline-block;
    width: 0.64rem;
    height: 0.64rem;
    /* text-indent: -2px; */
    line-height: 0.72rem;
    text-align: center;
    background-color: green;
    color: #fff;
}
/* isBetter的class */
.info-right div .better-fontcolor {
    color: red;
}
.info-right div .better-bgcolor {
    background-color: red;
}
/* 下面的进店逛逛 */
.detail-store>p {
    text-align: center;
}
</style>