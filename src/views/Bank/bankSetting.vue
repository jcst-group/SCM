<template>
    <div class="setting">
        <div class="setting-desc">
            *此处可上传与修改贵机构的相关资质与资料，并可设置是否接受贷款申请。
            <span v-text="'\u1997'"></span>
        </div>
        <setting ref="setting">
            <div class="form-wrapper">
                <a-form-item label='银行机构名称：' style="margin-right: 10px">
                    <a-input
                        v-decorator="['body',{
                        rules: [{required: true, message: '计划名称必须在30位内！',max:30}]
                    }]">
                    </a-input>
                </a-form-item>
                <a-form-item label='联系电话：'>
                    <a-input
                        style="width: 186px;"
                        v-decorator="['phone',{
                        rules: [{
                            required: true,
                            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                            message: '联系电话格式错误'
                        }]
                    }]">
                    </a-input>
                </a-form-item>
                <a-form-item label='地址：'>
                    <a-input
                        style="width: 186px;"
                        v-decorator="['address',{
                        rules: [{
                            required: true,
                            message: '联系电话格式错误'
                        }]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='传真：' style="margin-right: 10px">
                    <a-input
                        v-decorator="['message',{
                        rules: [{required: true, message: '计划名称必须在30位内！',max:30}]
                    }]">
                    </a-input>
                </a-form-item>
                <a-form-item label='电子邮箱：' style="margin-right: 10px">
                    <a-input
                        v-decorator="['email',{
                        rules: [{
                            required: true,
                            pattern: /@/
                        }]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
        </setting>
    </div>
</template>

<script>
    import setting from "@/components/setting";
    export default {
        components: {
            setting
        }
    }
</script>

<style lang="stylus" scoped>
    .setting
        &-desc
            letter-spacing 1px
            color #838383
            margin-bottom 20px
</style>