<template>
    <div class="commune">
        <div class="content-title">
            <span>农户社员信息</span>
            <a-button @click="add" style="margin-right: 10px;float: right" type='primary' icon='plus'>新增社员农户</a-button>
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
                <div slot="headPictureInfos" slot-scope="headPictureInfos">
                   <img :src="getpicurl(headPictureInfos)" width="50px" height="50px">
                </div>
                <a-popover slot="blockInfo" slot-scope="text">
                    <template slot="content">
                        <div>{{text}}</div>
                    </template>
                    <div  style="width:200px;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;margin: 0 auto;">{{text}}</div>
                </a-popover>
                <a-popover slot="address" slot-scope="address">
                    <template slot="content">
                        <div>{{address.province}}{{address.city}}{{address.area}}{{address.street}}</div>
                    </template>
                    <div  style="width:200px;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;margin: 0 auto;">{{address.province}}{{address.city}}{{address.area}}{{address.street}}</div>
                </a-popover>
                <span slot="action" slot-scope="text, record">
                    <a @click="handleEdit(record)">修改</a>
                    <a-divider type="vertical"/>
                    <a-popconfirm title="确定删除吗?" @confirm="handleDelete(record.id)">
                        <a>删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </div>
        <communeModule ref="communeModule"></communeModule>
    </div>
</template>

<script>
    import tableMixin from '@/mixins/tableMixin'
    import communeModule from '@/views/modules/CooperativeModules/communeModule'
    import {memberlist,deletemember} from '@/api/allApi'
    export default {
        mixins: [tableMixin],
        components: {
            communeModule
        },
        data() {
            return {
                loading: false,
                testData: [],
                areaData: [],
                typeData: [],
                planColumns: [
                    {
                        title: '头像图片',
                        dataIndex: 'headPictureInfos',
                        key: 'headPictureInfos',
                        scopedSlots: { customRender: "headPictureInfos" },
                        align:'center'
                    },
                    {
                        title: '农民编码',
                        dataIndex: 'memberCode',
                        key: 'memberCode',
                        align:'center'
                    },
                    {
                        title: '农民姓名',
                        dataIndex: 'realName',
                        key: 'realName',
                        align:'center'
                    },
                    {
                        title: '地址',
                        dataIndex: 'address',
                        key: 'address',
                        scopedSlots: { customRender: "address" },
                        align:'center'
                    },
                    {
                        title: '身份证号',
                        dataIndex: 'identifyCode',
                        key: 'identifyCode',
                        align:'center'
                    },
                    {
                        title: '联系电话',
                        dataIndex: 'phone',
                        key: 'phone',
                        align:'center'
                    },
                    {
                        title: '地块面积(亩)',
                        dataIndex: 'blockArea',
                        key: 'blockArea',
                        align:'center'
                    },
                    {
                        title: '地块位置',
                        dataIndex: 'blockInfo',
                        key: 'blockInfo',
                        scopedSlots: { customRender: "blockInfo" },
                        align:'center'
                    },
                    {
                        title: '操作',
                        dataIndex: "action",
                        key: "action",
                        width:'8%',
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
                this.loading = true
                let params = this.form.getFieldsValue();
                params.pageNo = this.pageNo
                params.pageSize = this.pageSize
                memberlist(params).then(res => {
                    if(res.success){
                        console.log(res.result.records)
                        if (res.result && res.result.records) {
                            this.$set(this.pagination, 'total', res.result.total)
                            this.$set(this.pagination, 'pageSize', res.result.size)
                            this.$set(this.pagination, 'current', res.result.current)
                            this.testData = res.result.records
                        }
                    }
                    this.loading = false
                })
            },
            add(){
                this.$refs.communeModule.title = '+新增社员农户信息'
                this.$refs.communeModule.open()
            },
            handleEdit(record){
                this.$refs.communeModule.title = '查看或修改社员农户信息'
                this.$refs.communeModule.look(record)
            },
            getpicurl(picurl){
                return "/api/pictureInfo/show/"+picurl[0].pictureUrl
            },
            handleDelete(id){
                deletemember({id:id}).then(res => {
                    this.$message.info(res.message)
                    if (res.success) {
                        this._loadData()
                    }
                })
            }
        }
    }
</script>

<style lang="stylus">
    .commune
        .content-title
            text-align center
            width 100%
            margin-bottom 10px
            line-height 37px
            color #000000
        .search-wrapper
            float right
            div
                display inline-block
        .ant-table-tbody > tr > td
            padding 10px !important
</style>
