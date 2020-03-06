<template>
    <a-modal
            :title="title"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            :maskClosable="false"
            cancelText="取消"
            :width='500'
            okText="确定"
            class="user-module"
    >
        <a-form
                :form="form"
        >
            <a-form-item
                    v-if="!isuppass"
                    v-bind="formItemLayout"
                    label="账号"
                    class="form-passsword"
            >
                <a-input
                        @blur='checkUsername'
                        v-decorator="[
                        'username',
                        {
                          initialValue:record.username,
                          rules: [{ required: true, message: '用户名长度必须在6-32位内！',min:6,max:32 }],
                        }
                      ]"
                />
            </a-form-item>
            <a-form-item
                    v-if="isadd || isuppass"
                    v-bind="formItemLayout"
                    label="密码"
                    class="form-passsword"
            >
                <a-input
                        v-decorator="[
                'password',
                {
                  rules: [{
                    required: true, message: '密码长度必须在6-32位内！',min:6,max:32
                  }, {
                    validator: validateToNextPassword,
                  }],
                }
              ]"
                        type="password"
                />
            </a-form-item>
            <a-form-item
                    v-if="isadd || isuppass"
                    v-bind="formItemLayout"
                    label="确认密码"
                    class="form-passsword"
            >
                <a-input
                        v-decorator="[
                'confirm',
                {
                  rules: [{
                    required: true, message: '请再输入一次密码',
                  }, {
                    validator: compareToFirstPassword,
                  }],
                }
              ]"
                        type="password"
                        @blur="handleConfirmBlur"
                />
            </a-form-item>
            <a-form-item
                    v-if="!isuppass"
                    label="用户类型"
                    class="form-passswords"
            >
                <a-select v-decorator="[
                        'userType',
                            {
                                initialValue:record.userType ? record.userType.code : '',
                                rules: [{ required: true, message: '请选择用户类型' }],
                            }
                        ]">
                    <a-select-option v-for="item in UserTypeEnum" :key="item.code" :value='item.code'>
                        {{item.displayName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                    v-if="!isuppass"
                    v-bind="formItemLayout"
                    label="手机号"
                    class="form-passsword"
            >
                <a-input
                        @blur='checkPhone'
                        maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')"
                        v-decorator="[
                        'phone',
                        {initialValue:record.phone,
                          rules: [{
                            required: true, message: ' ',
                          },{
                            validator: displayResult,
                          }],
                        }
                      ]"
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import {checkUser,financeUsersave,financeUserupdate,financeupdapass,getFinanceUserTypeEnum} from '@/api/allApi'
    export default {
        data(){
            return{
                confirmDirty: false,
                title:'',
                visible:false,
                record:{},
                form: this.$form.createForm(this),
                formItemLayout: {
                    labelCol: {
                        xs: { span: 24 },
                        sm: { span: 6 }
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 16 }
                    }
                },
                phoneLock:true,
                userLock:true,
                isadd:true,
                isuppass:false,
                UserTypeEnum:[],
            }
        },
        methods:{
            add(){
              this.form.resetFields()
              this.visible = true;
              this.isadd = true;
              this.isuppass = false;
              this.record = {};
              this.getusertype();
            },
            open(record){
                this.form.resetFields()
                this.visible = true;
                this.isadd = false;
                this.isuppass = false;
                this.record = record;
                this.getusertype();
            },
            updatapass(record){
                this.form.resetFields()
                this.visible = true;
                this.isadd = false;
                this.isuppass = true;
                this.record = record;
            },
            getusertype(){
                getFinanceUserTypeEnum().then(res => {
                    if(res.success){
                        this.UserTypeEnum = res.result
                    }
                })
            },
            handleOk(){
                let that = this;
                if (this.title == "新增账户") {
                    this.form.validateFieldsAndScroll((err, values) => {
                        if (!err) {
                            if (this.phoneLock && this.userLock) {
                                let params = this.form.getFieldsValue()
                                delete params.confirm
                                financeUsersave(params).then(res => {
                                    if(res.success){
                                        that.$message.success(res.result)
                                        that.$parent._loadData()
                                    }
                                })
                                this.visible = false;
                            } else {
                                !this.phoneLock ? this.$message.warn('手机号重复，请重新填写手机号') : this.$message.warn('用户名重复，请重新填写用户名')
                            }
                        }
                    })
                }else if (this.title == "修改账户"){
                    this.form.validateFieldsAndScroll((err, values) => {
                        if (!err) {
                            let params = this.form.getFieldsValue()
                            params.id = this.record.id;
                            financeUserupdate(params).then(res => {
                                if(res.success){
                                    that.$message.success(res.result)
                                    that.$parent._loadData()
                                }
                            })
                            this.visible = false;
                        }
                    })
                }else if (this.title == "修改密码"){
                    this.form.validateFieldsAndScroll((err, values) => {
                        if (!err) {
                            let params = this.form.getFieldsValue()
                            params.id = this.record.id;
                            delete params.confirm
                            financeupdapass(params).then(res => {
                                if(res.success){
                                    that.$message.success(res.result)
                                    that.$parent._loadData()
                                }
                            })
                            this.visible = false;
                        }
                    })
                }
            },
            handleCancel(){
                this.visible = false;
            },
            validateToNextPassword(rule, value, callback) {
                const form = this.form;
                if (value && this.confirmDirty) {
                    form.validateFields(["confirm"], { force: true });
                }
                callback();
            },
            compareToFirstPassword(rule, value, callback) {
                const form = this.form;
                if (value && value !== form.getFieldValue("password")) {
                    callback("两次密码不一样");
                } else {
                    callback();
                }
            },
            handleConfirmBlur(e) {
                const value = e.target.value;
                this.confirmDirty = this.confirmDirty || !!value;
            },
            displayResult(rule, value, callback) {
                if (value.length != 11) {
                    callback("请输入正确的手机号");
                } else {
                    callback();
                }
            },
            checkPhone(e) {
                checkUser({
                    phone: e.target.value
                }).then(res => {
                    if (!res.success) {
                        this.$message.warn(res.message)
                    }
                    this.phoneLock = res.success
                })
            },
            checkUsername(e) {
                let length = e.target.value.length
                if (e.target.value == parseInt(e.target.value) && (parseInt(e.target.value) + '').length == length) {
                    this.userLock = false
                    this.$message.warn('用户名不可以只有数字')
                    return
                }
                checkUser({
                    username: e.target.value
                }).then(res => {
                    if (!res.success) {
                        this.$message.warn(res.message)
                    }
                    this.userLock = res.success
                })
            },
        }
    }
</script>

<style lang="stylus">
    .user-module
        .form-passsword
            margin 0 auto 20px
            .ant-form-item-label
               width 100px
        .form-passswords
            .ant-form-item-label
                width 100px
            .ant-form-item-control-wrapper
                width 302px
                display inline-block
</style>
