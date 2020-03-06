<template>
    <div class="order-check">
        <div class="table-content">
            <div class="order-desc" style="color:#838383">
                *您可在此查看检测中的委托。
            </div>
            <div class="search-wrapper">
                <span style="line-height:40px;margin-right:5px;color:#000">*按检测状态查询:</span>
                <a-radio-group @change="e => this._loadData(e, 'statusEnums')" name="radioGroup" defaultValue="all">
                    <a-radio 
                        v-for="item in statusData"
                        :key="item.value"
                        :value='item.code'>
                        {{item.displayName}}
                    </a-radio>
                </a-radio-group>
            </div>
            <a-table
                style="margin-top: 10px"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="pagination"
                :loading="loading"
                rowKey="id"
                bordered
                @change="changeTable">
                <span slot="member" slot-scope="text, record">
                    <div v-if="record.financeMember">
                        <!-- <a-tag
                            v-for="item in record.plantInfo.financeMembers"
                            :key="item.id"
                            color='#87d068'>
                            {{item.realName}}
                        </a-tag> -->
                        <a-tag color='#87d068'>
                            {{record.financeMember.realName}}
                        </a-tag>
                    </div>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a @click="handleLook(record)">查看详情</a>
                    <a-divider type="vertical" v-if="record.detectStatus.displayName === '检测机构确认中'"/>
                    <a-popconfirm title="确定取消委托吗?" v-if="record.detectStatus.displayName === '检测机构确认中'" @confirm="cancelCurOrder(record)">
                        <a>取消委托</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </div>
        <lookOrderApply ref="lookOrderApply"></lookOrderApply>
    </div>
</template>

<script>
    import tableMixin from '@/mixins/tableMixin'
    import lookOrderApply from '../modules/OrderModules/lookOrderApply'
    import {orderList, cancelOrder, getCheckStatus} from '@/api/orderApi'
    export default {
        name: 'orderApply',
        mixins: [tableMixin],
        components: {
            lookOrderApply
        },
        data() {
            return {
                columns: [
                    {
                        title:'检测委托号',
                        dataIndex: 'orderCode',
                        align: "center"
                    },
                    {
                        title: '所属合作社',
                        dataIndex: 'financeUser.cominfo.username',
                        align: "center"
                    },
                    {
                        title: '对应社员/农户',
                        dataIndex: 'member',
                        align: "center",
                        width: '15%',
                        scopedSlots: { customRender: "member" },
                    },
                    {
                        title: '检测类型',
                        dataIndex: 'insuranceType.displayName',
                        align: "center"
                    },
                    {
                        title: '选择的检测机构',
                        dataIndex: 'detectUser.cominfo.username',
                        align: "center"
                    },
                    {
                        title: '检测备注',
                        dataIndex: 'charOne',
                        align: "center"
                    },
                    {
                        title: '状态',
                        dataIndex: 'detectStatus.displayName',
                        align: "center"
                    },
                    {
                        title: '操作',
                        dataIndex: "action",
                        scopedSlots: { customRender: "action" },
                        align: "center"
                    }
                ],
                dataSource: [],
                statusData: [{
                    value: '-1',
                    code: 'all',
                    displayName: '全部'
                }]
            }
        },
        created() {
            this._loadData()
            getCheckStatus({
                userType: 4
            }).then(res => {
                if (res.success) {
                    this.statusData = this.statusData.concat(res.result)
                }
            })
        },
        methods: {
            _loadData(e, type) {
                let params = {}
                params.pageNo = this.pageNo
                params.pageSize = this.pageSize
                params.statusEnums = 'DETECT_DEALING,COOP_CONFIRM,DETECT_CONFIRM'
                if (e && type && e.target.value !== 'all') {
                    params[type] = e.target.value
                }
                this.loading = true
                orderList(params).then(res => {
                    if (res.success) {
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
            cancelCurOrder(record) {
                cancelOrder({
                    id: record.id
                }).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this._loadData()
                    }
                })
            },
            handleLook(record) {
                this.$refs.lookOrderApply.open(record, true)
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .order-check
        .table-content
            .search-wrapper
                overflow hidden
</style>