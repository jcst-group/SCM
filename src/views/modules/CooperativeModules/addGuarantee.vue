<template>
    <a-modal
        :title="title"
        v-model="visible"
        @ok="handleOk"
        @cancel='handelCancel'
        style="top:10%;height: 90%;"
        :width='1040'
        cancelText="取消"
        okText="确定"
        :maskClosable="false"
        class="add-guarantee">
        <a-form
                :form="form">
        <a-tabs v-model="tabnums" type="card">
            <a-tab-pane tab="基础信息" key="1">
                    <div class="form-wrapper">
                        <a-form-item label='贷款主体：' style="margin-right: 10px">
                            <a-input
                                    disabled
                                    placholder='自动填入'
                                    v-decorator="['body',{
                        initialValue: userinfo ? userinfo.username : null,
                        rules: [{required: false, message: ''}]
                    }]">
                            </a-input>
                        </a-form-item>
                        <a-form-item label='申请贷款类型：'>
                            <a-select
                                    :disabled="isdisable"
                                    style="width: 200px"
                                    @change='changeapply'
                                    v-decorator="['loadType',{
                        initialValue: record.loadType ? record.loadType.code : null,
                        rules: [{required: true, message: '请选择贷款类型'}]
                    }]">
                                <a-select-option
                                        v-for="item in applydata"
                                        :key="item.code"
                                        :value='item.code'>
                                    {{item.displayName}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label='联系电话：'>
                            <a-input
                                    :disabled="isdisable"
                                    style="width: 218px;"
                                    v-decorator="['charTwo',{
                         initialValue: record ? record.charTwo : null,
                        rules: [{
                            required: true,
                            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                            message: '联系电话格式错误'
                        }]
                    }]">
                            </a-input>
                        </a-form-item>
                    </div>
                    <div class="form-wrapper">
                        <a-form-item label='贷款银行选择：' class="remark-wrapper">
                            <a-select
                                    :disabled="isdisable"
                                    v-decorator="['bankId',{
                        initialValue: record ? record.bankId : null,
                        rules: [{required: true, message: '请选择贷款银行'}]
                    }]">
                                <a-select-option
                                        v-for="item in bankCompany"
                                        :key="item.financeUserId"
                                        :value='item.financeUserId'>
                                    {{item.username}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label='担保公司选择：' class="remark-wrapper">
                            <div class="check-wrapper" style="margin-right: 13px">
                                <a-radio-group :disabled="isdisable" @change="(e) => {checkRadio(e, 'guarantee')}" name="guaranteeGroup" v-model="isguar">
                                    <a-radio :value="1">指定担保公司</a-radio>
                                    <a-radio :value="2">不指定担保公司</a-radio>
                                </a-radio-group>
                            </div>
                            <a-select
                                    :disabled='guaranteeCheck'
                                    style="width: 220px;position:absolute;top: -45px"
                                    v-decorator="['guaranteeId',{
                        initialValue: record ? record.guaranteeId : null,
                        rules: [{required: !guaranteeCheck, message: '请选择担保公司'}]
                    }]">
                                <a-select-option
                                        v-for="item in guaranteeCompany"
                                        :key="item.financeUserId"
                                        :value='item.financeUserId'>
                                    {{item.username}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div class="form-wrapper">
                        <a-form-item label='计划贷款期：' class="remark-wrapper">
                            <a-range-picker
                                    :disabled="isdisable"
                                    style="width:345px"
                                    @change='dataPick'
                                    v-decorator="[
                            'monitorTime', {
                                initialValue: record.startTime ? [moment(record.startTime), moment(record.endTime)] : null,
                                rules: [{
                                    required: true,
                                    message: '请选择计划贷款期：'
                                }]
                            }
                        ]"
                            />
                        </a-form-item>
                        <a-form-item label='备注信息：' class="remark-wrappers" style="width: 120%;">
                            <a-textarea
                                    :disabled="isdisable"
                                    :autosize="{ minRows: 5, maxRows: 5}"
                                    width="356px"
                                    v-decorator="['charOne',{
                                initialValue: record ? record.charOne : null
                                }]"/>
                        </a-form-item>
                    </div>
                    <div class="form-wrapper">
                        <a-form-item label='种植批次：' v-if="isbatch">
                            <a-select
                                    :disabled="isdisable"
                                    @change='changebatch'
                                    style="width: 220px"
                                    v-decorator="['batchId',{
                         initialValue: batchId,
                        rules: [{required: true, message: '请选择种植批次'}]
                    }]">
                                <a-select-option
                                        v-for="item in basedata"
                                        :key="item.id"
                                        :value='item.id'>
                                    {{item.batchName}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="贷款金额(元)" v-else>
                            <a-input
                                 :disabled="isdisable"
                                 v-decorator="[
                                  'loanSum',
                                  {
                                    initialValue: record.loanBatchInfo ? record.loanBatchInfo.loanSum : null,
                                    rules: [{
                                      required: true, message: '请输入贷款金额'
                                    }]
                                  }
                                ]"
                            />
                        </a-form-item>
                    </div>
                    <div class="form-wrapper"  v-if="!isdisable">
                        <a-form-item
                                label="附加材料上传"
                                class="form-passsword change-display"
                        >
                            <upload-img ref="uploadImg" imgurl="/api/finance/pictureInfo/addLoanRelatePic"></upload-img>
                        </a-form-item>
                    </div>
                    <div class="idcart-wrapper" v-if="isdisable&&relatePics!=''">
                        <span>附加材料上传：</span>
                        <lookImg
                                :imgUrl='item.pictureUrl'
                                v-for="item in relatePics"
                                :key="item.id">
                        </lookImg>
                    </div>
            </a-tab-pane>
            <a-tab-pane tab="农户/社员信息" key="2">
                <div class="table-wrapper">
                    <div class="add-member" style="overflow:hidden" v-if="!isdisable">
                        <span>贷款农户/社员（多选）：</span>
                        <a-button @click="addMember" type='primary' style="float: right">添加</a-button>
                    </div>
                    <div style="width: 100%;text-align: center">
                        地块总面积:{{area}}亩
                    </div>
                    <a-table
                            style="margin-top: 10px"
                            :columns="columns"
                            :dataSource="dataSource"
                            :pagination="false"
                            :loading="loading"
                            rowKey="id"
                            bordered>
                        <a-popover slot="street" slot-scope="text">
                            <template slot="content">
                                <div>{{text}}</div>
                            </template>
                            <div  style="width:60px;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;margin: 0 auto;">{{text}}</div>
                        </a-popover>
                        <a-popover slot="memberAddress" slot-scope="text">
                            <template slot="content">
                                <div>{{text}}</div>
                            </template>
                            <div  style="width:60px;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;margin: 0 auto;">{{text}}</div>
                        </a-popover>
                        <a-popover slot="blockInfo" slot-scope="text">
                            <template slot="content">
                                <div>{{text}}</div>
                            </template>
                            <div  style="width:100px;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;margin: 0 auto;">{{text}}</div>
                        </a-popover>
                        <span v-if="!isdisable" slot="action" slot-scope="text, record">
                            <a @click="handleDelete(record)">删除</a>
                        </span>
                        <span v-else slot="action" slot-scope="text, record">
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
        </a-tabs>
        </a-form>
        <lookMember ref="lookMember"></lookMember>
        <addMember ref="addMember" @checkMember='checkMember'></addMember>
    </a-modal>
</template>

<script>
    import moment from 'moment'
    import {querycominfo,getLoanApplyTypeEnum,queryBankCominfos,queryWarrantCominfos,baseRelateBatchAll,calPrepareItem,saveOrUpdateloan} from '@/api/allApi'
    import uploadImg from '@/components/uploadImg'
    import lookImg from '@/components/lookImg'
    import lookMember from './lookMember'
    import addMember from './addMember'
    export default {
        components: {
            uploadImg,
            addMember,
            lookImg,
            lookMember,
        },
        data() {
            return {
                isdisable:false,
                relatePics:[],
                tabnums:'1',
                isguar:2,
                loanSum:0,
                loanArea:0,
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
                dataSources:[],
                loadings:false,
                area:0,
                batchId:'',
                visible: false,
                form: this.$form.createForm(this),
                record: {},
                title: '',
                typeData: [],
                batchData: [],
                guaranteeCompany: [],
                guaranteeCheck: true,
                bankCompany: [],
                userinfo:{},
                applydata:[],
                isbatch:false,
                basedata:[],
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
                        scopedSlots: { customRender: "memberAddress" },
                        align: "center"
                    },
                    {
                        title: '详细地址',
                        dataIndex: 'address.street',
                        scopedSlots: { customRender: "street" },
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
                        scopedSlots: { customRender: "blockInfo" },
                        align: "center"
                    },
                    {
                        title: '操作',
                        dataIndex: "action",
                        scopedSlots: { customRender: "action" },
                        align: "center",
                        width: '10%'
                    }
                ],
                columnss:[
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

            }
        },
        methods: {
            moment,
            updata(record){
                this.form.resetFields()
                this.batchId = null;
                this.visible = true
                this.isdisable = false;
                this.title = '修改贷款申请'
                this.record = record;
                if(this.record){
                    if(this.record.loanBatchInfo){
                        this.batchId = this.record.loanBatchInfo.batchId;
                    }
                }
                this.area = 0;
                this.loanSum=0;
                this.loanArea=0;
                this.dataSource = [];
                this.dataSources = [];
                this.relatePics = [];
                querycominfo().then((res)=>{
                    if(res.success){
                        this.userinfo = res.result;
                    }
                })
                getLoanApplyTypeEnum().then((res)=>{
                    if(res.success){
                        this.applydata = res.result;
                    }
                })
                queryBankCominfos().then((res)=>{
                    if(res.success){
                        this.bankCompany = res.result;
                    }
                })
                queryWarrantCominfos().then((res)=>{
                    if(res.success){
                        this.guaranteeCompany = res.result;
                    }
                })
                baseRelateBatchAll().then((res)=>{
                    if(res.success){
                        this.basedata = res.result;
                    }
                })
                if(record.ifguarantee.displayName=='否'){
                    this.isguar = 2;
                    this.guaranteeCheck=true
                }else{
                    this.isguar = 1;
                    this.guaranteeCheck=false
                }
                this.area = this.loanArea = this.record.loanBatchInfo.loanArea;
                this.dataSource = this.record.loanBatchInfo.financeMembers.map(item => {
                    item.value = item.id + ''
                    item.label = item.realName
                    item.memberAddress = item.address.province + item.address.city + item.address.area
                    return item
                })
                if(this.record.loadType.code == 'PLANT'){
                    this.isbatch = true
                    this.batchId = this.record.loanBatchInfo.batchId;
                    this.checkMember(this.dataSource);
                }else{
                    this.isbatch = false
                }
                this.$nextTick(() => {
                    if(this.record.relatePics){
                        this.relatePics = this.record.relatePics;
                        this.$refs.uploadImg.imglist = this.relatePics
                    }
                })
            },
            look(record){
                this.title =  '查看贷款申请';
                this.form.resetFields()
                this.batchId = null;
                this.visible = true
                this.isdisable = true;
                this.record = record;
                if(this.record){
                    if(this.record.loanBatchInfo){
                        this.batchId = this.record.loanBatchInfo.batchId;
                    }
                }
                this.area = 0;
                this.loanSum=0;
                this.loanArea=0;
                this.dataSource = [];
                this.dataSources = [];
                this.relatePics = [];
                querycominfo().then((res)=>{
                    if(res.success){
                        this.userinfo = res.result;
                    }
                })
                getLoanApplyTypeEnum().then((res)=>{
                    if(res.success){
                        this.applydata = res.result;
                    }
                })
                queryBankCominfos().then((res)=>{
                    if(res.success){
                        this.bankCompany = res.result;
                    }
                })
                queryWarrantCominfos().then((res)=>{
                    if(res.success){
                        this.guaranteeCompany = res.result;
                    }
                })
                baseRelateBatchAll().then((res)=>{
                    if(res.success){
                        this.basedata = res.result;
                    }
                })
                if(record.ifguarantee.displayName=='否'){
                    this.isguar = 2;
                }else{
                    this.isguar = 1;
                }
                this.guaranteeCheck=true
                this.area = this.loanArea = this.record.loanBatchInfo.loanArea;
                this.dataSource = this.record.loanBatchInfo.financeMembers.map(item => {
                    item.value = item.id + ''
                    item.label = item.realName
                    item.memberAddress = item.address.province + item.address.city + item.address.area
                    return item
                })
                if(this.record.loadType.code == 'PLANT'){
                    this.isbatch = true
                    this.batchId = this.record.loanBatchInfo.batchId;
                    this.checkMember(this.dataSource);
                }else{
                    this.isbatch = false
                }
                this.$nextTick(() => {
                    if(this.record.relatePics){
                        this.relatePics = this.record.relatePics;
                    }
                })
            },
            handleLook(record) {
                this.$refs.lookMember.open(record)
            },
            open(record, look) {
                this.form.resetFields()
                this.visible = true
                this.isdisable = false;
                this.title = look ? '查看贷款申请' : '新增贷款申请'
                this.record = record !== undefined ? record : {}
                this.area = 0;
                this.loanSum=0;
                this.loanArea=0;
                this.batchId = null;
                this.$nextTick(() => {
                    this.$refs.uploadImg.imglist = []
                })
                this.isguar = 2;
                this.isbatch = false
                this.guaranteeCheck=true
                this.dataSource = [];
                this.dataSources = [];
                this.relatePics = [];
                querycominfo().then((res)=>{
                    if(res.success){
                        this.userinfo = res.result;
                    }
                })
                getLoanApplyTypeEnum().then((res)=>{
                    if(res.success){
                        this.applydata = res.result;
                    }
                })
                queryBankCominfos().then((res)=>{
                    if(res.success){
                        this.bankCompany = res.result;
                    }
                })
                queryWarrantCominfos().then((res)=>{
                    if(res.success){
                        this.guaranteeCompany = res.result;
                    }
                })
                baseRelateBatchAll().then((res)=>{
                    if(res.success){
                        this.basedata = res.result;
                    }
                })
            },
            dataPick(date, dateString) {
                console.log(date, dateString)
            },
            checkRadio(e, type) {
                if (type === 'bank') {
                    this.form.resetFields('bank')
                }
                if (type === 'guarantee') {
                    this.record.guaranteeId = null;
                    this.form.resetFields('guaranteeId')
                }
                this[type + 'Check'] = e.target.value === 2
            },
            handelCancel() {
                this.tabnums = '1';
                this.visible = false
            },
            handleOk() {
                if(this.title == '查看贷款申请'){
                    this.visible = false;
                }else{
                    this.form.validateFieldsAndScroll((err, values) => {
                        values.startTime = moment(values.monitorTime[0]).format('YYYY-MM-DD')
                        values.endTime = moment(values.monitorTime[1]).format('YYYY-MM-DD')
                        if(this.dataSource.length==0){
                            this.$message.error('贷款农户/社员不能为空');
                            return;
                        }
                        if (!err) {
                            let params = values
                            let that = this;
                            if(!this.isbatch){
                                if(params.loanSum==0){
                                    that.$message.error('贷款金额不能为0');
                                    return;
                                }else{
                                    that.loanSum = parseFloat(params.loanSum)
                                }
                            }
                            delete params.loanSum
                            params.financeUserId = this.userinfo.financeUserId
                            params.ifguarantee = (!this.guaranteeCheck).toString().toUpperCase()
                            params.relatePics = this.$refs.uploadImg.fileId
                            let loanBatchInfo = {
                                id: '',
                                financeMembers: [],
                                loanFarmItems: [],
                                batchId: params.batchId,
                                loanSum: this.loanSum,
                                loanArea: this.area,
                            };
                            for(let index in this.dataSource){
                                loanBatchInfo.financeMembers.push({
                                    id: this.dataSource[index].id
                                })
                            }
                            let newArr=JSON.parse(JSON.stringify(this.dataSources));
                            if(this.dataSources&&this.isbatch){
                                for(let indexs in this.dataSources){
                                    newArr[indexs].itemType = this.dataSources[indexs].itemType.code;
                                }
                                loanBatchInfo.loanFarmItems = newArr
                            }
                            params.loanBatchInfo = loanBatchInfo;
                            delete params.monitorTime;
                            delete params.body;
                            delete params.batchId
                            if(this.title == '修改贷款申请'){
                                params.loanBatchInfo.id = this.record.loanBatchInfo.id
                                params.id = this.record.id;
                            }
                            saveOrUpdateloan(params).then(res => {
                                if(res.success){
                                    if(that.title == '新增贷款申请'){
                                        that.$message.success('新增贷款申请成功')
                                    }else{
                                        that.$message.success('修改贷款申请成功')
                                    }
                                    this.$parent._loadData()
                                }
                            })
                            this.visible = false;
                        }
                    })
                }
            },
            changeapply(value){
                this.dataSources = [];
                this.loanSum =  0;
                if(value=='PLANT'){
                    this.isbatch = true
                    this.batchId = null;
                }else{
                    this.isbatch = false
                }
            },
            addMember(){
                this.$refs.addMember.open(this.dataSource)
            },
            checkMember(list) {
                this.dataSource = list;
                this.area = 0;
                this.dataSource.forEach(item => {
                    this.area += item.blockArea
                })
                this.loanArea = this.area
                this.countbatch();
            },
            handleDelete(record) {
                let index = this.dataSource.findIndex(item => {
                    return item.id === record.id
                })
                this.dataSource.splice(index, 1)
                if(this.dataSource.length!=0){
                    this.area = 0;
                    this.dataSource.forEach(item => {
                        this.area += item.blockArea
                    })
                    this.loanArea = this.area
                }else{
                    this.area = 0;
                }
                this.countbatch();
            },
            changebatch(value){
                this.batchId = value;
                this.countbatch();
            },
            countbatch(){
                if(!this.batchId || this.area == 0){
                    this.dataSources = [];
                    this.loanSum = 0;
                    return
                }
                this.loadings = true;
                calPrepareItem({area:this.area,batchId:this.batchId}).then(res => {
                    if(res.success){
                        this.dataSources = res.result.list;
                        this.loanSum = res.result.costCount
                    }
                    this.loadings = false;
                })
            },
            changeTable(page) {
                this.pageNo = page.current
                this.pageSize = page.pageSize
                this.countbatch()
            },
        }
    }
</script>

<style lang="stylus">
    .add-guarantee
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
            .remark-wrapper,.remark-wrappers
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
        .idcart-wrapper
            padding 0 20px
            display flex
            margin-bottom 20px
            span
                width: 100px
            .container
                margin-right: 10px
</style>
