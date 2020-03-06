<template>
    <div class="insurance-apply">
        <div class="content-title">
            <div class="content-desc">
                *此处汇总正在申请的保险申请，您可以选择查看并选择是否受理。
            </div>
            <a-form
                :form='form'
                @submit="_loadData" >
                <a-form-item label='*按申请类型查询'>
                    <a-radio-group 
                        name="radioGroup"
                        @change='e => this.changeRadio(e, "insuranceType")'
                        :value='insuranceType'>
                        <a-radio
                            v-for="item in typeData"
                            :key="item.value"
                            :value="item.code">
                            {{item.displayName}}
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label='*按保险状态查询'>
                    <a-radio-group
                        @change='e => this.changeRadio(e, "orderStatus")'
                        name="radioGroup"
                        :value='orderStatus'>
                        <a-radio
                            v-for="item in statusData"
                            :key="item.value"
                            :value="item.code">
                            {{item.displayName}}
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
            </a-form>
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
                <span slot="member" slot-scope="text, record">
                    <a-tag
                        v-for="item in (record.plantInfo ? record.plantInfo.financeMembers : [])"
                        :key="item.id"
                        color='#87d068'>
                        {{item.realName}}
                    </a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a @click="handleEdit(record)">查看详情</a>
                </span>
            </a-table>
        </div>
        <checkInsuranceFinish ref="checkInsuranceFinish"></checkInsuranceFinish>
    </div>
</template>

<script>
import tableMixin from '@/mixins/tableMixin'
import checkInsuranceFinish from '../modules/InsuranceModules/checkInsuranceFinish'
import {insuranceList, getInsuranceStatus} from '@/api/insuranceApi'
import {getInsuranceType} from '@/api/allApi'
export default {
    mixins: [tableMixin],
    components: {
        checkInsuranceFinish
    },
    data() {
        return {
            insuranceUnit: '',
            insuranceType: 'all',
            orderStatus: 'all',
            dataSource: [],
            typeData: [{
                value: '-1',
                code: 'all',
                displayName: '全部'
            }],
            statusData: [{
                value: '-1',
                code: 'all',
                displayName: '全部'
            }],
            columns: [
                {
                    title:() => {
                        return (
                            <span>
                                系统保险申请单号<br/>（保险相关 + 自增）
                            </span>
                        )
                    },
                    dataIndex: 'insuranceOrder',
                    align: "center"
                },
                {
                    title: '申请主体',
                    dataIndex: 'coperativeUser.cominfo.username',
                    align: "center"
                },
                {
                    title: '保险类型',
                    dataIndex: 'insuranceType.displayName',
                    align: "center"
                },
                {
                    title: '申请保险日期',
                    dataIndex: 'applyTime',
                    align: "center"
                },
                {
                    title: '申请社员/农户组成',
                    dataIndex: 'member',
                    scopedSlots: { customRender: "member" },
                    align: "center"
                },
                {
                    title: () => {
                        return '申请保险数量'
                    },
                    dataIndex: 'plantInfo.insuranceArea',
                    align: "center"
                },
                {
                    title: '申请状态',
                    dataIndex: 'orderStatus.displayName',
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
        getInsuranceType().then(res => {
            if (res.success) {
                this.typeData = this.typeData.concat(res.result)
            }
        })
        getInsuranceStatus().then(res => {
            if (res.success) {
                this.statusData = this.statusData.concat(res.result)
            }
        })
    },
    methods: {
        changeRadio(e, type) {
            this[type] = e.target.value
            this._loadData()
        },
        _loadData() {
            let params = this.form.getFieldsValue();
            params.pageNo = this.pageNo
            params.pageSize = this.pageSize
            params.insuranceType = this.insuranceType === 'all' ? undefined : this.insuranceType
            params.orderStatus = this.orderStatus === 'all' ? undefined : this.orderStatus
            this.loading = true
            insuranceList(params).then(res => {
                if (res.success) {
                    this.$set(this.pagination, 'total', res.result.total)
                    this.$set(this.pagination, 'pageSize', res.result.size)
                    this.$set(this.pagination, 'current', res.result.current)
                    this.dataSource = res.result ? res.result.records : []
                }
                this.loading = false
            })
        },
        handleEdit(record) {
            this.$refs.checkInsuranceFinish.open(record)
        }
    }
}
</script>

<style lang="stylus">
    .insurance-apply
        .ant-form-item-control-wrapper
            display: inline-block
        .content-desc
            color #838383
            letter-spacing 1px
            margin-bottom 20px
        .search-wrapper
            margin-bottom 10px
        .search-desc
            display inline-block
            margin-right: 30px
            color #000000
</style>