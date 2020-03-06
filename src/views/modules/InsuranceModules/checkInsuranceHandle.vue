<template>
    <a-modal
        title="查看保险申请"
        v-model="visible"
        style="top:10%;height: 90%"
        :width='1100'
        :maskClosable="false"
        :destroyOnClose='true'
        class="check-insurance-apply">
        <div class="insurance-info">
            <div class="info-title">
                已受理的保险
                <span>保险申请号:{{record.insuranceOrder}}</span>
            </div>
            <insuranceInfo :record='record'></insuranceInfo>
        </div>
        <div class="handle-info">
            <div class="info-title">
                完成操作
            </div>
            <div class="handle-time" style="margin: 20px 0">
                <span class="label">
                    <span style="color:red; margin-right:3px">*</span>
                    保险期：
                </span>
                <a-range-picker
                    :value='time'
                    style="width:50%"
                    @change='dataPick'
                />
            </div>
            <div class="img-wrapper" style="padding: 0 20px;display:flex">
                <span style="vertical-align: top">保单或其他资料上传：</span>
                <upload-img :imgurl='url' :useDelete='true' :record='{orderId: record.id}' :maxLength='2' ref="uploadImg"></upload-img>
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
            <a-button @click="handleCancel">取消</a-button>
            <a-popconfirm title="确定完成吗?" @confirm="handleOk">
                <a-button type='primary'>完成</a-button>
            </a-popconfirm>
        </div>
    </a-modal>
</template>

<script>
    import insuranceInfo from "@/components/insuranceInfo";
    import uploadImg from '@/components/uploadImg'
    import moment from 'moment'
    import {finishInsurance} from '@/api/insuranceApi'
    const url = '/api/finance/pictureInfo/addInsuranceOrderPic'
    export default {
        data() {
            return {
                visible: false,
                record: {},
                time: null,
                url,
            }
        },
        components: {
            insuranceInfo,
            uploadImg
        },
        methods: {
            open(record) {
                this.time = null
                this.visible = true
                if (record && record.plantInfo.financeMembers.length) {
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
                let params = {}
                if (!this.time) {
                    return this.$message.warn('请填写保险期')
                }
                params.actualStartTime = moment(this.time[0]).format('YYYY-MM-DD')
                params.actualEndTime = moment(this.time[1]).format('YYYY-MM-DD')
                params.id = this.record.id
                finishInsurance(params).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this.visible = false
                        this.$parent._loadData()
                    }
                })
            },
            dataPick(date, dateString) {
                this.time = date
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
