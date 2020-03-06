<template>
    <div class="detecompleted">
        <div class="content-title">
            <div class="content-desc">
                *此处显示已完成的检测委托，您可查看详细检测结果。
            </div>
            <div class="search-wrapper">
                <a-button @click="handleEdit" type='primary' icon='plus'>新增委托检测</a-button>
            </div>
        </div>
        <div class="content">
            <a-table
                    :columns="planColumns"
                    :dataSource="testData"
                    :pagination="pagination"
                    :loading="loading"
                    rowKey="id"
                    bordered
                    @change="changeTable">
                <span slot="action" slot-scope="text, record">
                    <a @click="handleEdit(record)">查看</a>
                </span>
            </a-table>
        </div>
        <detecompletedModules ref="detecompletedModules"></detecompletedModules>
    </div>
</template>

<script>
    import tableMixin from '@/mixins/tableMixin'
    import detecompletedModules from '@/views/modules/orderentModules/detecompletedModules'
    export default {
        mixins: [tableMixin],
        components: {
            detecompletedModules
        },
        data() {
            return {
                testData: [],
                areaData: [],
                typeData: [],
                planColumns: [
                    {
                        title: '检测委托号',
                        dataIndex: 'planName',
                        key: 'planName',
                        align:'center'
                    },
                    {
                        title: '所属合作社',
                        dataIndex: 'crop.cropName',
                        key: 'crop.cropName',
                        align:'center'
                    },
                    {
                        title: '检测的基地关联社员',
                        dataIndex: 'provenance',
                        key: 'provenance',
                        align:'center'
                    },
                    {
                        title: '检测类型',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        align:'center'
                    },
                    {
                        title: '选择的检测机构',
                        dataIndex: 'createTimes',
                        key: 'createTimes',
                        align:'center'
                    },
                    {
                        title: '检测备注',
                        dataIndex: 'createTimess',
                        key: 'createTimess',
                        align:'center'
                    },
                    {
                        title: '检测委托提交日期',
                        dataIndex: 'createTimessss',
                        key: 'createTimessss',
                        align:'center'
                    },
                    {
                        title: '状态',
                        dataIndex: 'createTimesss',
                        key: 'createTimesss',
                        align:'center'
                    },
                    {
                        title: '操作',
                        dataIndex: "action",
                        key: "action",
                        scopedSlots: { customRender: "action" },
                        align: "center"
                    }
                ]
            }
        },
        created() {
            this._loadData()
        },
        methods: {
            _loadData() {
                let params = this.form.getFieldsValue();
                params.pageNo = this.pageNo
                params.pageSize = this.pageSize
            },
            handleEdit(record){
                this.$refs.detecompletedModules.title = '已完成检测'
                this.$refs.detecompletedModules.look(record)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .detecompleted
        .content-title
            margin-bottom 30px
        .content-desc
            width: 575px
            color #838383
            display inline-block
            letter-spacing 1px
        .search-wrapper
            float right
            line-height 40px
            div
                display inline-block
</style>
