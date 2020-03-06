<template>
    <a-modal
        title="查看保险申请"
        v-model="visible"
        style="top:10%;height: 90%"
        :width='1100'
        :maskClosable="false"
        class="check-insurance-apply">
        <div class="insurance-info">
            <div class="info-title">
                保险申请材料
                <span>保险申请号:{{record.insuranceOrder}}</span>
            </div>
            <insuranceInfo :record='record'></insuranceInfo>
        </div>
        <div class="handle-info">
            <div class="info-title">
                受理操作
            </div>
            <div class="handle-time" style="margin: 20px 0">
                <span class="label">保险期：</span>
                <span class="desc">{{record.actualStartTime}} 至 {{record.actualEndTime}}</span>
            </div>
            <div class="img-wrapper" style="padding: 0 20px; margin-bottom: 20px" v-if="record.orderPics && record.orderPics.length">
                <span style="vertical-align: top">保单或其他资料上传：</span>
                <look-img
                    ref="lookImg"
                    style="display: inline-block; margin-right: 10px"
                    v-for="item in record.orderPics"
                    :key="item.id"
                    :imgUrl='item.pictureUrl'></look-img>
            </div>
        </div>
        <div class="list-show">
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
        <div slot="footer">
            <a-button @click="handleCancel">关闭</a-button>
            <!-- <a-button type='primary' @click="handleOk">完成</a-button> -->
        </div>
    </a-modal>
</template>

<script>
    import insuranceInfo from "@/components/insuranceInfo";
    import lookImg from '@/components/lookImg'
    import moment from 'moment'
    export default {
        data() {
            return {
                visible: false,
                record: {}
            }
        },
        components: {
            insuranceInfo,
            lookImg
        },
        methods: {
            open(record) {
                this.visible = true
                if (record && record.plantInfo && record.plantInfo.financeMembers.length) {
                    record.plantInfo.financeMembers = record.plantInfo.financeMembers.map(item => {
                        item.memberAddress = item.address.province + item.address.city + item.address.area
                        return item
                    })
                }
                this.record = record !== undefined ? record : {}
            },
            handleCancel() {
                this.visible = false
            },
            handleOk() {
            },
        }
    }
</script>

<style lang="stylus">
    .check-insurance-apply
        .insurance-info, .handle-info, .list-show
            border 1px solid #A5A2A2
            color #000
            margin-bottom 20px
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
        .handle-info
            .label
                vertical-align top
                display inline-block
                width 160px
                text-align right
            .desc
                width 59%
                display inline-block
                text-align center
                background rgba(238,238,238,1)
                border 1px solid rgba(170,170,170,1)
                vertical-align middle
                line-height 30px
        .list-show
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
