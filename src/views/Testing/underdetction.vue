<template>
    <div class="handle-order">
        <div class="content-title">
            <div class="content-desc">
                *此处汇总了各大合作社的检测中的需求.
            </div>
            <a-form
                :form="form"
                style="position: relative"
                @submit="handleSearch">
                <div style="margin-right: 20px;color:#000">
                    <span style="line-height:40px;margin-right:5px">* 按检测类型查询:</span>
                    <a-form-item style="display:inline-block">
                        <a-radio-group @change='e => this.changeRadio(e, "insuranceType")' name="radioGroup" defaultValue="all">
                            <a-radio 
                                v-for="item in typeData"
                                :key="item.value"
                                :value='item.code'>
                                {{item.displayName}}
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>
                </div>
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
                <a-popover slot="member" slot-scope="address">
                    <template slot="content">
                        <div>{{address}}</div>
                    </template>
                    <div  style="width:200px;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;margin: 0 auto;">
                        {{address}}
                    </div>
                </a-popover>
                <span slot="action" slot-scope="text, record">
                    <a @click="handleEdit(record)">操作</a>
                </span>
            </a-table>
        </div>
        <completetestModule ref="completetestModule"></completetestModule>
    </div>
</template>

<script>
import tableMixin from '@/mixins/tableMixin'
import {getCheckList} from '@/api/checkApi'
import {getCheckType} from '@/api/orderApi'
import completetestModule from '../modules/TestingModules/completetestModule'
export default {
    mixins: [tableMixin],
    components: {
        completetestModule
    },
    data() {
        return {
            insuranceType: 'all',
            dataSource: [],
            areaData: [],
            typeData: [{
                value: '-1',
                code: 'all',
                displayName: '全部'
            }],
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
                    title: '合作社所在地',
                    dataIndex: 'member',
                    align: "center",
                    width: '15%',
                    scopedSlots: { customRender: "member" },
                },
                {
                    title: '合作社名称',
                    dataIndex: 'financeUser.cominfo.username',
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
                    title: '备注',
                    dataIndex: 'charOne',
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
        getCheckType().then(res => {
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
            params.statusEnums = 'DETECT_DEALING'
            params.insuranceType = this.insuranceType === 'all' ? undefined : this.insuranceType
            this.loading = true
            getCheckList(params).then(res => {
                if (res.success) {
                    if (res.result && res.result.records) {
                        this.$set(this.pagination, 'total', res.result.total)
                        this.$set(this.pagination, 'pageSize', res.result.size)
                        this.$set(this.pagination, 'current', res.result.current)
                        this.dataSource = res.result.records.map(item => {
                            let address = item.financeUser.cominfo.address
                            item.member = address.province + address.city + address.area + address.street
                            return item
                        })
                    }
                }
                this.loading = false
            })
        },
        handleEdit(record) {
            this.$refs.completetestModule.open(record)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .handle-order
        .content-desc
            width: 450px
            color #838383
            display inline-block
            letter-spacing 1px
        .search-wrapper
            float right
            div
                display inline-block
</style>