<template>
    <a-modal
        :title="title"
        v-model="visible"
        style="top:10%;height: 90%"
        :width='1100'
        :maskClosable="false"
        class="add-insurance">
        <a-form
            :form="form">
            <div class="form-wrapper">
                <a-form-item label='投保人：' style="margin-right: 10px">
                    <a-input
                        v-if="!this.look"
                        disabled
                        placholder='自动填入'
                        v-decorator="['financeUserId', {
                        initialValue: this.initValue.username,
                        rules: [{required: true, message: '必须带有投保人'}]
                    }]">
                    </a-input>
                    <template v-else>
                        <span class="desc" style="width: 200px">{{record.coperativeUser.cominfo.username}}</span>
                    </template>
                </a-form-item>
                <a-form-item label='申请保险类型：'>
                    <a-select
                    v-if="!this.look"
                    style="width: 200px"
                    v-decorator="['insuranceType',{
                        initialValue:record.insuranceType ? record.insuranceType.code : '',
                        rules: [{required: true, message: '请选择保险类型'}]
                    }]">
                        <a-select-option
                            v-for="item in typeData"
                            :key="item.value"
                            :value='item.code'>
                            {{item.displayName}}
                        </a-select-option>
                    </a-select>
                    <template v-else>
                        <span class="desc" style="width: 200px">{{record.insuranceType.displayName}}</span>
                    </template>
                </a-form-item>
                <a-form-item label='联系电话：'>
                    <a-input
                        v-if="!this.look"
                        style="width: 218px;"
                        v-decorator="['contractNum',{
                        initialValue:record.contractNum,
                        rules: [{
                            required: true,
                            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                            message: '联系电话格式不对'
                        }]
                    }]">
                    </a-input>
                    <template v-else>
                        <span class="desc" style="width: 218px">{{record.contractNum ? record.contractNum: '无'}}</span>
                    </template>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='计划投保期：'>
                    <a-range-picker
                        v-if="!this.look"
                        style="width:515px"
                        v-decorator="[
                            'monitorTime', {
                                initialValue: record.startTime ? [moment(record.startTime), moment(record.endTime)] : [],
                                rules: [{
                                    required: true,
                                    message: '请选择计划投保期'
                                }]
                            }
                        ]"
                    />
                    <template v-else>
                        <span class="desc" style="width: 530px;letter-spacing: 1px">{{record.startTime}}至{{record.endTime}}</span>
                    </template>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='保险公司选择：' class="remark-wrapper">
                    <!-- <div class="check-wrapper">
                        <a-radio-group @change="(e) => {checkRadio(e, 'insurance')}" name="insuranceGroup" :defaultValue="2">
                            <a-radio :value="1">指定担保公司</a-radio>
                            <a-radio :value="2">不指定担保公司</a-radio>
                        </a-radio-group>
                    </div> -->
                    <a-select
                    v-if="!this.look"
                    style="width: 220px;"
                    v-decorator="['insuranceId', {
                        initialValue:record.insuranceUser ? record.insuranceUser.cominfo.financeUserId : '',
                        rules: [{
                            required: true,
                            message: '请选择保险公司'
                        }]
                    }]">
                        <a-select-option
                            v-for="item in insuranceCompany"
                            :key="item.financeUserId"
                            :value='item.financeUserId'>
                            {{item.username}}
                        </a-select-option>
                    </a-select>
                    <template v-else>
                        <span class="desc" style="width: 220px">{{record.insuranceUser ? record.insuranceUser.cominfo.username : '无'}}</span>
                    </template>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='备注信息：' class="remark-wrapper" :class="{'label-wrapper': !this.look}">
                    <a-textarea
                        v-if="!this.look"
                        style="width: 80%"
                        v-decorator="['comment', {
                            initialValue:record.comment
                        }]"/>
                    <template v-else>
                        <span class="desc" style="width: 80%">{{record.comment ? record.comment : '无'}}</span>
                    </template>
                </a-form-item>
            </div>
            <div class="img-wrapper" style="padding: 0 20px; margin-bottom: 20px" v-if="record.orderPics && record.orderPics.length">
                <span style="display:inline-block;width:100px;text-align:right;vertical-align: top">保单资料：</span>
                <look-img
                    ref="lookImg"
                    style="display: inline-block; margin-right: 10px"
                    v-for="item in record.orderPics"
                    :key="item.id"
                    :imgUrl='item.pictureUrl'>
                </look-img>
            </div>
            <div class="table-wrapper">
                <div class="add-member" style="overflow:hidden" v-if="!this.look">
                    <span>投保农户/社员（多选）：</span>
                    <a-button @click="addMember" type='primary' style="float: right">添加</a-button>
                </div>
                <a-table
                    style="margin-top: 10px"
                    :columns="columns"
                    :dataSource="dataSource"
                    :pagination="false"
                    :loading="loading"
                    rowKey="id"
                    bordered>
                    <span v-if="record.label" slot="action" slot-scope="text, record">
                        <a @click="handleDelete(record)">删除</a>
                    </span>
                    <span v-else slot="action" slot-scope="text, record">
                        <a @click="handleLook(record)">查看详情</a>
                    </span>
                </a-table>
            </div>
        </a-form>
        <div class="list-show" v-if="this.look && record.messages && record.messages.length">
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
        <lookMember ref="lookMember"></lookMember>
        <addMember ref="addMember" @checkMember='checkMember'></addMember>
        <div slot="footer">
            <div v-if="!this.look">
                <a-button @click="handelCancel">取消</a-button>
                <a-button type='primary' @click="handleOk">确定</a-button>
            </div>
            <div v-else>
                <a-button @click="handelCancel">关闭</a-button>
            </div>
        </div>
    </a-modal>
</template>

<script>
    import moment from 'moment'
    import {getInsuranceType, getInsuranceCompany, addCoopInsurance} from '@/api/allApi'
    import lookImg from '@/components/lookImg'
    import lookMember from './lookMember'
    import addMember from './addMember'
    export default {
        components: {
            lookImg,
            lookMember,
            addMember
        },
        data() {
            return {
                visible: false,
                form: this.$form.createForm(this),
                record: {},
                title: '',
                typeData: [],
                insuranceCompany: [],
                look: false,
                // insuranceCheck: true,
                initValue: '',
                loading: false,
                dataSource: [],
                columns: [
                    {
                        title: '农民编码',
                        dataIndex: 'memberCode',
                        align: "center"
                    },
                    {
                        title: '农民姓名',
                        dataIndex: 'realName',
                        align: "center"
                    },
                    {
                        title: '地址',
                        dataIndex: 'memberAddress',
                        align: "center"
                    },
                    {
                        title: '详细地址',
                        dataIndex: 'address.street',
                        align: "center"
                    },
                    {
                        title: '身份证号',
                        dataIndex: 'identifyCode',
                        align: "center"
                    },
                    {
                        title: () => {
                            if (this.record.plantInfo && this.record.plantInfo.insuranceUnit) {
                                return `地块面积(${this.record.plantInfo.insuranceUnit})`
                            }
                            return '地块面积'
                        },
                        dataIndex: 'blockArea',
                        align: "center"
                    },
                    {
                        title: '联系方式',
                        dataIndex: 'phone',
                        align: "center"
                    },
                    {
                        title: '地块位置',
                        dataIndex: 'blockInfo',
                        align: "center"
                    },
                    {
                        title: '操作',
                        dataIndex: "action",
                        scopedSlots: { customRender: "action" },
                        align: "center",
                        width: '10%'
                    }
                ]
            }
        },
        created() {
            getInsuranceType().then(res => {
                if (res.success) {
                    this.typeData = res.result
                }
            })
            getInsuranceCompany().then(res => {
                if (res.success) {
                    this.insuranceCompany = res.result
                }
            })
            this.initValue = JSON.parse(window.localStorage.info)
        },
        methods: {
            open(record, look) {
                this.look = !!look
                this.form.resetFields()
                this.visible = true
                this.title = look ? '查看贷款申请' : '编辑贷款申请'
                this.record = record !== undefined ? JSON.parse(JSON.stringify(record)) : {}
                if (this.record.plantInfo) {
                    this.dataSource = this.record.plantInfo.financeMembers.map(item => {
                        if (!this.look) {
                            item.value = item.id + ''
                            item.label = item.realName
                        }
                        item.memberAddress = item.address.province + item.address.city + item.address.area
                        return item
                    })
                } else {
                    this.dataSource = []
                }
            },
            moment,
            addMember() {
                this.$refs.addMember.open(this.dataSource)
            },
            checkMember(list) {
                this.dataSource = list
            },
            checkRadio(e, type) {
                this[type + 'Check'] = e.target.value === 2
            },
            handleLook(record) {
                this.$refs.lookMember.open(record)
            },
            handleDelete(record) {
                let index = this.dataSource.findIndex(item => {
                    return item.id === record.id
                })
                this.dataSource.splice(index, 1)
            },
            handelCancel() {
                this.visible = false
            },
            handleOk() {
                this.form.validateFieldsAndScroll((err, value) => {
                    if (!err) {
                        value.plantInfo = {}
                        value.financeUserId = this.initValue.financeUserId
                        value.startTime = moment(value.monitorTime[0]).format('YYYY-MM-DD')
                        value.endTime = moment(value.monitorTime[1]).format('YYYY-MM-DD')
                        if (this.dataSource.length) {
                            value.plantInfo.financeMembers = this.dataSource.map(item => {
                                return {
                                    id: item.id
                                }
                            })
                        }
                        if (this.record.id) {
                            value.id = this.record.id
                            value.plantInfo.id = this.record.plantInfo.id
                        }
                        addCoopInsurance(value).then(res => {
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
    .add-insurance
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
        .form-wrapper
            display flex
            .desc
                display inline-block
                height 80%
                text-align center
                background rgba(238,238,238,1)
                border 1px solid rgba(170,170,170,1)
                vertical-align middle
                line-height 30px
            .check-wrapper
                width 120px
                display inline-block
                margin-right 20px
            .ant-form-item-control-wrapper
                display inline-block
            .ant-form-item-label
                vertical-align top
                width 120px
            .remark-wrapper
                width 100%
                display flex
                margin-right 30px
                .ant-form-item-control-wrapper
                    flex 1
            .label-wrapper
                label
                    top -10px
</style>
