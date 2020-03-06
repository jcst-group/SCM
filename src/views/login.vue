<template>
    <div class="login_box" ref="loginBox">
        <div style="position: absolute; left:0; top:15%; right:0; bottom: 0">
            <div class="title-wrapper">
                <!-- <img src="../assets/img/ddwb01.png" style="width: 70px;margin-top: -2%;margin-right: 2%"> -->
                <span class="login_span">供应链金融</span>
            </div>
            <div class="desc-wrapper">
                <span class="chinese">-{{desc}}</span>
            </div>
            <div style="position: relative; z-index: 1;width: 500px;height: 384px;background-color: rgba(83, 122, 107, 0.32);margin: auto;border-radius:10px 10px;">
                <div style="width: 100%;height: 126px;background-color:rgba(128, 128, 128, 0.28);padding-left: 10%;padding-top: 8%;position: relative;border-radius:10px 10px;">
                    <span class="login_hear">立即登录</span>
                    <span class="login_hears">Login to system</span>
                    <a-icon type="lock" style="color: rgba(254, 254, 254, 0.73);font-size:40px;position: absolute;bottom: 28%;right: 10%"/>
                </div>
                <div style="width:400px;margin:0 auto;padding-top: 8%;">
                    <a-form
                        id="components-form-demo-normal-login"
                        :form="form"
                        class="login-form"
                        @submit="handleSubmit"
                    >
                        <div class="ainput">
                            <a-form-item>
                                <a-input
                                    v-decorator="[
                                        'username',
                                        { rules: [{ required: true, message: '请输入用户名' }] }
                                    ]"
                                    placeholder="用户名"
                                >
                                    <a-icon
                                    slot="prefix"
                                    type="user"
                                    style="color: rgba(0,0,0,.25)"
                                    />
                                </a-input>
                            </a-form-item>
                        </div>
                        <div class="ainput">
                            <a-form-item>
                            <a-input
                                v-decorator="[
                                    'password',
                                    { rules: [{ required: true, message: '请输入密码' }] }
                                ]"
                                type="password"
                                placeholder="密码"
                            >
                                <a-icon
                                    slot="prefix"
                                    type="lock"
                                    style="color: rgba(0,0,0,.25)"
                                />
                            </a-input>
                            </a-form-item>
                        </div>
                        <a-form-item>
                            <a-button
                                type="primary"
                                html-type="submit"
                                class="login-form-button"
                                :disabled="loginBtn"
                            >
                            登录
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
        <vue-particles
            style="position: absolute; left:0; top:0%; right:0; bottom: 0"
            color="#23DECB"
            :particleOpacity="0.9"
            :particlesNumber="60"
            shapeType="circle"
            :particleSize="5"
            linesColor="#23DECB"
            :linesWidth="2"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="2"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        >
        </vue-particles>
  </div>
</template>

<script>
import {login, getCompanyInfo} from '@/api/allApi'
export default {
    beforeCreate () {
        this.form = this.$form.createForm(this);
    },
    data() {
        return {
            loginBtn: false,
            desc: '金融管理云平台'
        }
    },
    created() {
        switch(this.$route.path) {
            case '/finance/login':
                this.desc = '合作社管理云平台'
                break
            case '/detect/login':
                this.desc = '检测机构管理云平台'
                break
            case '/insurance/login':
                this.desc = '保险业务管理云平台'
                break
            case '/bank/login':
                this.desc = '银行业务管理云平台'
                break
            case '/guarantee/login':
                this.desc = '担保管理云平台'
                break
            case '/loan/login':
                this.desc = '贷款业务管理云平台'
                break
            case '/order/login':
                this.desc = '订单企业管理云平台'
                break
            default:
                this.desc = '金融管理云平台'
        }
    },
    methods: {
        handleSubmit (e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.loginBtn = true
                    console.log(values)
                    login(values).then(res => {
                        console.log(res)
                        if (res.success) {
                            window.localStorage.token = res.result.token
                            window.localStorage.username = res.result.userInfo.username
                            window.localStorage.userType = res.result.userInfo.userType.code
                            window.localStorage.usertitle = res.result.userInfo.userType.displayName
                            getCompanyInfo().then(res => {
                                if (res.success) {
                                    window.localStorage.info = JSON.stringify(res.result)
                                }
                            })
                            this.$router.push({ path: '/home' })
                            this.$notification.success({
                                message: '欢迎',
                                description: `欢迎回来`,
                            });
                            this.loginBtn = false;
                        } else {
                            this.$notification[ 'error' ]({
                                message: '登录失败',
                                description: res.message,
                                duration: 4,
                            });
                            this.loginBtn = false;
                        }
                    })
                }
            });
        },
    },
  };
</script>
<style scoped>
.login_box{
    height: 100%;
    position: absolute;
    width: 100%;
    padding: 6% 0;
    background-image: url("../assets/img/login.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 700px
}
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
    float: right;
}
#components-form-demo-normal-login .login-form-button {
    width: 100%;
}
.login_span{
    font-family: MicrosoftYaHei;
    font-size: 60px;
    line-height: 30px;
    letter-spacing: 80px;
    color: #fefefe;
    transform: translateX(42px);
    display: inline-block;
}
.title-wrapper{
    margin-bottom: 30px;
    text-align: center;
}
.desc-wrapper{
    text-align: right;
    color: #fff;
    margin-bottom: 30px
}
.desc-wrapper span{
    width: 350px;
    display: block;
    transform: translateX(70px);
    margin: 0 auto;
}
.desc-wrapper .chinese {
    font-size: 20px;
    letter-spacing: 8px
}
.desc-wrapper .english {
    letter-spacing: 4px
}
.ant-btn-primary{
    background:linear-gradient(#2db3a8,#0D9168,#259188) !important;
    border-color:#269383 !important;
}
.login_hear{
    display: block;
    width: 118px;
    height: 24px;
    font-family: PingFang-SC-Regular;
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    letter-spacing: 7px;
    color: #ffffff;
    opacity: 0.9;
    margin-bottom: 2%;
}
.login_hears{
    width: 329px;
    height: 13px;
    font-family: SFProDisplay-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    color: #fefefe;
}
</style>
<style>
.ainput /deep/ .ant-form-explain{
    color: white;
}
</style>
