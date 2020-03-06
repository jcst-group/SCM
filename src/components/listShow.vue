<template>
    <div class="list-show" v-if="record.messages">
        <div class="info-title">
            处理信息
        </div>
        <div class="list-wrapper">
            <div class="flex-wrapper">
                <span>处理时间</span>
                <span>保单状态</span>
                <span>备注信息</span>
            </div>
            <div class="flex-wrapper" v-for="item in record.messages" :key="item.id">
                <span>{{item.createTime}}</span>
                <span>{{item.messageStatus.displayName}}</span>
                <span>{{item.commont}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            record: {
                type: Object,
                default() {
                    return {}
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .list-show
        margin-top 20px
        .info-title
            background-color #EDEDED
            height 34px
            line-height 34px
            border-bottom 1px solid #A5A2A2
            position relative
            text-align center
            span
                position absolute
                font-size 12px
                bottom -10px
                right 10px
        .list-wrapper
            margin 10px
            .flex-wrapper
                display flex
                padding 5px 0
                span
                    margin-right: 8px
                span:nth-of-type(1), span:nth-of-type(2)
                    width: 160px
                span:nth-of-type(3)
                    flex: 1
</style>