<template>
    <div class="info-content">
        <div class="flex-wrapper">
            <div>
                <span class="label">投保人：</span>
                <span class="desc">{{record.coperativeUser.cominfo.username}}</span>
            </div>
            <div>
                <span class="label">申请保险类型：</span>
                <span class="desc">{{record.insuranceType.displayName}}</span>
            </div>
            <div>
                <span class="label">联系电话：</span>
                <span class="desc">{{record.contractNum}}</span>
            </div>
        </div>
        <div class="time-wrapper">
            <span class="label">计划投保期：</span>
            <span class="desc">{{record.startTime}}</span>
            至
            <span class="desc">{{record.endTime}}</span>
        </div>
        <div class="textarea-wrapper">
            <span style="vertical-align: top;display:inline-block; width: 120px;text-align:right">备注信息：</span>
            <span class="desc">{{record.commont ? record.commont : '无'}}</span>
        </div>
        <div class="table-wrappe" v-if="record.plantInfo && record.plantInfo.financeMembers.length">
            <div>投保农户/社员：</div>
            <a-table
                style="margin-top: 10px"
                :columns="columns"
                :dataSource="record.plantInfo.financeMembers"
                :pagination="false"
                rowKey="id"
                bordered>
                <span slot="memberAddress" slot-scope="text">
                    <a-tooltip style="text-align:center" :title="text" v-text='changeString(text)'>
                    </a-tooltip>
                </span>
                <span slot="blockInfo" slot-scope="text">
                    <a-tooltip :title="text" v-text='changeString(text)'>
                    </a-tooltip>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a @click="handleLook(record)">查看详情</a>
                </span>
            </a-table>
        </div>
        <lookMember ref="lookMember"></lookMember>
    </div>
</template>

<script>
    import lookMember from '../views/modules/CooperativeModules/lookMember'
    export default {
        components: {
            lookMember
        },
        props: {
            record: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                columns: [
                    {
                        title: '农民编码',
                        dataIndex: 'memberCode',
                        align: "center"
                    },
                    {
                        title: '农民姓名',
                        dataIndex: 'realName',
                        align: "center"
                    },
                    {
                        title: '地址',
                        dataIndex: 'memberAddress',
                        scopedSlots: { customRender: "memberAddress" },
                        align: "center"
                    },
                    {
                        title: '详细地址',
                        dataIndex: 'address.street',
                        align: "center"
                    },
                    {
                        title: '身份证号',
                        dataIndex: 'identifyCode',
                        align: "center"
                    },
                    {
                        title: () => {
                            if (this.record.plantInfo && this.record.plantInfo.insuranceUnit) {
                                return `地块面积(${this.record.plantInfo.insuranceUnit})`
                            }
                            return '地块面积'
                        },
                        dataIndex: 'blockArea',
                        align: "center"
                    },
                    {
                        title: '联系方式',
                        dataIndex: 'phone',
                        align: "center"
                    },
                    {
                        title: '地块位置',
                        dataIndex: 'blockInfo',
                        scopedSlots: { customRender: "blockInfo" },
                        align: "center"
                    },
                    {
                        title: '操作',
                        dataIndex: "action",
                        scopedSlots: { customRender: "action" },
                        align: "center",
                        width: '10%'
                    }
                ]
            }
        },
        methods: {
            handleLook(record) {
                this.$refs.lookMember.open(record)
            },
            changeString(text) {
                return text.substring(0, 3) + '...'
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .info-content
        width 90%
        margin 20px auto
        .flex-wrapper
            width 100%
            display flex
            margin-bottom 20px
            div
                width 400px
                height 40px
                line-height 40px
        .label
            display inline-block
            width 120px
            text-align right
            vertical-align top
        .desc
            width 59%
            display inline-block
            height 32px
            text-align center
            background rgba(238,238,238,1)
            border 1px solid rgba(170,170,170,1)
            vertical-align middle
            line-height 30px
        .time-wrapper
            margin-bottom 20px
            .label
                width 120px
            .desc
                width 200px
        .textarea-wrapper
            margin-bottom 20px
</style>