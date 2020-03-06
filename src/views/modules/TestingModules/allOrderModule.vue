<template>
    <a-modal
        :title="'查看详情'"
        v-model="visible"
        style="top:5%;height: 90%"
        :maskClosable="false"
        class="all-order-modal"
        :width='950'
        :destroyOnClose='true'>
        <a-form :form="form">
            <div class="form-wrapper">
                <a-form-item label="检测单号">
                    <!-- <a-input disabled v-model="record.orderCode"/> -->
                    <span class="desc">{{record.orderCode}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测委托企业">
                    <span class="desc">{{record.orderUser ? record.orderUser.cominfo.username : ''}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测合作社/基地">
                    <span class="desc">{{record.financeUser ? record.financeUser.cominfo.username : ''}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测所在地">
                    <span class="desc">{{record.member}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测委托时间">
                    <span class="desc">{{record.createTime}}</span>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label="检测项目">
                    <span class="desc">{{record.insuranceType ? record.insuranceType.displayName : ''}}</span>
                </a-form-item>
            </div>
            <div class="formz-wrapper">
                <a-form-item label='委托备注'>
                    <span class="desc">{{record.charOne}}</span>
                </a-form-item>
            </div>
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
            <div class="form-wrapper">
                <a-form-item label="检测人">
                    <span class="desc">{{record.charTwo}}</span>
                </a-form-item>
            </div>
            <div class="formz-wrapper">
                <a-form-item label='检测结果'>
                    <span class="desc">{{record.charTwo}}</span>
                </a-form-item>
            </div>
            <div class="formz-wrapper" v-if="record.resultPics.length">
                <a-form-item label='检测报告'>
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
        <listShow :record='record'></listShow>
        <div slot="footer">
            <a-button @click="handelCancel">关闭</a-button>
        </div>
    </a-modal>
</template>
<script>
    import lookImg from '@/components/lookImg'
    import listShow from '@/components/listShow'
    export default {
        components:{
            lookImg,
            listShow
        },
        data() {
            return {
                visible: false,
                title:'',
                record: {},
                form: this.$form.createForm(this),
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
                this.record = record
                this.visible = true;
            },
            handelCancel() {
                this.visible = false
            },
        }
    }
</script>
<style lang="stylus">
    .all-order-modal
        .desc
            width 100%
            display inline-block
            height 32px
            text-align center
            background rgba(238,238,238,1)
            border 1px solid rgba(170,170,170,1)
            vertical-align middle
            line-height 30px
        .form-wrapper
            width 45%
            display inline-block
            .ant-form-item
                width 100%
                display inline-block
                margin-bottom 10px
                .ant-form-item-control-wrapper
                    width 60%
                    display inline-block
                .ant-form-item-label
                    width 150px
                    vertical-align top
        .formz-wrapper
            width 100%
            display inline-block
            .ant-form-item
                width 100%
                display inline-block
                margin-bottom 10px
                .ant-form-item-control-wrapper
                    width 72%
                    display inline-block
                .ant-form-item-label
                    width 150px
                    vertical-align top
    .change-order-modal /deep/ .ant-modal-title
        color #2A6F79
        text-align center
</style>
