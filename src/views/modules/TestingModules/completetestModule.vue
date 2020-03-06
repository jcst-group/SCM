<template>
    <a-modal
        :title="'查看详情'"
        v-model="visible"
        style="top:5%;height: 90%"
        :maskClosable="false"
        class="completetest-modal"
        :width='950'
        :destroyOnClose='true'>
        <a-form :form="form">
            <div class="form-wrapper">
                <a-form-item label="检测单号">
                    <!-- <a-input disabled v-model="record.orderCode"/> -->
                    <span class="desc">{{record.orderCode}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测委托企业">
                    <span class="desc">{{record.orderUser ? record.orderUser.cominfo.username : ''}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测合作社/基地">
                    <span class="desc">{{record.financeUser ? record.financeUser.cominfo.username : ''}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测所在地">
                    <span class="desc">{{record.member}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测委托时间">
                    <span class="desc">{{record.createTime}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测项目">
                    <span class="desc">{{record.insuranceType ? record.insuranceType.displayName : ''}}</span>
                </a-form-item>
            </div>
            <div class="formz-wrapper">
                <a-form-item label='委托备注'>
                    <span class="desc">{{record.charOne}}</span>
                </a-form-item>
            </div>
            <div class="change-order">
                <div>
                    <div class="form-wrapper">
                        <a-form-item label="检测人">
                            <a-input
                                v-decorator="['dealer', {
                                    rules: [{
                                        required: true,
                                        message: '必须填写检测人'
                                    }]
                                }]"
                            />
                        </a-form-item>
                    </div>
                </div>
                <div>
                    <div class="formz-wrapper">
                        <a-form-item label="检测信息备注">
                            <a-textarea v-decorator="['commont']"/>
                        </a-form-item>
                    </div>
                </div>
                <div>
                    <div class="form-wrapper" style="width: 90%">
                        <a-form-item label="上传检测报告" :required="true">
                            <upload-img
                                :maxLength='5'
                                imgurl='/api/finance/pictureInfo/addDetectResultPic'
                                :useDelete='true'
                                :record="{orderId: record.id}"
                                ref="uploadImg">
                            </upload-img>
                        </a-form-item>
                    </div>
                </div>
            </div>
        </a-form>
        <div slot="footer">
            <a-button @click="handelCancel">取消</a-button>
            <a-popconfirm title="确定完成吗?" @confirm="handleOk">
                <a-button type="primary">完成</a-button>
            </a-popconfirm>
        </div>
    </a-modal>
</template>
<script>
    import uploadImg from '@/components/uploadImg'
    import {finishOrder} from '@/api/checkApi'
    export default {
        components: {
            uploadImg
        },
        data() {
            return {
                visible: false,
                title:'',
                record: {},
                form: this.$form.createForm(this),
            }
        },
        methods: {
            open(record) {
                this.record = record
                this.visible = true;
            },
            handelCancel() {
                this.visible = false
            },
            handleOk() {
                this.form.validateFieldsAndScroll((err, value) => {
                    if (!err) {
                        value.id = this.record.id
                        finishOrder(value).then(res => {
                            this.$message.info(res.message)
                            if (res.success) {
                                this.$parent._loadData()
                                this.visible = false
                            }
                        })
                    }
                })
            },
        }
    }
</script>
<style lang="stylus">
    .completetest-modal
        .desc
            width 100%
            display inline-block
            height 32px
            text-align center
            background rgba(238,238,238,1)
            border 1px solid rgba(170,170,170,1)
            vertical-align middle
            line-height 30px
        .form-wrapper
            width 45%
            display inline-block
            .ant-form-item
                width 100%
                display inline-block
                margin-bottom 10px
                .ant-form-item-control-wrapper
                    width 60%
                    display inline-block
                .ant-form-item-label
                    width 150px
                    vertical-align top
        .formz-wrapper
            width 100%
            display inline-block
            .ant-form-item
                width 100%
                display inline-block
                margin-bottom 10px
                .ant-form-item-control-wrapper
                    width 72%
                    display inline-block
                .ant-form-item-label
                    width 150px
                    vertical-align top
    .completetest-modal /deep/ .ant-modal-title
        color #2A6F79
        text-align center
</style>
