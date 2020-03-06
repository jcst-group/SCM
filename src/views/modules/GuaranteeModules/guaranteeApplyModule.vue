<template>
    <a-modal
            :title="title"
            v-model="visible"
            style="top:10%;height: 90%;"
            :width='1040'
            :maskClosable="false"
            class="guaranteeapply-module">
        <a-form
                :form="form">
            <a-tabs v-model="tabnums" type="card">
                <a-tab-pane tab="基础信息" key="1">
                    <div class="boxs">
                        <div class="info-title">信息材料</div>
                        <div class="form-wrapper">
                            <a-form-item label='贷款主体：' style="margin-right: 10px">
                                <span class="desc">{{usernames}}</span>
                            </a-form-item>
                            <a-form-item label='申请贷款类型：'>
                                <span class="desc" v-if="record.loadType">{{record.loadType.displayName}}</span>
                            </a-form-item>
                            <a-form-item label='联系电话：'>
                                <span class="desc">{{record.charTwo}}</span>
                            </a-form-item>
                        </div>
                        <div class="form-wrapper">
                            <a-form-item label='贷款金额(元)：' style="margin-right: 10px" v-if="record.loanBatchInfo">
                                <span class="desc">{{record.loanBatchInfo.loanSum}}</span>
                            </a-form-item>
                            <a-form-item label='贷款银行：' style="margin-right: 10px">
                                <span class="desc" v-if="record.bankUser">{{record.bankUser.cominfo.username}}</span>
                            </a-form-item>
                            <a-form-item label='担保公司：' v-if="isguar==1">
                                <span class="desc" v-if="record.guaranteeUser">{{record.guaranteeUser.cominfo.username}}</span>
                            </a-form-item>
                        </div>
                        <div class="form-wrapper">
                            <a-form-item label='计划贷款期：'>
                                <span class="desc">{{record.startTime}}</span>
                                至
                                <span class="desc">{{record.endTime}}</span>
                            </a-form-item>
                            <div v-if="isbatch">
                                <a-form-item label='种植批次：'>
                                    <span class="desc">{{basename}}</span>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="form-wrapper" v-if="record.charOne">
                            <a-form-item label='备注信息：'>
                                <span class="descs" style="padding-left: 20px">{{record.charOne}}</span>
                            </a-form-item>
                        </div>
                        <div class="idcart-wrapper" v-if="relatePics!=''">
                            <span>附加材料上传：</span>
                            <lookImg
                                    :imgUrl='item.pictureUrl'
                                    v-for="item in relatePics"
                                    :key="item.id">
                            </lookImg>
                        </div>
                    </div>
                    <div class="boxs" v-if="statuscode=='WARRANT_APPLY'&&usertype=='WARRANT'">
                        <div class="info-title">拟担保处理</div>
                        <span style="display: inline-block;float: left;margin-left: 20px;">相关材料上传：</span>
                        <upload-img style="display: inline-block;width: 80%;" ref="uploadImg" :useDelete="true" :record='{orderId: record.id}' imgurl="/api/finance/pictureInfo/addWarrantApplyedPic"></upload-img>
                        <div class="form-wrapper">
                            <a-form-item  label='情况说明:' class="remark-wrappers">
                                <a-textarea
                                        :autosize="{ minRows: 5, maxRows: 5}"
                                        width="356px"
                                        v-model="dealMessage"/>
                            </a-form-item>
                        </div>
                    </div>
                    <div class="boxs" v-if="statuscode=='LOAN_APPLY'&&usertype=='BANKCOMP'">
                        <div class="info-title">审核贷款操作</div>
                        <span style="display: inline-block;float: left;margin-left: 20px;">相关材料上传：</span>
                        <upload-img style="display: inline-block;width: 80%;" ref="uploadImg" :useDelete="true" :record='{orderId: record.id}' imgurl="/api/finance/pictureInfo/addLoanApplyedPic"></upload-img>
                        <div class="form-wrapper">
                            <a-form-item  label='情况说明:' class="remark-wrappers">
                                <a-textarea
                                        :autosize="{ minRows: 5, maxRows: 5}"
                                        width="356px"
                                        v-model="dealMessage"/>
                            </a-form-item>
                        </div>
                    </div>
                    <div class="boxs" v-if="statuscode=='WARRANT_APPROVE'&&usertype=='WARRANT'">
                        <div class="info-title">担保处理</div>
                        <span style="display: inline-block;float: left;margin-left: 20px;">相关材料上传：</span>
                        <upload-img style="display: inline-block;width: 80%;" ref="uploadImg" :useDelete="true" :record='{orderId: record.id}' imgurl="/api/finance/pictureInfo/addWarrantApprovedPic"></upload-img>
                        <div class="form-wrapper">
                            <a-form-item  label='情况说明:' class="remark-wrappers">
                                <a-textarea
                                        :autosize="{ minRows: 5, maxRows: 5}"
                                        width="356px"
                                        v-model="dealMessage"/>
                            </a-form-item>
                        </div>
                    </div>
                    <div class="boxs" v-if="statuscode=='LOAN_APPROVE'&&usertype=='BANKCOMP'">
                        <div class="info-title">审批贷款操作</div>
                        <span style="display: inline-block;float: left;margin-left: 20px;">相关材料上传：</span>
                        <upload-img style="display: inline-block;width: 80%;" ref="uploadImg" :useDelete="true" :record='{orderId: record.id}' imgurl="/api/finance/pictureInfo/addLoanApprovedPic"></upload-img>
                        <div class="form-wrapper">
                            <a-form-item  label='情况说明:' class="remark-wrappers">
                                <a-textarea
                                        :autosize="{ minRows: 5, maxRows: 5}"
                                        width="356px"
                                        v-model="dealMessage"/>
                            </a-form-item>
                        </div>
                    </div>
                    <div class="boxs">
                        <div class="info-title">处理信息</div>
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
                </a-tab-pane>
                <a-tab-pane tab="农户/社员信息" key="2">
                    <div class="table-wrapper">
                        <div style="width: 100%;text-align: center">
                            地块总面积:{{area}}亩
                        </div>
                        <a-table
                                style="margin-top: 10px"
                                :columns="columns"
                                :dataSource="dataSource"
                                :pagination="false"
                                :loading="loading"
                                :scroll="{ x: 1300}"
                                rowKey="id"
                                bordered>
                            <a-popover slot="street" slot-scope="text">
                                <template slot="content">
                                    <div>{{text}}</div>
                                </template>
                                <div  style="width:100px;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;margin: 0 auto;">{{text}}</div>
                            </a-popover>
                            <a-popover slot="memberAddress" slot-scope="text">
                                <template slot="content">
                                    <div>{{text}}</div>
                                </template>
                                <div style="width:150px;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;margin: 0 auto;">
                                    {{text}}
                                </div>
                            </a-popover>
                            <a-popover slot="blockInfo" slot-scope="text">
                                <template slot="content">
                                    <div>{{text}}</div>
                                </template>
                                <div style="width:100px;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;margin: 0 auto;">
                                    {{text}}
                                </div>
                            </a-popover>
                            <span slot="action" slot-scope="text, record">
                        <a @click="handleLook(record)">查看详情</a>
                    </span>
                        </a-table>
                        <div style="margin-top: 20px;" v-if="this.dataSources!=''&&isbatch">
                            <div style="margin-bottom: 20px"><span>费用信息</span></div>
                            <div style="width: 100%;text-align: center">
                                费用总额:{{loanSum}}元
                            </div>
                            <a-table
                                    style="margin-top: 10px"
                                    :columns="columnss"
                                    :dataSource="dataSources"
                                    :pagination="pagination"
                                    :loading="loadings"
                                    rowKey="id"
                                    @change="changeTable"
                                    bordered>
                            </a-table>
                        </div>
                    </div>
                </a-tab-pane>
                <a-tab-pane tab="担保情况" key="3">
                    <div class="boxs">
                        <div class="info-title">拟担保材料</div>
                        <div class="idcarts-wrappers" v-if="record.warrantApplyedPics!=''">
                            <span style="display: inline-block;float: left;">相关材料：</span>
                            <lookImg
                                    :imgUrl='item.pictureUrl'
                                    v-for="item in record.warrantApplyedPics"
                                    :key="item.id">
                            </lookImg>
                        </div>
                        <div class="idcarts-wrappers" v-if="record.warrantApplyedPics==''">
                            <span style="display: inline-block;float: left;">相关材料：</span>
                            <span class="desc">暂无</span>
                        </div>
                    </div>
                    <div class="boxs">
                        <div class="info-title">担保材料</div>
                        <div class="idcarts-wrappers" v-if="record.warrantApprovedPics!=''">
                            <span style="display: inline-block;float: left;">相关材料：</span>
                            <lookImg
                                    :imgUrl='item.pictureUrl'
                                    v-for="item in record.warrantApprovedPics"
                                    :key="item.id">
                            </lookImg>
                        </div>
                        <div class="idcarts-wrappers" v-if="record.warrantApprovedPics==''">
                            <span style="display: inline-block;float: left;">相关材料：</span>
                            <span class="desc">暂无</span>
                        </div>
                    </div>
                </a-tab-pane>
                <a-tab-pane tab="银行情况" key="4">
                    <div class="boxs">
                        <div class="info-title">银行审核材料</div>
                        <div class="idcarts-wrappers" v-if="record.loanApplyedPics!=''">
                            <span style="display: inline-block;float: left;">相关材料：</span>
                            <lookImg
                                    :imgUrl='item.pictureUrl'
                                    v-for="item in record.loanApplyedPics"
                                    :key="item.id">
                            </lookImg>
                        </div>
                        <div class="idcarts-wrappers" v-if="record.loanApplyedPics==''">
                            <span style="display: inline-block;float: left;">相关材料：</span>
                            <span class="desc">暂无</span>
                        </div>
                    </div>
                    <div class="boxs">
                        <div class="info-title">银行审批材料</div>
                        <div class="idcarts-wrappers" v-if="record.loanApprovedPics!=''">
                            <span style="display: inline-block;float: left;">相关材料：</span>
                            <lookImg
                                    :imgUrl='item.pictureUrl'
                                    v-for="item in record.loanApprovedPics"
                                    :key="item.id">
                            </lookImg>
                        </div>
                        <div class="idcarts-wrappers" v-if="record.loanApprovedPics==''">
                            <span style="display: inline-block;float: left;">相关材料：</span>
                            <span class="desc">暂无</span>
                        </div>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </a-form>
        <lookMember ref="lookMember"></lookMember>
        <div slot="footer" v-if="usertype=='WARRANT'&&statuscode=='WARRANT_APPLY' || usertype=='WARRANT'&&statuscode=='WARRANT_APPROVE' || usertype=='BANKCOMP'&&statuscode=='LOAN_APPLY' || usertype=='BANKCOMP'&&statuscode=='LOAN_APPROVE'">
            <a-button type="danger" @click="handelCancel">不予处理</a-button>
            <a-button type='primary' @click="handleOk">接受申请</a-button>
        </div>
        <div slot="footer" v-if="usertype=='COOPERATIVE' || usertype=='WARRANT'&&statuscode!='WARRANT_APPLY'&&statuscode!='WARRANT_APPROVE' || usertype=='BANKCOMP'&&statuscode!='LOAN_APPLY'&&statuscode!='LOAN_APPROVE'">
            <a-button type='primary' @click="handleseed">关闭查看</a-button>
        </div>
    </a-modal>
</template>

<script>
    import moment from 'moment'
    import {
        getLoanApplyTypeEnum,
        queryBankCominfos,
        queryWarrantCominfos,
        allByIdbatch,
        saveOrUpdateloan,
        loanwarrantApply,
        loanApplyAgree,
        WarrantApproveAgree,
        loanApproveAgree,
        loanreject,
    } from '@/api/allApi'
    import lookImg from '@/components/lookImg'
    import lookMember from '../CooperativeModules/lookMember'
    import uploadImg from '@/components/uploadImg'
    export default {
        components: {
            lookImg,
            lookMember,
            uploadImg
        },
        data() {
            return {
                statuscode:'',
                dealMessage:'',
                basename:'',
                usernames:'',
                isdisable: false,
                relatePics: [],
                tabnums: '1',
                isguar: 2,
                loanSum: 0,
                loanArea: 0,
                pageNo: null,
                pageSize: null,
                pagination: {
                    pageSizeOptions: ["10", "20", "50"],
                    showTotal: (total, range) => {
                        return range[0] + "-" + range[1] + " 共" + total + "条";
                    },
                    showQuickJumper: true,
                    showSizeChanger: true,
                },
                dataSources: [],
                loadings: false,
                area: 0,
                batchId: '',
                visible: false,
                form: this.$form.createForm(this),
                record: {},
                title: '',
                typeData: [],
                batchData: [],
                guaranteeCompany: [],
                guaranteeCheck: true,
                bankCompany: [],
                userinfo: {},
                applydata: [],
                isbatch: false,
                basedata: [],
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
                        scopedSlots: {customRender: "memberAddress"},
                        align: "center"
                    },
                    {
                        title: '详细地址',
                        dataIndex: 'address.street',
                        scopedSlots: {customRender: "street"},
                        align: "center"
                    },
                    {
                        title: '身份证号',
                        dataIndex: 'identifyCode',
                        align: "center"
                    },
                    {
                        title: '地块面积(亩)',
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
                        scopedSlots: {customRender: "blockInfo"},
                        align: "center"
                    },
                    {
                        title: '操作',
                        dataIndex: "action",
                        scopedSlots: {customRender: "action"},
                        align: "center",
                        fixed:'right'
                    }
                ],
                columnss: [
                    {
                        title: '费用名称',
                        dataIndex: 'farmingItem.farmingName',
                        align: "center"
                    },
                    {
                        title: '费用类型',
                        dataIndex: 'itemType.displayName',
                        align: "center"
                    },
                    {
                        title: '名称',
                        dataIndex: 'materialName',
                        align: "center"
                    },
                    {
                        title: '数量',
                        dataIndex: 'num',
                        align: "center"
                    },
                    {
                        title: '单位',
                        dataIndex: 'company',
                        align: "center"
                    },
                    {
                        title: '费用金额(元)',
                        dataIndex: 'budgetCosts',
                        align: "center"
                    },
                    {
                        title: '开始时间',
                        dataIndex: 'startTime',
                        align: "center"
                    },
                    {
                        title: '结束时间',
                        dataIndex: 'endTime',
                        align: "center"
                    }
                ],
                dataSource: [],
                loading: false,
                usertype:'',
            }
        },
        methods: {
            moment,
            look(record) {
                this.statuscode = '';
                this.title = '查看贷款申请';
                this.form.resetFields()
                this.usertype = window.localStorage.userType;
                this.visible = true
                this.isdisable = true;
                this.dealMessage = '';
                this.tabnums = '1';
                this.record = record;
                this.statuscode = record.status.code
                if(record.coperativeUser){
                    this.usernames = this.record.coperativeUser.cominfo.username
                }
                this.area = 0;
                this.loanSum = 0;
                this.loanArea = 0;
                this.dataSource = [];
                this.dataSources = [];
                this.relatePics = [];
                getLoanApplyTypeEnum().then((res) => {
                    if (res.success) {
                        this.applydata = res.result;
                    }
                })
                queryBankCominfos().then((res) => {
                    if (res.success) {
                        this.bankCompany = res.result;
                    }
                })
                queryWarrantCominfos().then((res) => {
                    if (res.success) {
                        this.guaranteeCompany = res.result;
                    }
                })
                allByIdbatch({id:record.coperativeUser.id}).then((res) => {
                    if (res.success) {
                        this.basedata = res.result;
                        let that = this;
                        this.basedata.forEach(item => {
                            if(item.id === record.loanBatchInfo.batchId){
                                that.basename = item.batchName;
                            }
                        })
                    }
                })
                if (record.ifguarantee.displayName == '否') {
                    this.isguar = 2;
                } else {
                    this.isguar = 1;
                }
                this.guaranteeCheck = true
                this.area = this.loanArea = this.record.loanBatchInfo.loanArea;
                this.dataSource = this.record.loanBatchInfo.financeMembers.map(item => {
                    item.value = item.id + ''
                    item.label = item.realName
                    item.memberAddress = item.address.province + item.address.city + item.address.area
                    return item
                })
                if (record.loadType.code == 'PLANT') {
                    this.isbatch = true
                    this.batchId = this.record.loanBatchInfo.batchId;
                    this.dataSources = [];
                    this.dataSources = this.record.loanBatchInfo.loanFarmItems
                    this.loanSum = this.record.loanBatchInfo.loanSum
                } else {
                    this.dataSources = [];
                    this.isbatch = false
                }
                this.$nextTick(() => {
                    if (this.record.relatePics) {
                        this.relatePics = this.record.relatePics;
                    }
                })
            },
            handleLook(record) {
                this.$refs.lookMember.open(record)
            },
            dataPick(date, dateString) {
                console.log(date, dateString)
            },
            checkRadio(e, type) {
                if (type === 'bank') {
                    this.form.resetFields('bank')
                }
                if (type === 'guarantee') {
                    this.form.resetFields('guarantee')
                }
                this[type + 'Check'] = e.target.value === 2
            },
            handelCancel() {
                return new Promise((resolve) => {
                    var that = this
                    this.$confirm({
                        title: '确定要不予受理吗',
                        onCancel() {
                            return resolve(false)
                        },
                        onOk() {
                            let type = 0;
                            if(that.record.status.code=='WARRANT_APPLY'){
                                type = 1;
                            }else if(that.record.status.code=='LOAN_APPLY'){
                                type = 2;
                            }else if(that.record.status.code=='WARRANT_APPROVE'){
                                type = 3;
                            }else if(that.record.status.code=='LOAN_APPROVE'){
                                type = 4;
                            }
                            loanreject({id:that.record.id,dealMessage:that.dealMessage,type:type}).then(res => {
                                if(res.success){
                                    that.$message.success(res.message)
                                    that.$parent._loadData()
                                }
                                that.tabnums = '1';
                                that.visible = false
                            })
                            return resolve(true)
                        }
                    })
                }).then(res => {
                    return res
                })
            },
            handleOk() {
                let that = this
                if (this.title == '查看贷款申请') {
                    return new Promise((resolve) => {
                        this.$confirm({
                            title: '确定要接受申请吗',
                            onCancel() {
                                return resolve(false)
                            },
                            onOk() {
                                if(that.record.status.code=='WARRANT_APPLY'){
                                    loanwarrantApply({id:that.record.id,dealMessage:that.dealMessage}).then(res => {
                                        if(res.success){
                                            that.$message.success(res.message)
                                            that.$parent._loadData()
                                        }
                                        that.visible = false
                                    })
                                }else if(that.record.status.code=='LOAN_APPLY'){
                                    loanApplyAgree({id:that.record.id,dealMessage:that.dealMessage}).then(res => {
                                        if(res.success){
                                            that.$message.success(res.message)
                                            that.$parent._loadData()
                                        }
                                        that.visible = false
                                    })
                                }else if(that.record.status.code=='WARRANT_APPROVE'){
                                    WarrantApproveAgree({id:that.record.id,dealMessage:that.dealMessage}).then(res => {
                                        if(res.success){
                                            that.$message.success(res.message)
                                            that.$parent._loadData()
                                        }
                                        that.visible = false
                                    })
                                }else if(that.record.status.code=='LOAN_APPROVE'){
                                    loanApproveAgree({id:that.record.id,dealMessage:that.dealMessage}).then(res => {
                                        if(res.success){
                                            that.$message.success(res.message)
                                            that.$parent._loadData()
                                        }
                                        that.visible = false
                                    })
                                }
                                return resolve(true)
                            }
                        })
                    }).then(res => {
                        return res
                    })
                }
            },
            handleseed(){
                this.visible = false
            },
            changeapply(value) {
                value == 'PLANT' ? this.isbatch = true : this.isbatch = false
            },
            changeTable(page) {
                this.pageNo = page.current
                this.pageSize = page.pageSize
            },
        }
    }
</script>

<style lang="stylus">
    .guaranteeapply-module
        .ant-modal-body
            padding 10px 24px

        .form-wrapper
            display flex

            .check-wrapper
                width 120px
                display inline-block
                margin-right 20px

            .ant-form-item-control-wrapper
                display inline-block

            .ant-form-item-label
                vertical-align top
                width 120px

            .remark-wrapper, .remark-wrappers
                width 100%
                display flex
                margin-right 30px

                .ant-form-item-control-wrapper
                    flex 1

            .remark-wrappers
                .ant-form-item-control-wrapper
                    width 356px !important

            .label-wrapper
                label
                    top -10px

        .idcart-wrapper,.idcarts-wrappers
            padding 0 20px
            display flex
            margin-bottom 20px
            span
                width: 100px
            .container
                margin-right: 10px
        .desc
            width 190px
            display inline-block
            height 32px
            text-align center
            background rgba(238,238,238,1)
            border 1px solid rgba(170,170,170,1)
            vertical-align middle
            line-height 30px
        .descs
            width 402px
            display inline-block
            background rgba(238,238,238,1)
            border 1px solid rgba(170,170,170,1)
            vertical-align middle
            line-height 30px
        .boxs
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
                margin-bottom 20px
            .flex-wrapper
                display flex
                padding 5px 0
                span
                    margin-right: 8px
                span:nth-of-type(1),span:nth-of-type(2)
                    width 160px
                span:nth-of-type(3)
                    flex: 1
        .idcarts-wrappers
            padding 0 40px
        .ant-btn-primary
            background #2c909c
            border-color #2c909c
</style>
