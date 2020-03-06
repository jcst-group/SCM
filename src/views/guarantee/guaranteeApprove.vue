<template>
    <div class="guarantee-approve">
        <div class="content-title">
            <div class="content-desc">
                *此处汇总申请中的合作社贷款担保申请，<br/>您可以查看并选择是否予以受理。
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
                    @change="changeTable">
                <span slot="expries" slot-scope="text, record">
                    {{record.startTime}}至{{record.endTime}}
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
                    <a @click="handleEdit(record)">查看并操作</a>
                </span>
            </a-table>
        </div>
        <guaranteeApplyModule ref="guaranteeApplyModule"></guaranteeApplyModule>
    </div>
</template>

<script>
    import tableMixin from '@/mixins/tableMixin'
    import {listToGuarantee} from '@/api/allApi'
    import guaranteeApplyModule from '../modules/GuaranteeModules/guaranteeApplyModule'
    export default {
        mixins: [tableMixin],
        components: {
            guaranteeApplyModule
        },
        data() {
            return {
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
                        title: '申请贷款银行',
                        dataIndex: 'bankUser.cominfo.username',
                        align: "center"
                    },
                    {
                        title: '操作',
                        dataIndex: "action",
                        scopedSlots: { customRender: "action" },
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
                params.status = 'WARRANT_APPROVE'
                listToGuarantee(params).then(res => {
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
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .guarantee-approve
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
