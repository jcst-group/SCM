<template>
    <div class="insurance">
        <div class="table-content">
            <div class="search-wrapper">
                <a-radio-group @change="changeGroup" name="radioGroup" defaultValue="all">
                    <a-radio 
                        v-for="item in statusData"
                        :key="item.value"
                        :value='item.code'>
                        {{item.displayName}}
                    </a-radio>
                </a-radio-group>
                <a-button @click="openModule('addInsurance')" icon='plus' type='primary' style="float: right;margin-right: 20px">
                    <span>新增保险申请</span>
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
                @change="changeTable">
                <span slot="member" slot-scope="text, record">
                    <div v-if="record.plantInfo">
                        <a-tag
                            style="margin-bottom:3px"
                            v-for="item in record.plantInfo.financeMembers"
                            :key="item.id"
                            color='#87d068'>
                            {{item.realName}}
                        </a-tag>
                    </div>
                </span>
                <span slot="expries" slot-scope="text, record">
                    {{record.startTime}}至{{record.endTime}}
                </span>
                <span slot="action" slot-scope="text, record">
                    <a @click="handleLook(record)">查看详情</a>
                    <a-divider type="vertical"/>
                    <a-dropdown>
                        <a class="ant-dropdown-link">
                            更多 <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item v-if="getStatus(record)" >
                                <a @click="openModule('addInsurance', record)">修改</a>
                            </a-menu-item>
                            <!-- <a-menu-item v-if="record.messages.length">
                                <a @click="openListModule(record.messages)">状态展示</a>
                            </a-menu-item> -->
                            <a-menu-item>
                                <a-popconfirm title="确定删除吗?" @confirm="handleDelete(record.id)">
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
        <addInsurance ref="addInsurance"></addInsurance>
        <listModule ref="listModule"></listModule>
    </div>
</template>

<script>
    import tableMixin from '@/mixins/tableMixin'
    import addInsurance from '../modules/CooperativeModules/addInsurance'
    import listModule from '../modules/CooperativeModules/listModule'
    import {getCoopList, getInsuranceStatus, deleteInsurance,applyInsurance, cancelInsurance} from '@/api/allApi'
    export default {
        name: 'insurance',
        mixins: [tableMixin],
        components: {
            addInsurance,
            listModule
        },
        data() {
            return {
                columns: [
                    {
                        title:() => {
                            return (
                                <span>
                                    系统保险单号<br/>（保险相关+自增）
                                </span>
                            )
                        },
                        dataIndex: 'insuranceOrder',
                        align: "center"
                    },
                    {
                        title: '拟申请保险/保险确认期间',
                        dataIndex: 'expries',
                        scopedSlots: { customRender: "expries" },
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
                        title: '保险类型',
                        dataIndex: 'insuranceType.displayName',
                        align: "center"
                    },
                    {
                        title: '保单状态',
                        dataIndex: 'orderStatus.displayName',
                        align: "center"
                    },
                    {
                        title: '保险公司',
                        dataIndex: 'insuranceUser.cominfo.username',
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
                    code: 'all',
                    displayName: '全部',
                    value: -1
                }],
                statusCode: 'all'
            }
        },
        created() {
            this._loadData()
            getInsuranceStatus().then(res => {
                if (res.success) {
                    this.statusData = this.statusData.concat(res.result)
                }
            })
        },
        methods:{
            _loadData() {
                let params = {}
                if (this.statusCode !== 'all') {
                    params.orderStatus = this.statusCode
                }
                params.pageNo = this.pageNo
                params.pageSize = this.pageSize
                this.loading = true
                getCoopList(params).then(res => {
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
            getStatus(record) {
                switch(record.orderStatus.value) {
                    case 1:
                        return true
                    case 5:
                        return true
                    case 6:
                        return true
                    default:
                        return false
                }
            },
            changeGroup(e) {
                this.statusCode = e.target.value
                this._loadData()
            },
            openListModule(message) {
                this.$refs.listModule.open(message)
            },
            handleLook(record) {
                this.$refs.addInsurance.open(record, true)
            },
            handleCancel(record) {
                cancelInsurance({
                    id: record.id
                }).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this._loadData()
                    }
                })
            },
            handleApply(record) {
                applyInsurance({
                    id: record.id
                }).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this._loadData()
                    }
                })
            },
            handleDelete(id) {
                deleteInsurance({
                    id,
                }).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this._loadData()
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .insurance
        .table-content
            margin-top 30px
            .search-wrapper
                overflow hidden
</style>