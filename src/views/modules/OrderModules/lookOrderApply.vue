<template>
    <a-modal
        :title="title"
        v-model="visible"
        style="top:10%;height: 90%"
        :width='950'
        :maskClosable="false"
        :destroyOnClose='true'
        class="look-order">
        <a-form
            :form="form">
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item  label='所属合作社：' style="margin-right: 10px">
                        <span class="desc" style="width: 200px">{{record.financeUser ? record.financeUser.cominfo.username : ''}}</span>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item  label='下属基地关联社员：' style="margin-right: 10px">
                        <span class="desc" style="width: 200px">{{record.financeMember ? record.financeMember.realName : ''}}</span>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item  label='检测机构选择：' style="margin-right: 10px">
                        <span class="desc" style="width: 200px">{{ record.detectUser ? record.detectUser.cominfo.username : ''}}</span>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item class="content-select"  label='检测类型选择：' style="margin-right: 10px">
                        <span class="desc" style="width: 200px">{{record.insuranceType ? record.insuranceType.displayName : ''}}</span>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item  class="plot-wrapper" label='社员基地位置：' style="margin-right: 10px">
                        <span class="desc" style="width: 80%">{{record.financeMember ? record.financeMember.blockInfo : ''}}</span>
                    </a-form-item>
                </a-col>
                <a-col :span='24'>
                    <a-form-item label='检测内容备注：' class="remark-wrapper">
                        <span class="desc" style="width: 80%">{{record.charOne ? record.charOne : '无'}}</span>
                    </a-form-item>
                </a-col>
                <a-col :span='24'>
                     <a-form-item label='其他委托资料：' v-if="record.relatePics && record.relatePics.length">
                        <lookImg
                            style="display: inline-block; margin-right: 8px"
                            v-for="item in record.relatePics"
                            :key="item.id"
                            :imgUrl='item.pictureUrl'>
                        </lookImg>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <div class="table-wrapper" v-if="record.feeItems && record.feeItems.length">
            <span>费用清单: </span>
            <a-table
                style="margin-top: 10px"
                :columns="feeColumns"
                :dataSource="record.feeItems"
                :pagination="false"
                rowKey="id"
                bordered>
            </a-table>
        </div>
        <div class="finish-check-wrapper" style="margin-top: 20px" v-if="record.charTwo">
            <div>
                <a-form-item label="检测人"  class="remark-wrapper">
                    <span class="desc" style="width: 40%">{{record.charTwo}}</span>
                </a-form-item>
            </div>
            <div>
                <a-form-item label='检测备注'  class="remark-wrapper">
                    <span class="desc" style="width:80%">{{record.charTwo}}</span>
                </a-form-item>
            </div>
            <div v-if="record.resultPics.length">
                <a-form-item label='检测报告'  class="remark-wrapper">
                    <look-img
                        ref="lookImg"
                        style="display: inline-block; margin-right: 10px"
                        v-for="item in record.resultPics"
                        :key="item.id"
                        :imgUrl='item.pictureUrl'>
                    </look-img>
                </a-form-item>
            </div>
        </div>
        <div class="list-show" v-if="record.messages">
            <div class="info-title">
                处理信息
            </div>
            <div class="list-wrapper">
                <div class="flex-wrapper">
                    <span>处理时间</span>
                    <span>保单状态</span>
                    <span>备注信息</span>
                </div>
                <div class="flex-wrapper" v-for="item in record.messages" :key="item.id">
                    <span>{{item.createTime}}</span>
                    <span>{{item.messageStatus.displayName}}</span>
                    <span>{{item.commont}}</span>
                </div>
            </div>
        </div>
        <div slot="footer">
            <a-button @click="handelCancel">关闭</a-button>
        </div>
    </a-modal>
</template>

<script>
    import lookImg from '@/components/lookImg'
    export default {
        components: {
            lookImg
        },
        data() {
            return {
                visible: false,
                form: this.$form.createForm(this),
                record: {},
                title: '',
                feeColumns: [
                    {
                        title: '费用名称',
                        dataIndex: 'itemName',
                        align: 'center'
                    },
                    {
                        title: '费用单位',
                        dataIndex: 'itemUnit',
                        align: 'center'
                    },
                    {
                        title: '费用单价(元)',
                        dataIndex: 'itemPrice',
                        align: 'center'
                    },
                    {
                        title: '使用数量',
                        dataIndex: 'intOne',
                        align: 'center'
                    },
                    {
                        title: '费用总价(元)',
                        dataIndex: 'itemSum',
                        align: 'center'
                    }
                ],
            }
        },
        methods: {
            open(record) {
                this.visible = true
                this.title = '查看检测详情'
                this.record = record
            },
            handelCancel() {
                this.visible = false
            }
        }
    }
</script>

<style lang="stylus">
    .look-order
        .ant-form-item-control-wrapper
            display inline-block
        .ant-form-item-label
            vertical-align top
            width: 135px
        .remark-wrapper, .plot-wrapper
            width 100%
            display flex
            margin-right 30px
            .ant-form-item-control-wrapper
                flex 1
        .content-select
            position relative
            .ant-form-item-control-wrapper
                margin-left: 135px
            .ant-form-item-label
                position:absolute
            .ant-radio-wrapper
                width: 120px
        .desc
            width 60%
            display inline-block
            height 32px
            text-align center
            background rgba(238,238,238,1)
            border 1px solid rgba(170,170,170,1)
            vertical-align middle
            line-height 30px
        .list-show
            margin-top 20px
            .info-title
                background-color #EDEDED
                height 34px
                line-height 34px
                border-bottom 1px solid #A5A2A2
                position relative
                text-align center
                span
                    position absolute
                    font-size 12px
                    bottom -10px
                    right 10px
            .list-wrapper
                margin 10px
                .flex-wrapper
                    display flex
                    padding 5px 0
                    span
                        margin-right: 8px
                    span:nth-of-type(1), span:nth-of-type(2)
                        width: 160px
                    span:nth-of-type(3)
                        flex: 1
</style>