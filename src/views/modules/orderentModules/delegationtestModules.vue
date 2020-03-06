<template>
    <a-modal :title="title" v-model="visible"  style="top:5%;height: 90%"
             :maskClosable="false" class="delegationtest-modal">
        <div class="titlenums">
            <span>检测委托号:8888888888888888</span>
        </div>
        <a-form :form="form">
            <div>
                <div class="form-wrapper">
                    <a-form-item label="所属合作社">
                        <a-select :disabled="this.islook"  v-decorator="[
                        'companyType',
                            {
                                rules: [{ required: true, message: '请选择企业类型' }],
                            }
                        ]">
                            <a-select-option v-for="item in companyEnum" :key="item.code" :value='item.code'>
                                {{item.displayName}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
                <div class="form-wrapper">
                    <a-form-item label="下属基地关联社员">
                        <a-select :disabled="this.islook" v-decorator="[
                        'companyType',
                            {
                                rules: [{ required: true, message: '请选择企业类型' }],
                            }
                        ]">
                            <a-select-option v-for="item in companyEnum" :key="item.code" :value='item.code'>
                                {{item.displayName}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </div>
            <div>
                <div class="form-wrapper">
                    <a-form-item label="检测机构选择">
                        <a-select :disabled="this.islook" v-decorator="[
                        'companyType',
                            {
                                rules: [{ required: true, message: '请选择企业类型' }],
                            }
                        ]">
                            <a-select-option v-for="item in companyEnum" :key="item.code" :value='item.code'>
                                {{item.displayName}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
                <div class="form-wrapper">
                    <a-form-item label="社员基地位置">
                        <a-select :disabled="this.islook" v-decorator="[
                        'companyType',
                            {
                                rules: [{ required: true, message: '请选择企业类型' }],
                            }
                        ]">
                            <a-select-option v-for="item in companyEnum" :key="item.code" :value='item.code'>
                                {{item.displayName}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </div>
            <div>
                <div class="form-wrapper">
                    <a-form-item label="检测内容选择" :required="true">
                        <a-checkbox-group :disabled="this.islook" :options="plainOptions" v-model="valueOptions" @change="checkboxChange"/>
                    </a-form-item>
                </div>
                <div class="form-wrapper">
                    <a-form-item label="其他委托资料上传">
                        <upload-img ref="uploadImg" :disabled="this.islook"></upload-img>
                    </a-form-item>
                </div>
            </div>
            <div>
                <div class="form-wrapper">
                    <a-form-item label="检测内容备注">
                        <a-textarea :disabled="this.islook" :autosize="{ minRows: 6, maxRows: 6 }"
                                    style="width: 100%"
                                    v-decorator="['remark']"/>
                    </a-form-item>
                </div>
            </div>
            <div><!--v-if="!this.islook"-->
                <div class="form-wrapper"></div>
                <div class="form-wrapper" style="text-align: right;padding-right: 20px;">
                    <a-button @click="handelCancel" style="margin-right: 10px;background-color: #AAAAAA;border-color: #AAAAAA;width: 150px;" type='primary'>取消添加</a-button>
                    <a-button @click="handleOk" type='primary' style="width: 150px;">确认添加</a-button>
                </div>
            </div>
        </a-form>
    </a-modal>
</template>
<script>
    import uploadImg from '@/components/uploadImg'
    export default {
        components: {
            uploadImg
        },
        data() {
            return {
                visible: false,
                title:'',
                form: this.$form.createForm(this),
                plainOptions: ['环境检测', '种苗检测', '采收检测', '初加工检测'],
                valueOptions: [],
                islook:false,
                companyEnum:[],
            }
        },
        created() {
        },
        methods: {
            look(){
                this.visible = true;
                this.islook  = true;
            },
            _loadData(){

            },
            handelCancel() {
                this.$refs.uploadImg.fileList = []
                this.$refs.uploadImg.fileId = []
                this.visible = false
            },
            handleOk() {
                this.visible = false;
            },
            checkboxChange(){

            },
        }
    }
</script>
<style lang="stylus">
    .delegationtest-modal
        width: 900px !important
        .titlenums
            width 100%
            text-align right
            color #7F7F7F
            margin-bottom 20px
            padding-right 20px
        .form-wrapper
            width 50%
            display inline-block
            .ant-form-item
                width 100%
                display inline-block
                margin-bottom 30px
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
                margin-bottom 30px
                .ant-form-item-control-wrapper
                    width 82%
                    display inline-block
                .ant-form-item-label
                    width 150px
                    vertical-align top
    .tab-box01 /deep/ .ant-form-item
        margin-bottom: 5px;
    .delegationtest-modal /deep/ .ant-modal-body
        overflow-y: inherit;
        max-height 517px !important;
        padding 10px 24px
    .delegationtest-modal /deep/ .ant-btn-default
        display: none
    .delegationtest-modal /deep/ .ant-modal-footer
        display none
    .delegationtest-modal /deep/ .ant-btn-primary
        background-color #0F5D67
        border-color #0F5D67
    .delegationtest-modal /deep/ .ant-modal-body
        overflow auto
    .delegationtest-modal /deep/ .ant-checkbox-group-item
        margin-bottom 10px
    .delegationtest-modal /deep/ .ant-modal-title
        color #2A6F79
        text-align center
</style>
