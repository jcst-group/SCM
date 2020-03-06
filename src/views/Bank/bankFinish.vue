<template>
    <div class="bank-finish">
        <div class="content-title">
            <div class="content-desc">
                *此处汇总已审批发放的贷款，<br/>您可以查看贷款使用、发放情况。
            </div>
        </div>
        <div class="content">
            <a-table
                    :columns="columns"
                    :dataSource="dataSource"
                    :pagination="pagination"
                    :loading="loading"
                    rowKey="id"
                    bordered
                    :scroll="{ x: 1330}"
                    @change="changeTable">
                <span slot="expries" slot-scope="text, record">
                    {{record.startTime}}至{{record.endTime}}
                </span>
                <span slot="guaranteeUser" slot-scope="guaranteeUser">
                    {{getguaranteeUser(guaranteeUser)}}
                </span>
                <span slot="guaranteeUsers" slot-scope="guaranteeUser">
                    {{getguaranteeUsers(guaranteeUser)}}
                </span>
                <span slot="code" slot-scope="text, record">
                    <a @click="handlecodes(record)" v-if="getcodes(record)">查看情况</a>
                    <span  v-else>/</span>
                </span>
                <span slot="member" slot-scope="text, record">
                    <div v-if="record.loanBatchInfo">
                        <a-popover>
                            <template slot='content'>
                              <div style="width: 200px">
                                  <div v-for="item in record.loanBatchInfo.financeMembers" :key="item.id" style="display: inline-block;width: 47%;text-align: center;margin-bottom: 10px">
                                    {{item.realName}}
                                  </div>
                              </div>
                            </template>
                            <a-tag v-for="(item,index) in record.loanBatchInfo.financeMembers" v-show="index < 2" :key="item.id" color='#87d068'>
                              {{item.realName}}
                            </a-tag>
                            <span v-if="record.loanBatchInfo.financeMembers.length > 2">……</span>
                        </a-popover>
                    </div>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a @click="handleEdit(record)">查看详情</a>
                </span>
            </a-table>
        </div>
        <guaranteeApplyModule ref="guaranteeApplyModule"></guaranteeApplyModule>
        <costDetailsModule ref="costDetailsModule"></costDetailsModule>
    </div>
</template>

<script>
    import tableMixin from '@/mixins/tableMixin'
    import {listToBank} from '@/api/allApi'
    import costDetailsModule from '../modules/CooperativeModules/costDetailsModule'
    import guaranteeApplyModule from '../modules/GuaranteeModules/guaranteeApplyModule'
    export default {
        mixins: [tableMixin],
        components: {
            guaranteeApplyModule,
            costDetailsModule
        },
        data() {
            return {
                typeData:[],
                loading:false,
                dataSource: [],
                columns: [
                    {
                        title: '系统贷款申请单号',
                        dataIndex: 'loanOrderCode',
                        align: "center"
                    },
                    {
                        title: '申请主体',
                        dataIndex: 'coperativeUser.cominfo.username',
                        align: "center"
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
                        title: '担保申请',
                        dataIndex: 'guaranteeUser',
                        scopedSlots: { customRender: "guaranteeUser" },
                        align: "center"
                    },
                    {
                        title: '担保公司',
                        dataIndex: 'guaranteeUser.cominfo.username',
                        customRender:function (text) {
                            if(text){
                                return text
                            }
                            return '/'
                        },
                        align: "center"
                    },
                    {
                        title: '工单执行情况',
                        dataIndex: 'status.code',
                        scopedSlots: { customRender: "code" },
                        fixed: 'right',
                        align: "center"
                    },
                    {
                        title: '操作',
                        dataIndex: "action",
                        scopedSlots: { customRender: "action" },
                        fixed: 'right',
                        align: "center"
                    }
                ],
            }
        },
        created() {
            this._loadData()
        },
        methods: {
            _loadData() {
                this.loading = true
                let params = this.form.getFieldsValue();
                params.pageNo = this.pageNo
                params.pageSize = this.pageSize
                params.status = 'FINISH'
                listToBank(params).then(res => {
                    if(res.success){
                        if (res.result && res.result.records) {
                            this.$set(this.pagination, 'total', res.result.total)
                            this.$set(this.pagination, 'pageSize', res.result.size)
                            this.$set(this.pagination, 'current', res.result.current)
                            this.dataSource = res.result.records
                        }
                    }
                    this.loading = false
                })
            },
            changeGroup(e) {
            },
            handleEdit(record) {
                this.$refs.guaranteeApplyModule.look(record)
            },
            getguaranteeUser(data){
                if(data){
                    return '有'
                }
                return '无'
            },
            getguaranteeUsers(data){
                if(data){
                    return data.cominfo.username
                }
                return '/';
            },
            handlecodes(record){
                this.$refs.costDetailsModule.title = '工单执行情况'
                this.$refs.costDetailsModule.open(record);
            },
            getcodes(record){
                if(record.status.code=='FINISH'&&record.loadType.code=='PLANT'){
                    return true;
                }
                return false
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .bank-finish
        .content-desc
            width: 450px
            color #838383
            display inline-block
            letter-spacing 1px
            margin-bottom 20px
        .search-wrapper
            margin-bottom 10px
        .search-desc
            display inline-block
            margin-right: 30px
            color #000000
</style>
