<template>
    <a-modal
        :title="title"
        v-model="visible"
        @ok="handleOk"
        @cancel='handelCancel'
        style="top:10%;height: 90%"
        :width='950'
        cancelText="取消"
        okText="确定"
        :maskClosable="false"
        :destroyOnClose='true'
        class="add-order">
        <a-form
            :form="form">
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item  label='所属合作社：' style="margin-right: 10px">
                        <a-select
                        style="width: 220px;"
                        @change="changeMember"
                        v-decorator="['financeUserId', {
                            initialValue:record.financeUser ? record.financeUser.cominfo.financeUserId : '',
                            rules: [{
                                required: true,
                                message: '请选择所属合作社'
                            }]
                        }]">
                            <a-select-option
                                v-for="item in coopData"
                                :key="item.financeUserId"
                                :value='item.financeUserId'>
                                {{item.username}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item  label='下属基地关联社员：' style="margin-right: 10px">
                        <a-select
                        style="width: 220px;"
                        placeholder="请先选择合作社"
                        :disabled='this.memberLock'
                        v-decorator="['numberId', {
                            initialValue:record.financeMember ? record.financeMember.id : '',
                            rules: [{
                                required: true,
                                message: '请选择下属基地关联社员'
                            }]
                        }]">
                            <a-select-option
                                v-for="item in memberList"
                                :key="item.id"
                                :value='item.id'>
                                {{item.realName}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item  label='检测机构选择：' style="margin-right: 10px">
                        <a-select
                        style="width: 220px;"
                        v-decorator="['detectUserId', {
                            initialValue:record.detectUser ? record.detectUser.cominfo.financeUserId : '',
                            rules: [{
                                required: true,
                                message: '请选择检测机构选择'
                            }]
                        }]">
                            <a-select-option
                                v-for="item in checkList"
                                :key="item.financeUserId"
                                :value='item.financeUserId'>
                                {{item.username}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item class="content-select"  label='检测类型选择：' style="margin-right: 10px">
                        <a-radio-group
                            name="radioGroup"
                            v-decorator="['insuranceType', {
                                initialValue:record.insuranceType ? record.insuranceType.code : '',
                                rules: [{
                                    required: true,
                                    message: '请选择检测类型'
                                }]
                            }]">
                            <a-radio
                            v-for="item in typeData"
                            :key="item.value"
                            :value="item.code">
                                {{item.displayName}}
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span='24'>
                    <a-form-item label='检测结果：' class="remark-wrapper">
                        <a-textarea
                            style="width: 80%"
                            v-decorator="['charOne', {
                                initialValue:record.charOne
                            }]"/>
                    </a-form-item>
                </a-col>
                <a-col :span='24'>
                    <a-form-item label='其他委托资料：'>
                        <uploadImg
                            imgurl='/api/finance/pictureInfo/addDetectRelatePic'
                            :picList='record.relatePics'
                            :record="{orderId: this.comInfo.financeUserId}"
                            :maxLength='2'
                            ref="uploadImg">
                        </uploadImg>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <!-- <listShow :record='record'></listShow> -->
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
    </a-modal>
</template>

<script>
    import uploadImg from '@/components/uploadImg'
    // import listShow from '@/components/listShow'
    import {addOrder,
            getCheckType,
            getMemberByCoop,
            getCoopInfo,
            getCheckList} from "@/api/orderApi";
    export default {
        components: {
            uploadImg
        },
        created() {
            getCheckType().then(res => {
                if (res.success) {
                    this.typeData = res.result
                }
            })
            getCoopInfo().then(res => {
                if (res.success) {
                    this.coopData = res.result
                }
            })
            getCheckList().then(res => {
                if (res.success) {
                    this.checkList = res.result
                }
            })
        },
        data() {
            return {
                visible: false,
                form: this.$form.createForm(this),
                record: {},
                title: '',
                memberList: [],
                typeData: [],
                coopData: [],
                checkList: [],
                memberLock: true,
                comInfo: {},
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
                this.memberList = []
                this.memberLock = true
                this.form.resetFields()
                this.visible = true
                this.title = '编辑检测委托'
                this.record = record
                this.comInfo = window.localStorage.info ? JSON.parse(window.localStorage.info) : {}
                if (this.record.financeMember && this.record.financeMember.id) {
                    getMemberByCoop({
                        financeUserId: this.record.financeUser.cominfo.financeUserId
                    }).then(res => {
                        if (res.success) {
                            this.memberList = res.result
                            this.memberLock = false
                        }   
                    })
                }
            },
            changeMember(value) {
                this.form.setFieldsValue({numberId: ''})
                getMemberByCoop({
                    financeUserId: value
                }).then(res => {
                    if (res.success) {
                        this.memberList = res.result
                        this.memberLock = false
                    }
                })
            },
            handelCancel() {
                this.visible = false
            },
            handleOk() {
                this.form.validateFieldsAndScroll((err, value) => {
                    if (!err) {
                        value.orderUserId = this.comInfo.financeUserId
                        if (this.record.id) {
                            value.id = this.record.id
                        }
                        value.relatePics = this.$refs.uploadImg.fileId
                        addOrder(value).then(res => {
                            this.$message.info(res.message)
                            if (res.success) {
                                this.$parent._loadData()
                                this.visible = false
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="stylus">
    .add-order
        .ant-form-item-control-wrapper
            display inline-block
        .ant-form-item-label
            vertical-align top
            width: 135px
        .remark-wrapper, .plot-wrapper
            width 100%
            display flex
            margin-right 30px
            .ant-form-item-control-wrapper
                flex 1
        .content-select
            position relative
            .ant-form-item-control-wrapper
                margin-left: 135px
            .ant-form-item-label
                position:absolute
            .ant-radio-wrapper
                width: 120px
        .desc
            width 60%
            display inline-block
            height 32px
            text-align center
            background rgba(238,238,238,1)
            border 1px solid rgba(170,170,170,1)
            vertical-align middle
            line-height 30px
</style>