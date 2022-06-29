<template>
    <div class="DetailSizeInfo" v-if="Object.keys(sizeInfo).length !== 0">
        <h6>{{ sizeInfo.disclaimer }}</h6>
        <!-- 尺寸表 -->
        <table>
            <tr v-for="(item, index) in sizeInfo.sizeTable" :key="index">
                <td v-for="(iitem, iindex) in item" :key="iindex">
                    {{ iitem }}
                </td>
            </tr>
        </table>
        <ul class="infoSet">
            <li v-for="(item, index) in sizeInfo.infoSet" :key="index">
                <span>
                    <b>{{ item.key }}</b>
                </span>
                <i>{{ item.value }}</i>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "DetailSizeInfo",
    props: {
        sizeInfo: {
            type: Object,
            default() {
                return {};
            },
        },
    },
};
</script>

<style scoped>
.DetailSizeInfo {
    font-size: 0.48rem;
    overflow: hidden;
    margin-top: 1rem;
    padding: 0.5rem 0.5rem;
    background-color: #fff;
}
.DetailSizeInfo h6 {
    font-size: 0.48rem;
    color: var(--color-high-text);
}
/* table 开始 */
.DetailSizeInfo table {
    width: 100%;
    margin-top: 0.5rem;
    border-collapse: collapse;
    font-size: 0.52rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background-color: #f2f2f2;
    border-radius: .16rem;
}
.DetailSizeInfo table tr {
    display: flex;
    height: 1.5rem;
    line-height: 1.5rem;
}
.DetailSizeInfo table td {
    height: 1.5rem;
    /* border: 1px solid #000; */
}
/* 第一列标题的td */
.DetailSizeInfo table tr td:first-child {
    width: 26%;
    text-indent: 0.4rem;
}
/* 第二列开始的td */
.DetailSizeInfo table tr td:nth-child(n + 2) {
    flex: 1;
    text-align: center;
}
/* infoSet开始 */
.DetailSizeInfo .infoSet {
    padding-top: 0.5rem;
    border-top: 0.02rem solid #ccc;
}
.DetailSizeInfo .infoSet li {
    display: flex;
    padding: 0.4rem 0;
}
.DetailSizeInfo .infoSet span {
    display: flex;
    align-items: center;
    /* display: inline-block; */
    width: 36%;
    font-size: 0.52rem;
    text-indent: 0.4rem;
    font-weight: 700;
    text-align: start;
}
.DetailSizeInfo .infoSet span b {
    width: 2.4rem;
}
.DetailSizeInfo .infoSet i {
    display: inline-block;
    width: 64%;
    font-style: normal;
    font-size: 0.48rem;
    color: var(--color-high-text);
}
</style>