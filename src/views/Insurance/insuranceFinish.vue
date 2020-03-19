<template>
    <div class="insurance-apply">
        <div class="content-title">
            <div class="content-desc">
                *此处汇总完成的保险申请，您可以选择查看。
            </div>
            <div class="search-wrapper">
                <div class="search-desc">
                   *按申请类型查询
                </div>
                <a-radio-group @change="e => this.changeRadio(e, 'insuranceType')" name="radioGroup" defaultValue="all">
                    <a-radio
                        v-for="item in typeData"
                        :key="item.value"
                        :value="item.code">
                        {{item.displayName}}
                    </a-radio>
                </a-radio-group>
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
                <span slot="member" slot-scope="text, record">
                    <a-tag
                        v-for="item in record.plantInfo.financeMembers"
                        :key="item.id"
                        color='#87d068'>
                        {{item.realName}}
                    </a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a @click="handleEdit(record)">查看</a>
                </span>
            </a-table>
        </div>
        <checkInsuranceFinish ref="checkInsuranceFinish"></checkInsuranceFinish>
    </div>
</template>

<script>
import tableMixin from '@/mixins/tableMixin'
import checkInsuranceFinish from '../modules/InsuranceModules/checkInsuranceFinish'
import {insuranceList} from '@/api/insuranceApi'
import {getInsuranceType} from '@/api/allApi'
export default {
    mixins: [tableMixin],
    components: {
        checkInsuranceFinish
    },
    data() {
        return {
            insuranceUnit: '',
            dataSource: [],
            typeData: [{
                value: '-1',
                code: 'all',
                displayName: '全部'
            }],
            insuranceType: 'all',
            columns: [
                {
                    title:() => {
                        return (
                            '<span>系统保险申请单号<br/>（保险相关 + 自增）</span>'
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
            params.orderStatus = "FINISH"
            params.insuranceType = this.insuranceType === 'all' ? undefined : this.insuranceType
            this.loading = true
            insuranceList(params).then(res => {
                if (res.success) {
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

<style lang="stylus" scoped>
    .insurance-apply
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