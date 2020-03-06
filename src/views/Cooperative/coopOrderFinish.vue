<template>
    <div class="coop-order-all">
        <div class="table-content">
            <div class="order-desc" style="color:#838383">
                *您可在此查看已完成的检测委托。
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
                <span slot="action" slot-scope="text, record">
                    <a @click="handleLook(record)">查看详情</a>
                </span>
            </a-table>
        </div>
        <checkCoopOrder ref="checkCoopOrder"></checkCoopOrder>
    </div>
</template>

<script>
    import tableMixin from '@/mixins/tableMixin'
    import checkCoopOrder from '../modules/CooperativeModules/checkCoopOrder'
    import {getCheckOrder} from '@/api/allApi'
    export default {
        name: 'orderApply',
        mixins: [tableMixin],
        components: {
            checkCoopOrder
        },
        data() {
            return {
                columns: [
                    {
                        title:'检测单号',
                        dataIndex: 'orderCode',
                        align: "center"
                    },
                    {
                        title: '委托企业',
                        dataIndex: 'orderUser.cominfo.username',
                        align: "center"
                    },
                    {
                        title: '检测项目类型',
                        dataIndex: 'insuranceType.displayName',
                        align: "center"
                    },
                    {
                        title: '检测委托时间',
                        dataIndex: 'createTime',
                        align: "center"
                    },
                    {
                        title: '检测机构',
                        dataIndex: 'detectUser.cominfo.username',
                        align: "center"
                    },
                    {
                        title: '检测结果',
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
                dataSource: []
            }
        },
        created() {
            this._loadData()
        },
        methods: {
            _loadData(e, type) {
                let params = this.form.getFieldsValue();
                params.pageNo = this.pageNo
                params.pageSize = this.pageSize
                params.statusEnums = 'FINISH'
                this.loading = true
                getCheckOrder(params).then(res => {
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
            handleLook(record) {
                this.$refs.checkCoopOrder.open(record)
            }
        }
    }
</script>

<style lang="stylus">
    .coop-order-all
        .ant-form-item-control-wrapper
            display: inline-block
        .ant-form-item-label
            vertical-align top
</style>