<template>
    <div class="setting-wrapper">
        <div class="control-setting">
            是否开放接受申请
            <a-switch style="margin-left: 8px" @change='changeSwitch' />
        </div>
        <div class="setting-content" v-show="this.checked">
            <a-form
                :form="form">
                <slot></slot>
                <div class="form-wrapper">
                    <a-form-item
                        label="营业相关执照："
                        class="form-passsword change-display"
                    >
                        <upload-img ref="uploadImg"></upload-img>
                    </a-form-item>
                </div>
                <div class="form-wrapper">
                    <a-form-item
                        label="相关资质证书："
                        class="form-passsword change-display"
                    >
                        <upload-img ref="uploadImg"></upload-img>
                    </a-form-item>
                </div>
            </a-form>
        </div>
    </div>
</template>

<script>
    import uploadImg from '@/components/uploadImg'
    export default {
        components: {
            uploadImg
        },
        data() {
            return {
                form: this.$form.createForm(this),
                checked: false
            }
        },
        methods: {
            changeSwitch(checked) {
                this.checked = checked
            }
        }
    }
</script>

<style lang="stylus">
        .setting-wrapper
            width 90%
            padding 15px
            margin 0 auto
            border 1px solid #DCDCDC
            color #777
            .control-setting
                margin-bottom 30px
        .setting-content
            width 95%
            margin 0 auto
            .form-wrapper
                display flex
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