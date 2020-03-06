<template>
    <a-modal
            :title="title"
            v-model="visible"
            @ok="handleOk"
            style="top:10%;height: 90%;"
            :width='1040'
            okText="确定"
            :maskClosable="false"
            class="costDetails-module">
        <a-table
                style="margin-top: 10px"
                :columns="columnss"
                :dataSource="dataSources"
                :pagination="pagination"
                :loading="loadings"
                rowKey="id"
                @change="changeTable"
                bordered>
                <span slot="action" slot-scope="text, record">
                        <a @click="handleLook(record)" v-if="record.workOrder.status.displayName=='审核已通过'">查看详情</a>
                        <span v-else>/</span>
                </span>
        </a-table>
        <div slot="footer">
            <a-button type='primary' @click="handleOk">关闭查看</a-button>
        </div>
        <workorderModule ref="workorderModule"></workorderModule>
    </a-modal>
</template>

<script>
    import {queryWorker} from '@/api/allApi'
    import workorderModule from './workorderModule'
    export default {
        components:{
            workorderModule
        },
        data() {
            return {
                title:'',
                visible:false,
                record: {},
                pageNo: null,
                pageSize: null,
                pagination: {
                    pageSizeOptions: ["10", "20", "50"],
                    showTotal: (total, range) => {
                        return range[0] + "-" + range[1] + " 共" + total + "条";
                    },
                    showQuickJumper: true,
                    showSizeChanger: true,
                },
                columnss:[
                    {
                        title: '费用名称',
                        dataIndex: 'farmingItem.farmingName',
                        align: "center"
                    },
                    {
                        title: '费用类型',
                        dataIndex: 'itemType.displayName',
                        align: "center"
                    },
                    {
                        title: '名称',
                        dataIndex: 'materialName',
                        align: "center"
                    },
                    {
                        title: '数量',
                        dataIndex: 'num',
                        align: "center"
                    },
                    {
                        title: '单位',
                        dataIndex: 'company',
                        align: "center"
                    },
                    {
                        title: '费用金额(元)',
                        dataIndex: 'budgetCosts',
                        align: "center"
                    },
                    {
                        title: '开始时间',
                        dataIndex: 'startTime',
                        align: "center"
                    },
                    {
                        title: '结束时间',
                        dataIndex: 'endTime',
                        align: "center"
                    },
                    {
                        title: '状态',
                        dataIndex: 'workOrder.status.displayName',
                        align: "center"
                    },
                    {
                        title: '操作',
                        dataIndex: "action",
                        scopedSlots: { customRender: "action" },
                        align: "center",
                    }
                ],
                dataSources: [],
                loadings:false,

            }
        },
        methods:{
            changeTable(page) {
                this.pageNo = page.current
                this.pageSize = page.pageSize
            },
            open(record){
                this.record = {};
                this.record = record;
                this.visible = true;
                this.loadings = true;
                queryWorker({applyId: this.record.id}).then(res => {
                    if(res.success){
                        this.dataSources = res.result;
                    }
                    this.loadings = false;
                })
            },
            handleOk(){
                this.visible = false;
            },
            handleLook(record){
                this.$refs.workorderModule.open(record);
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .costDetails-module
        .ant-btn-primary
            background #2c909c
            border-color #2c909c
</style>
