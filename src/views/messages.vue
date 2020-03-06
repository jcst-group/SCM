<template>
    <div class="messages">
        <div class="content-title">
            <a-button @click="updatames()" type='primary'>
                <span>全部已读</span>
            </a-button>
        </div>
        <a-table
                :columns="planColumns"
                :dataSource="testData"
                :pagination="pagination"
                :loading="loading"
                rowKey="id"
                bordered
                @change="changeTable">
            <span slot="action" slot-scope="text, record">
               <a @click="handleEdit(record)">已读</a>
            </span>
            <span slot="count" slot-scope="text, record">
              <span>{{record.messageType.displayName}}-{{record.titile}}</span>
            </span>
        </a-table>
    </div>
</template>

<script>
    import {notifylist,readOne,allRead} from '@/api/allApi'
    import tableMixin from '@/mixins/tableMixin'
    export default {
        mixins:[tableMixin],
        data(){
          return{
              planColumns:[
                  {
                      title: '名称',
                      dataIndex: 'count',
                      scopedSlots: { customRender: "count" },
                      align:'center'
                  },
                  {
                      title: '接受时间',
                      dataIndex: 'createTime',
                      align:'center'
                  },
                  {
                      title: '贷款类型',
                      dataIndex: 'messageType.displayName',
                      align:'center'
                  },
                  {
                      title: '是否已读',
                      dataIndex: 'ifRead.displayName',
                      align:'center'
                  },
                  {
                      title: '操作',
                      dataIndex: "action",
                      key: "action",
                      scopedSlots: { customRender: "action" },
                      align: "center"
                  }
              ],
              loading:false,
              testData:[],
          }
        },
        created() {
            this._loadData()
        },
        methods:{
            _loadData(){
                this.loading = true
                let params = this.form.getFieldsValue();
                params.pageNo = this.pageNo
                params.pageSize = this.pageSize
                notifylist(params).then(res => {
                    if(res.success){
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
            handleEdit(record){
                readOne({id:record.id}).then(res => {
                    if(res.success){
                        this.$message.info(res.result)
                        this.$store.dispatch("user/getapplynum")
                        this._loadData();
                    }
                })
            },
            updatames(){
                allRead().then(res => {
                    if(res.success){
                        this.$message.info(res.result)
                        this.$store.dispatch("user/getapplynum")
                        this._loadData();
                    }
                })
            }
        }
    }
</script>

<style lang="stylus">
    .messages
        .content-title
            text-align right
            width 100%
            margin 10px 0px 15px 0px
            line-height 37px
            color #000000
</style>
