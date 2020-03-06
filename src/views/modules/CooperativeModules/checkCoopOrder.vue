<template>
    <a-modal
        :title="'查看详情'"
        v-model="visible"
        style="top:5%;height: 90%"
        :maskClosable="false"
        class="check-coop-order"
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
                <a-form-item label="检测项目">
                    <span class="desc">{{record.insuranceType ? record.insuranceType.displayName : ''}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测委托时间">
                    <span class="desc">{{record.createTime}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测合作社/基地">
                    <span class="desc">{{record.financeUser ? record.financeUser.cominfo.username : ''}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测机构">
                    <span class="desc">{{record.detectUser ? record.detectUser.cominfo.username : ''}}</span>
                </a-form-item>
            </div>
            <div class="formz-wrapper">
                <a-form-item label='委托备注'>
                    <span class="desc">{{record.charOne}}</span>
                </a-form-item>
            </div>
        </a-form>
        <div class="table-wrapper" v-if="record.feeItems && record.feeItems.length">
            <span>费用清单: </span>
            <a-table
                style="margin-top: 10px"
                :columns="feeColumns"
                :dataSource="record.feeItems"
                :pagination="false"
                rowKey="id"
                bordered>
            </a-table>
        </div>
        <div class="finish-check-wrapper" style="margin-top: 20px" v-if="record.charTwo">
            <div class="form-wrapper">
                <a-form-item label="检测人">
                    <span class="desc">{{record.charTwo}}</span>
                </a-form-item>
            </div>
            <div class="formz-wrapper">
                <a-form-item label='检测结果'>
                    <span class="desc">{{record.charTwo}}</span>
                </a-form-item>
            </div>
            <div class="formz-wrapper" v-if="record.resultPics.length">
                <a-form-item label='检测报告'>
                    <look-img
                        ref="lookImg"
                        style="display: inline-block; margin-right: 10px"
                        v-for="item in record.resultPics"
                        :key="item.id"
                        :imgUrl='item.pictureUrl'>
                    </look-img>
                </a-form-item>
            </div>
        </div>
        <listShow :record='record' v-if="status === 'all'"></listShow>
        <div class="formz-wrapper" style="margin-top:10px" v-if="status !== 'all'">
            <a-form-item label="处理备注">
                <a-textarea style="width: 80%" v-model='remark' :autosize='{minRows: 2, maxRows: 4}'></a-textarea>
            </a-form-item>
        </div>
        <div slot="footer" v-if="status !== 'all'">
            <a-popconfirm title="确定完成吗?" @confirm="handelCancel">
                <a-button type="danger">拒绝检测</a-button>
            </a-popconfirm>
            <a-popconfirm title="确定完成吗?" @confirm="handleOk">
                <a-button type='primary'>接受检测</a-button>
            </a-popconfirm>
        </div>
        <div slot="footer" v-else>
            <a-button @click="handelClose">关闭</a-button>
        </div>
    </a-modal>
</template>
<script>
    import {acceptCheckOrder, rejectCheckOrder} from '@/api/allApi'
    import lookImg from '@/components/lookImg'
    import listShow from '@/components/listShow'
    export default {
        props: {
            status: {
                type: String,
                default: 'all'
            }
        },
        components: {
            lookImg,
            listShow
        },
        data() {
            return {
                remark: undefined,
                visible: false,
                title:'',
                record: {},
                form: this.$form.createForm(this),
                feeColumns: [
                    {
                        title: '费用名称',
                        dataIndex: 'itemName',
                        align: 'center'
                    },
                    {
                        title: '费用单位',
                        dataIndex: 'itemUnit',
                        align: 'center'
                    },
                    {
                        title: '费用单价(元)',
                        dataIndex: 'itemPrice',
                        align: 'center'
                    },
                    {
                        title: '使用数量',
                        dataIndex: 'intOne',
                        align: 'center'
                    },
                    {
                        title: '费用总价(元)',
                        dataIndex: 'itemSum',
                        align: 'center'
                    }
                ],
            }
        },
        methods: {
            open(record) {
                this.record = record
                this.visible = true;
            },
            handelClose() {
                this.visible = false
            },
            handelCancel() {
                if (!this.remark) {
                    return this.$message.warn('处理备注必须填写')
                }
                rejectCheckOrder({
                    id: this.record.id,
                    type: 2,
                    dealMessage: this.remark
                }).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this.visible = false
                        this.$parent._loadData()
                    }
                })
            },
            handleOk() {
                acceptCheckOrder({
                    id: this.record.id,
                    dealMessage: this.remark ? this.remark : undefined
                }).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this.visible = false
                        this.$parent._loadData()
                    }
                })
            },
        }
    }
</script>
<style lang="stylus">
    .check-coop-order
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
    .check-coop-order /deep/ .ant-modal-title
        color #2A6F79
        text-align center
</style>
