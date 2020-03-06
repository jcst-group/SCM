<template>
    <div class="useraccount">
        <div class="content-title">
            <a-button @click="adduser()" icon='plus' type='primary'>
                <span>添加账户</span>
            </a-button>
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
                <span slot="userType" slot-scope="userType">
                  <a-tag color='blue' v-if="userType">
                      {{userType.displayName}}
                  </a-tag>
                </span>
                <span slot="financeRoles" slot-scope="financeRoles">
                  <a-popover>
                    <template slot='content'>
                        <div style="width:200px">
                          <div v-for="item in financeRoles" :key="item.id" style="display: inline-block;width: 48%;text-align: center;margin-bottom: 10px">
                            {{item.name}}
                          </div>
                        </div>
                    </template>
                    <a-tag v-for="(item,index) in financeRoles" v-show="index < 2" :key="item.id" color='blue'>
                      {{item.name}}
                    </a-tag>
                    <span v-if="financeRoles.length > 2">……</span>
                  </a-popover>
                </span>
                <span slot="userbase" slot-scope="text, record">
                  <a-popover>
                    <template slot='content'>
                        <div style="width:300px">
                          <div v-for="item in record.bases" :key="item.id" style="display: inline-block;width: 33%;text-align: center;margin-bottom: 10px">
                            {{item.baseName}}
                          </div>
                        </div>
                    </template>
                    <a-tag v-for="(item,index) in record.bases" v-show="index < 3" :key="item.id" color='blue'>
                      {{item.baseName}}
                    </a-tag>
                    <span v-if="record.bases.length > 3">……</span>
                  </a-popover>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a @click="handleEdit(record)">修改</a>
                    <a-divider type="vertical"/>
                    <a-dropdown>
                        <a class="ant-dropdown-link">
                            更多 <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item >
                                <a @click="updatapass(record)">修改密码</a>
                            </a-menu-item>
                            <a-menu-item >
                                <a @click="userrole(record)">分配角色</a>
                            </a-menu-item>
                            <a-menu-item  v-if="record.userType ? record.userType.displayName=='合作社' : ''">
                                <a @click="openbase(record)">关联基地</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a-popconfirm title="确定删除吗?" @confirm="handleDelete(record.id)">
                                    <a>删除</a>
                                </a-popconfirm>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </span>
            </a-table>
        </div>
        <assocbase ref="assocbase"></assocbase>
        <userModule ref="userModule"></userModule>
        <userrole ref="userrole"></userrole>
    </div>
</template>

<script>
    import tableMixin from '@/mixins/tableMixin'
    import assocbase from '@/views/modules/TestingModules/assocbase'
    import userModule from '@/views/modules/TestingModules/userModule'
    import userrole from '@/views/modules/TestingModules/userroleModule'
    import {financeUserList,deleteUser} from '@/api/allApi'
    export default {
        mixins: [tableMixin],
        components: {
            assocbase,
            userModule,
            userrole
        },
        data() {
            return {
                loading: false,
                testData: [],
                areaData: [],
                typeData: [],
                planColumns: [
                    {
                        title: '账号',
                        dataIndex: 'username',
                        key: 'username',
                        align:'center'
                    },
                    {
                        title: '用户类型',
                        dataIndex: 'userType',
                        key: 'userType',
                        scopedSlots: { customRender: "userType" },
                        align:'center'
                    },
                    {
                        title: '角色类型',
                        dataIndex: 'financeRoles',
                        key: 'financeRoles',
                        scopedSlots: { customRender: "financeRoles" },
                        align:'center'
                    },
                    {
                        title: '关联基地',
                        dataIndex: 'userbase',
                        key: 'userbase',
                        scopedSlots: { customRender: "userbase" },
                        align:'center'
                    },
                    {
                        title: '手机号码',
                        dataIndex: 'phone',
                        key: 'phone',
                        align:'center'
                    },
                    {
                        title: '注册时间',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        align:'center',
                        customRender:function (text) {
                            if(text){
                                return text.split(' ')[0]
                            }
                            return text
                        },
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
                this.loading = true
                let params = this.form.getFieldsValue();
                params.pageNo = this.pageNo
                params.pageSize = this.pageSize
                financeUserList(params).then(res => {
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
            add(){

            },
            handleEdit(record){
                this.$refs.userModule.title = '修改账户'
                this.$refs.userModule.open(record);
            },
            handleDelete(id){
                deleteUser({userId:id}).then(res => {
                    this.$message.info(res.result)
                    if (res.success) {
                        this._loadData()
                    }
                })
            },
            openbase(record){
                this.$refs.assocbase.add(record);
            },
            adduser(){
                this.$refs.userModule.title = '新增账户'
                this.$refs.userModule.add();
            },
            updatapass(record){
                this.$refs.userModule.title = '修改密码'
                this.$refs.userModule.updatapass(record);
            },
            userrole(record){
                this.$refs.userrole.add(record);
            }
        }
    }
</script>

<style lang="stylus">
    .useraccount
        .content-title
            text-align right
            width 100%
            margin 10px 0px 15px 0px
            line-height 37px
            color #000000
</style>
