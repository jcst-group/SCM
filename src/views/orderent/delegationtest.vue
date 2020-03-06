<template>
    <div class="delegationtest">
        <div class="content-title">
            <div class="content-desc">
                *此处显示已由检测机构和合作社确认后的检测委托，检测机构正在检测相关内容。
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
        <delegationtestModules ref="delegationtestModules"></delegationtestModules>
    </div>
</template>

<script>
    import tableMixin from '@/mixins/tableMixin'
    import delegationtestModules from '@/views/modules/orderentModules/delegationtestModules'
    export default {
        mixins: [tableMixin],
        components: {
            delegationtestModules
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
                this.$refs.delegationtestModules.title = '检测中的委托'
                this.$refs.delegationtestModules.look(record)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .delegationtest
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
