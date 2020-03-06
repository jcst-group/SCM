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
            <div class="textarea-wrapper" style="margin: 20px 0">
                <span class="label">
                    <span style="margin-right: 3px;color:red">*</span>
                    处理信息：
                </span>
                <a-textarea
                    style="width: 70%"
                    v-model="comment"
                    :autosize='{minRows: 3, maxRows: 6}'>
                </a-textarea>
            </div>
            <!-- <div class="handle-time" style="margin-bottom: 20px">
                <span class="label">保险期：</span>
                <a-range-picker
                    style="width:50%"
                    @change='dataPick'
                />
            </div>
            <div class="img-wrapper" style="padding: 0 20px">
                <span style="vertical-align: top">保单或其他资料上传：</span>
                <upload-img ref="uploadImg" style="display: inline-block"></upload-img>
            </div> -->
        </div>
        <div slot="footer">
            <a-popconfirm title="确定不予处理吗?" @confirm="handleCancel">
                <a-button type="danger">不予处理</a-button>
            </a-popconfirm>
            <a-popconfirm title="确定接受申请吗?" @confirm="handleOk">
                <a-button type='primary'>接受申请</a-button>
            </a-popconfirm>
        </div>
    </a-modal>
</template>

<script>
    import insuranceInfo from "@/components/insuranceInfo";
    import uploadImg from '@/components/uploadImg'
    import moment from 'moment'
    import {rejectInsurance, acceptInsurance} from '@/api/insuranceApi'
    export default {
        data() {
            return {
                visible: false,
                record: {},
                comment: undefined
            }
        },
        components: {
            insuranceInfo,
            // uploadImg
        },
        methods: {
            open(record) {
                this.visible = true
                this.comment = undefined
                if (record && record.plantInfo && record.plantInfo.financeMembers.length) {
                    record.plantInfo.financeMembers = record.plantInfo.financeMembers.map(item => {
                        item.memberAddress = item.address.province + item.address.city + item.address.area
                        return item
                    })
                }
                this.record = record !== undefined ? record : {}
            },
            handleCancel() {
                if (this.comment) {
                    rejectInsurance({
                        id: this.record.id,
                        comment: this.comment
                    }).then(res => {
                        this.$message.info(res.message)
                        if (res.success) {
                            this.visible = false
                            this.$parent._loadData()
                        }
                    })
                } else {
                    this.$message.warn('请填写处理信息')
                }
            },
            handleOk() {
                if (this.comment) {
                    acceptInsurance({
                        id: this.record.id,
                        comment: this.comment
                    }).then(res => {
                        this.$message.info(res.message)
                        if (res.success) {
                            this.visible = false
                            this.$parent._loadData()
                        }
                    })
                } else {
                    this.$message.warn('请填写处理信息')
                }
            },
            dataPick(date, dateString) {
            },
        }
    }
</script>

<style lang="stylus">
    .check-insurance-apply
        .insurance-info, .handle-info
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
</style>
