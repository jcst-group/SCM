<template>
    <a-modal
        :title="'查看详情'"
        v-model="visible"
        style="top:5%;height: 90%"
        :maskClosable="false"
        class="change-order-modal"
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
        </a-form>
        <a-table
            :columns="feeColumns"
            :dataSource="feeDatas"
            :pagination='false'
            rowKey="id"
            bordered
        >
            <template v-for="col in ['feeName', 'feeUnit', 'feePrice', 'feeSum', 'intOne']" 
                :slot="col" slot-scope="text, record">
                <div :key="col">
                    <a-input
                        v-if="record.editable && (col === 'feeName' || col === 'feeUnit')"
                        style="margin: -5px 0"
                        :value="text"
                        @change="e => handleFeeChange(e.target.value, record.id, col)"
                    />
                    <a-input
                        v-else-if='record.editable'
                        style="margin: -5px 0;width:100%"
                        :disabled="col === 'feeSum'"
                        :value="text"
                        onkeyup="this.value=this.value.replace(/[^(\d|.)]/g,'')"
                        @change="e => handleFeeChange(e.target.value, record.id, col)"  
                    />
                    <template v-else>{{text}}</template>
                </div>
            </template>
            <span slot='action' slot-scope="text,record">
                <div v-if="!record.editable">
                    <a @click="changeLock(record)">编辑</a>
                </div>
                <div v-else>
                    <a @click="saveFee(record)" style="margin-right: 20px">保存</a>
                    <a-popconfirm title='确定要删除么?' @confirm="deleteFee(record)">
                        <a>删除</a>
                    </a-popconfirm>
                </div>
            </span>
        </a-table>
        <div class="formz-wrapper" style="margin-top:10px">
            <a-form-item label="处理备注">
                <a-textarea style="width: 80%" v-model='remark' :autosize='{minRows: 2, maxRows: 4}'></a-textarea>
            </a-form-item>
        </div>
        <div slot="footer">
            <a-popconfirm title="确定拒绝委托吗?" @confirm="handelCancel">
                <a-button type="danger">拒绝委托</a-button>
            </a-popconfirm>
            <a-popconfirm title="确定接受委托吗?" @confirm="handleOk">
                <a-button type="primary">接受委托</a-button>
            </a-popconfirm>
        </div>
    </a-modal>
</template>
<script>
    import {acceptOrder, rejectOrder} from '@/api/checkApi'
    export default {
        data() {
            return {
                remark: undefined,
                visible: false,
                title:'',
                record: {},
                form: this.$form.createForm(this),
                feeDatas: [],
                feeColumns: [
                    {
                        title: () => {
                            return (
                                <div>
                                    <span style='color:red'>*</span>费用名称
                                    <a-icon
                                        type="plus"
                                        style='color:#2d8cf0;cursor:pointer;margin-left:10px'
                                        onclick={this.addFee}/>
                                </div>
                            )
                        },
                        dataIndex: 'feeName',
                        scopedSlots: {customRender: 'feeName'}
                    },
                    {
                        title: () => {
                            return (
                                <div>
                                    <span style='color:red'>*</span>费用单位
                                </div>
                            )
                        },
                        dataIndex: 'feeUnit',
                        scopedSlots: {customRender: 'feeUnit'}
                    },
                    {
                        title: () => {
                            return (
                                <div>
                                    <span style='color:red'>*</span>费用单价(元)
                                </div>
                            )
                        },
                        dataIndex: 'feePrice',
                        scopedSlots: {customRender: 'feePrice'}
                    },
                    {
                        title: () => {
                            return (
                                <div>
                                    <span style='color:red'>*</span>使用数量
                                </div>
                            )
                        },
                        dataIndex: 'intOne',
                        scopedSlots: {customRender: 'intOne'}
                    },
                    {
                        title: () => {
                            return (
                                <div>
                                    费用总价(元)
                                </div>
                            )
                        },
                        dataIndex: 'feeSum',
                        scopedSlots: {customRender: 'feeSum'}
                    },
                    {
                        title: '操作',
                        dataIndex: "action",
                        key: "action",
                        scopedSlots: { customRender: "action" },
                        align: "center",
                        width: '13%'
                    }
                ],
            }
        },
        methods: {
            open(record) {
                this.feeDatas = []
                this.record = record
                this.visible = true;
            },
            addFee() {
                this.feeDatas.push({
                    id: this.feeDatas.length + 1,
                    editable: true,
                })
            },
            handleFeeChange(value, key, column) {
                const newData = [...this.feeDatas]
                const target = newData.filter(item => key === item.id)[0]
                if (target) {
                    target[column] = value
                    this.feeDatas = newData
                }
            },
            saveFee(record) {
                if (record.feeName && record.feePrice && record.feeUnit && record.intOne) {
                    this.$set(record, 'feeSum', record.feePrice * record.intOne)
                    this.$set(record, 'editable', false)
                } else {
                    this.$message.error('请将信息填写完整')
                }
            },
            deleteFee(record) {
                let key = record.id
                this.feeDatas.splice(key - 1, 1)
                this.feeDatas.forEach(item => {
                    if (item.id > key) {
                        item.id -= 1
                    }
                })
            },
            changeLock(record) {
                this.$set(record, 'editable', true)
            },
            handelCancel() {
                if (!this.remark) {
                    return this.$message.warn('处理备注必须填写')
                }
                rejectOrder({
                    id: this.record.id,
                    type: 1,
                    dealMessage: this.remark
                }).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this.$parent._loadData()
                        this.visible = false
                    }
                })
            },
            handleOk() {
                let feeItems = []
                this.feeDatas.forEach(item => {
                    if (item.feeName && item.intOne && item.feePrice && item.feeUnit && item.editable === false) {
                        let obj = {}
                        obj.itemName = item.feeName
                        obj.itemUnit = item.feeUnit
                        obj.itemPrice = item.feePrice
                        obj.itemSum = item.feeSum
                        obj.intOne = item.intOne
                        feeItems.push(obj)
                    }
                })
                if (!feeItems.length) {
                    return this.$message.error('必须填写费用清单')
                }
                acceptOrder({
                    id: this.record.id,
                    feeItems,
                    dealMessage: this.remark ? this.remark : undefined
                }).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this.$parent._loadData()
                        this.visible = false
                    }
                })
            },
        }
    }
</script>
<style lang="stylus">
    .change-order-modal
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
    .change-order-modal /deep/ .ant-modal-title
        color #2A6F79
        text-align center
</style>
