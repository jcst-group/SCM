<template>
    <div class="guarantee">
        <div class="img-wrapper">
            <img src="../../assets/img/test.png" width="100%" height="20%" alt="">
        </div>
        <div class="table-content">
            <div class="search-wrapper">
                <a-radio-group @change="changeGroup" name="radioGroup" defaultValue="all">
                    <a-radio
                            v-for="item in typeData"
                            :key="item.value"
                            :value="item.code">
                        {{item.displayName}}
                    </a-radio>
                </a-radio-group>
                <a-button @click="openModule('addGuarantee')" icon='plus' type='primary' style="float: right;margin-right: 20px">
                    <span>新增贷款申请</span>
                </a-button>
            </div>
            <a-table
                style="margin-top: 10px"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="pagination"
                :loading="loading"
                rowKey="id"
                bordered
                :scroll="{ x: 1600}"
                @change="changeTable">
                <span slot="expries" slot-scope="text, record">
                    {{record.startTime}}至{{record.endTime}}
                </span>
                <span slot="member" slot-scope="text, record">
                    <div v-if="record.loanBatchInfo">
                        <a-popover>
                            <template slot='content'>
                              <div v-for="item in record.loanBatchInfo.financeMembers" :key="item.id" style="display: inline-block;width: 47%;text-align: center;margin-bottom: 10px">
                                {{item.realName}}
                              </div>
                            </template>
                            <a-tag v-for="(item,index) in record.loanBatchInfo.financeMembers" v-show="index < 2" :key="item.id" color='#87d068'>
                              {{item.realName}}
                            </a-tag>
                            <span v-if="record.loanBatchInfo.financeMembers.length > 2">……</span>
                        </a-popover>
                    </div>
                </span>
                <span slot="code" slot-scope="text, record">
                    <a @click="handlecodes(record)" v-if="getcodes(record)">查看情况</a>
                    <span  v-else>/</span>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a @click="handleEdit(record)">查看详情</a>
                    <a-divider type="vertical"/>
                    <a-dropdown>
                        <a class="ant-dropdown-link">
                            更多 <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item >
                                <a @click="updataModule(record)">修改</a>
                            </a-menu-item>
                            <a-menu-item v-if="record.messages.length">
                                <a @click="openListModule(record.messages)">状态展示</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a-popconfirm title="确定删除吗?" @confirm="handleDelete(record)">
                                    <a>删除</a>
                                </a-popconfirm>
                            </a-menu-item>
                            <a-menu-item>
                                <a-popconfirm title="确定申请吗?" @confirm="handleApply(record)">
                                    <a>申请</a>
                                </a-popconfirm>
                            </a-menu-item>
                            <a-menu-item >
                                <a-popconfirm title="确定取消申请吗?" @confirm="handleCancel(record)">
                                    <a>取消申请</a>
                                </a-popconfirm>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </span>
            </a-table>
        </div>
        <addGuarantee ref="addGuarantee"></addGuarantee>
        <costDetailsModule ref="costDetailsModule"></costDetailsModule>
        <listModule ref="listModule"></listModule>
        <guaranteeApplyModule ref="guaranteeApplyModule"></guaranteeApplyModule>
    </div>
</template>

<script>
    import tableMixin from '@/mixins/tableMixin'
    import addGuarantee from '../modules/CooperativeModules/addGuarantee'
    import costDetailsModule from '../modules/CooperativeModules/costDetailsModule'
    import listModule from '../modules/CooperativeModules/listModule'
    import guaranteeApplyModule from '../modules/GuaranteeModules/guaranteeApplyModule'
    import {listToCoop,loanapply,loancancel,loandelete,getLoanApplyStatusEnum} from '@/api/allApi'
    export default {
        name: 'guarantee',
        mixins: [tableMixin],
        components: {
            addGuarantee,
            listModule,
            costDetailsModule,
            guaranteeApplyModule
        },
        data() {
            return {
                typeData: [{
                    value: '-1',
                    code: 'all',
                    displayName: '全部'
                }],
                code: 'all',
                loading: false,
                columns: [
                    {
                        title: '系统贷款申请单号',
                        dataIndex: 'loanOrderCode',
                        align: "center",
                        width:'16%'
                    },
                    {
                        title: '贷款类型',
                        dataIndex: 'loadType.displayName',
                        align: "center"
                    },
                    {
                        title: '贷款金额(元)',
                        dataIndex: 'loanBatchInfo.loanSum',
                        align: "center"
                    },
                    {
                        title: '申请贷款使用期',
                        dataIndex: 'expries',
                        scopedSlots: { customRender: "expries" },
                        align: "center"
                    },
                    {
                        title: '申请社员/农户组成',
                        dataIndex: 'member',
                        align: "center",
                        scopedSlots: { customRender: "member" },
                    },
                    {
                        title: '担保公司',
                        dataIndex: 'guaranteeUser.cominfo.username',
                        customRender:function (text) {
                            if(text){
                                return text
                            }
                            return '无'
                        },
                        align: "center",
                        width:'12%'
                    },
                    {
                        title: '贷款银行',
                        dataIndex: 'bankUser.cominfo.username',
                        align: "center",
                        width:'12%'
                    },
                    {
                        title: '贷款状态',
                        dataIndex: 'status.displayName',
                        align: "center",
                        width:'8%'
                    },
                    {
                        title: '工单执行情况',
                        dataIndex: 'status.code',
                        scopedSlots: { customRender: "code" },
                        align: "center",
                        fixed:'right',
                    },
                    {
                        title: '操作',
                        dataIndex: "action",
                        scopedSlots: { customRender: "action" },
                        align: "center",
                        fixed:'right',
                    }
                ],
                dataSource: []
            }
        },
        created() {
            getLoanApplyStatusEnum().then(res => {
                console.log(res)
                if(res.success){
                    this.typeData = this.typeData.concat(res.result)
                }
            })
            this._loadData()
        },
        methods:{
            openListModule(message) {
                this.$refs.listModule.open(message)
            },
            //筛选出对应的数据
            changeGroup(e) {

                this.code = e.target.value
                this._loadData();
            },
            updataModule(record){
                let status = record.status.code;
                if(status=='SAVE' || status=='CANCEL' || status=='FAIL_APPLY'){
                    this.$refs.addGuarantee.updata(record)
                }else{
                    this.$message.info('贷款状态不为保存、拒绝或取消状态，不允许发起修改');
                }
            },
            _loadData(){
                this.loading = true
                let params = this.form.getFieldsValue();
                params.pageNo = this.pageNo
                params.pageSize = this.pageSize
                if (this.code !== 'all') {
                    params.status = this.code
                }
                listToCoop(params).then((res) =>{
                    if(res.success) {
                        if (res.result && res.result.records) {
                            this.$set(this.pagination, 'total', res.result.total)
                            this.$set(this.pagination, 'pageSize', res.result.size)
                            this.$set(this.pagination, 'current', res.result.current)
                            this.dataSource = res.result.records;
                        }
                    }
                    this.loading = false
                })
            },
            handleEdit(record){
                this.$refs.guaranteeApplyModule.look(record)
            },
            handleApply(record) {
                loanapply({
                    id: record.id
                }).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this._loadData()
                    }
                })
            },
            handleCancel(record) {
                loancancel({
                    id: record.id
                }).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this._loadData()
                    }
                })
            },
            handleDelete(record) {
                loandelete({
                    id: record.id
                }).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this._loadData()
                    }
                })
            },
            getcodes(record){
                if(record.status.code=='FINISH'&&record.loadType.code=='PLANT'){
                    return true;
                }
                return false
            },
            handlecodes(record){
                this.$refs.costDetailsModule.title = '工单执行情况'
               this.$refs.costDetailsModule.open(record);
            }
        }
    }
</script>

<style lang="stylus">
    .guarantee
        .img-wrapper
            padding-bottom 10px
            border-bottom 1px solid #626262
        .table-content
            margin-top 30px
            .search-wrapper
                overflow hidden
    .ant-popover
        min-width 200px
</style>
