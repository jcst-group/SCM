<template>
    <a-modal
        title="查看贷款申请"
        v-model="visible"
        @ok="handleOk"
        @cancel='handelCancel'
        style="top:10%;height: 90%"
        :width='1100'
        cancelText="不予处理"
        okText="接受申请"
        :maskClosable="false"
        class="check-bank-apply">
        <tabs ref="tabs"></tabs>
        <div class="textarea-wrapper">
            <span style="vertical-align: top">处理信息：</span>
            <a-textarea
                style="width: 80%"
                :autosize='{minRows: 2, maxRows: 6}'>
            </a-textarea>
        </div>
    </a-modal>
</template>

<script>
    import tabs from '@/components/tabs'
    export default {
        components: {
            tabs
        },
        data() {
            return {
                visible: false,
                record: {},
            }
        },
        methods: {
            open(record) {
                this.visible = true
                this.record = record !== undefined ? record : {}
            },
            handelCancel() {
                this.visible = false
                setTimeout(() => {
                    this.$refs.tabs.activeKey = '1'
                }, 1000)
            },
            handleOk() {
            }
        }
    }
</script>

<style lang="stylus">
    .check-bank-apply
        .form-wrapper
            display flex
            .check-wrapper
                width 120px
                display inline-block
                margin-right 20px
            .ant-form-item-control-wrapper
                display inline-block
            .ant-form-item-label
                vertical-align top
                width 120px
            .remark-wrapper
                width 100%
                display flex
                margin-right 30px
                .ant-form-item-control-wrapper
                    flex 1
            .label-wrapper
                label
                    top -10px
</style>
