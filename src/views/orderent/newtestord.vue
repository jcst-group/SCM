<template>
    <div class="newtestord">
        <div class="content-title">
            <div class="content-desc">
                *您可在此添加新的检测委托。<br>检测状态为：新增委托—委托中(检测机构确认、合作社确认)—检测中—检测完成
            </div>
            <div class="search-wrapper">
                <a-button @click="handleReset" type='primary' icon='plus'>新增委托检测</a-button>
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
                    <a-divider type="vertical"/>
                    <a-popconfirm title="确定取消委托吗?" @confirm="handleDelete(record.id)">
                        <a>取消委托</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </div>
        <newtestordModules ref="newtestordModules"></newtestordModules>
    </div>
</template>

<script>
    import tableMixin from '@/mixins/tableMixin'
    import newtestordModules from '@/views/modules/orderentModules/newtestordModules'
    export default {
        mixins: [tableMixin],
        components: {
            newtestordModules
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
            handleReset(){
                this.$refs.newtestordModules.title = '新增检测委托'
                this.$refs.newtestordModules.open()
            },
            handleEdit(record){
                this.$refs.newtestordModules.title = '查看检测委托'
                this.$refs.newtestordModules.look(record)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .newtestord
        .content-title
            margin-bottom 10px
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
