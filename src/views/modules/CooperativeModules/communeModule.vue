<template>
    <a-modal :title="title" v-model="visible"  style="top:5%;height: 90%"
             :maskClosable="false" class="completetest-modal" @ok="handleOk" @cancel="handelCancel">
        <div class="comple-titles">
            <span>农民编码: {{memberCode}}</span>
        </div>
        <a-form :form="form">
            <div style="margin-top: 10px">
                <div class="from-boxs">
                    <a-form-item label="农户照片" :required="true">
                        <upload-img ref="uploadImg" :picList="headpicList" :maxLength=1 imgurl="/api/finance/pictureInfo/addMemberHeadPic"></upload-img>
                    </a-form-item>
                </div>
                <div style="width: 75%;display: inline-block;height: 200px">
                    <div class="form-wrapper changefroms">
                        <a-form-item label="姓名">
                            <a-input
                                     v-decorator="[
                            'realName',
                            {
                                initialValue: munedata ? munedata.realName : null,
                                rules: [{
                                  required: true, message: '请输入姓名',min:0,max:50
                                }]
                              }
                            ]"
                            />
                        </a-form-item>
                    </div>
                    <div class="formz-wrapper">
                        <a-form-item label="身份证号">
                            <a-input
                                    maxlength='18'
                                    v-decorator="[
                                'identifyCode',
                                {
                                  initialValue: munedata ? munedata.identifyCode : null,
                                  rules: [{
                                    required: true,message: '请正确填写身份证号',pattern: /(\d{17}?(\d|X))|(^\d{15}$)/
                                  }]
                                }
                              ]"
                            />
                        </a-form-item>
                    </div>
                    <div class="formz-wrappersel">
                        <a-form-item label="地址">
                            <a-select style="float:left;width:32%;margin-right:1.7%" v-model="province_code"  @change="changefirst">
                                <a-select-option v-for="(v,k) in chinamap" :value="v.areaCode" :key="k">{{v.areaName}}</a-select-option>
                            </a-select>
                            <a-select style="float:left;width:32%;margin-right:1.7%;" v-model="city_code" @change="changescend">
                                <a-select-option v-for="(v,k) in secondmap" :value="v.areaCode" :key="k">{{v.areaName}}</a-select-option>
                            </a-select>
                            <a-select style="float:left;width:32%;" v-decorator="[
                              'areaCode',
                              {
                                initialValue: area_code,
                                rules: [{
                                  required: true, message: '请选择地址',min:0,max:50
                                }]
                              }
                            ]" @change="changethree">
                                <a-select-option v-for="(v,k) in threemap" :value="v.areaCode" :key="k">{{v.areaName}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div class="form-wrapper">
                        <a-form-item label="联系电话">
                            <a-input
                              onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
                              v-decorator="[
                                'phone',
                              {
                                initialValue: munedata ? munedata.phone : null,
                                rules: [{
                                        required: true,
                                        pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                                        message: '联系电话格式错误'
                                }]
                              }
                            ]"
                            />
                        </a-form-item>
                    </div>
                    <div class="formz-wrapper">
                        <a-form-item label="详细地址">
                            <a-input
                                    v-decorator="[
                                'street',
                                {
                                  initialValue: munedata.address ? munedata.address.street : null,
                                  rules: [{
                                    required: true,message: '请输入详细地址',min:0,max:50
                                  }]
                                }
                              ]"
                            />
                        </a-form-item>
                    </div>
                    <div class="form-wrapper changefrom">
                        <a-form-item label="地块面积(亩)">
                            <a-input
                                onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"
                                v-decorator="[
                                'blockArea',
                                {
                                    initialValue: munedata ? munedata.blockArea : null,
                                    rules: [{
                                      required: true, message: '请输入地块面积'
                                    }]
                                  }
                                ]"
                            />
                        </a-form-item>
                    </div>
                    <div class="formz-wrapper">
                        <a-form-item label="地块位置">
                            <a-input
                                v-decorator="[
                                'blockInfo',
                                {
                                  initialValue: munedata ? munedata.blockInfo : null,
                                  rules: [{
                                    required: true,message: '请正确填写身份证号',min:0,max:50
                                  }]
                                }
                              ]"
                            />
                        </a-form-item>
                    </div>
                </div>
                <div class="form-imgs">
                    <div style="position: absolute;top:57px;color:black;">
                        <span>(正反面各一张)</span>
                    </div>
                    <a-form-item label="身份证照片" :required="true">
                        <upload-img ref="uploadImgid" :picList="headpicListid" :maxLength=2 imgurl="/api/finance/pictureInfo/addMemberIDPic"></upload-img>
                    </a-form-item>
                </div>
                <div class="form-imgs">
                    <div style="position: absolute;top:57px;color:black;left: 71px;">
                        <span>(图片5张)</span>
                    </div>
                    <a-form-item label="入社协议" :required="true">
                        <upload-img ref="uploadImgjoin" :picList="headpicListjoin" :maxLength=5 imgurl="/api/finance/pictureInfo/addJoinAssocialPic"></upload-img>
                    </a-form-item>
                </div>
            </div>
        </a-form>
    </a-modal>
</template>
<script>
    import uploadImg from '@/components/uploadImg'
    import {getChinaArea,getSecondArea,addOrUpdate} from '@/api/allApi'
    export default {
        name: 'communeModule',
        components: {
            uploadImg
        },
        data() {
            return {
                memberCode:'',
                visible: false,
                title:'',
                form: this.$form.createForm(this),
                munedata:{},
                province_code:'',
                city_code:'',
                area_code:'',
                chinamap:[],
                secondmap:[],
                threemap:[],
                address:'',
                ssxarea1:'',
                ssxarea2:'',
                ssxarea3:'',
                headpicList:[],
                headpicListid:[],
                headpicListjoin:[],
            }
        },
        created() {
            getChinaArea().then((res)=>{
                if(res.success){
                    this.chinamap=res.result;
                }
            })
        },
        methods: {
            open() {
                this.form.resetFields()
                this.$nextTick(() => {
                    this.$refs.uploadImg.imglist = []
                    this.$refs.uploadImgid.imglist = []
                    this.$refs.uploadImgjoin.imglist = []
                })
                this.munedata = {};
                this.secondmap= [];
                this.threemap = [];
                this.province_code='';
                this.city_code='';
                this.area_code='';
                this.memberCode='系统生成'
                this.visible = true;
            },
            look(record){
                this.munedata = record;
                this.memberCode = record.memberCode
                if(this.munedata.address){
                    this.province_code=this.munedata.address.provinceCode
                    getSecondArea({parentCode:this.province_code}).then((res)=>{
                        if(res.success) {
                            this.secondmap = res.result;
                            this.city_code = this.munedata.address.cityCode
                            getSecondArea({parentCode:this.city_code}).then((res)=>{
                                if(res.success){
                                    this.threemap=res.result;
                                    this.area_code = this.munedata.address.areaCode
                                    this.ssxarea1 = this.munedata.address.province
                                    this.ssxarea2 = this.munedata.address.city
                                    this.ssxarea3 = this.munedata.address.area
                                }
                            })
                        }
                    })
                }
                this.$nextTick(() => {
                    if(this.munedata.headPictureInfos){
                        this.headpicList = this.munedata.headPictureInfos;
                        this.$refs.uploadImg.imglist = this.headpicList
                    }
                    if(this.munedata.concPictureInfos){
                        this.headpicListjoin = this.munedata.concPictureInfos;
                        this.$refs.uploadImgjoin.imglist = this.headpicListjoin
                    }
                    if(this.munedata.idPictureInfos){
                        this.headpicListid = this.munedata.idPictureInfos;
                        this.$refs.uploadImgid.imglist = this.headpicListid
                    }
                })
                this.form.resetFields()
                this.visible = true;
            },
            handelCancel() {
                this.visible = false
            },
            handleOk() {
                if(this.title === '+新增社员农户信息') {
                    this.form.validateFieldsAndScroll((err, values) => {
                        if(!err) {
                            let params = this.form.getFieldsValue()
                            if( this.$refs.uploadImgid.fileId.length==0){
                                this.$message.error('农户照片不能为空');
                                return;
                            }
                            if( this.$refs.uploadImgid.fileId.length<2){
                                this.$message.error('身份证照片必须2张');
                                return;
                            }
                            if( this.$refs.uploadImgjoin.fileId.length==0){
                                this.$message.error('入社协议不能为空');
                                return;
                            }
                            var address={};
                            address.province=this.ssxarea1;
                            address.city=this.ssxarea2;
                            address.area=this.ssxarea3;
                            address.provinceCode=this.province_code;
                            address.cityCode=this.city_code;
                            address.areaCode=this.area_code=params.areaCode;
                            address.street=params.street;
                            delete params.areaCode;
                            delete params.street;
                            params.address = address;
                            params.headPictureInfos = this.$refs.uploadImg.fileId
                            params.idPictureInfos = this.$refs.uploadImgid.fileId
                            params.concPictureInfos = this.$refs.uploadImgjoin.fileId
                            addOrUpdate(params).then((res)=>{
                                if(res.success){
                                    this.$message.success('新增社员农户成功')
                                    this.$parent._loadData()
                                }
                            })
                            this.visible = false;
                        }
                    })
                }else{
                    this.form.validateFieldsAndScroll((err, values) => {
                        if(!err) {
                            let params = this.form.getFieldsValue()
                            if( this.$refs.uploadImgid.fileId.length==0){
                                this.$message.error('农户照片不能为空');
                                return;
                            }
                            if( this.$refs.uploadImgid.fileId.length<2){
                                this.$message.error('身份证照片必须2张');
                                return;
                            }
                            if( this.$refs.uploadImgjoin.fileId.length==0){
                                this.$message.error('入社协议不能为空');
                                return;
                            }
                            var address={};
                            address.province=this.ssxarea1;
                            address.city=this.ssxarea2;
                            address.area=this.ssxarea3;
                            address.provinceCode=this.province_code;
                            address.cityCode=this.city_code;
                            address.areaCode=this.area_code=params.areaCode;
                            address.street=params.street;
                            delete params.areaCode;
                            delete params.street;
                            params.address = address;
                            params.id = this.munedata.id;
                            params.headPictureInfos = this.$refs.uploadImg.fileId
                            params.idPictureInfos = this.$refs.uploadImgid.fileId
                            params.concPictureInfos = this.$refs.uploadImgjoin.fileId
                            addOrUpdate(params).then((res)=>{
                                if(res.success){
                                    this.$message.success(res.message)
                                    this.$parent._loadData()
                                }
                            })
                            this.visible = false;
                        }
                    })
                }
            },
            changefirst(value,option){
                this.ssxarea1=option.componentOptions.children[0].text;
                this.city_code='';
                this.area_code='';
                this.address='';
                this.form.resetFields('areaCode')
                this.secondmap=[];
                this.threemap=[];
                getSecondArea({parentCode:value}).then((res)=>{
                    if(res.success){
                        this.secondmap=res.result;
                    }
                })
            },
            changescend(value,option){
                this.ssxarea2=option.componentOptions.children[0].text;
                this.area_code='';
                this.address='';
                this.form.resetFields('areaCode')
                this.threemap=[];
                getSecondArea({parentCode:value}).then((res)=>{
                    if(res.success){
                        this.threemap=res.result;
                    }
                })
            },
            changethree(value,option){
                this.ssxarea3=option.componentOptions.children[0].text;
            },
        }
    }
</script>
<style lang="stylus">
    .completetest-modal
        width: 900px !important
        .comple-titles
            text-align center
            color #777777
        .from-boxs
            width: 25%
            display inline-block
            float left
            padding-left 42px
            .ant-form-item-label
                width 90px
        .form-wrapper
            width 40%
            display inline-block
            .ant-form-item
                width 100%
                display inline-block
                margin-bottom 10px
                .ant-form-item-control-wrapper
                    width 60%
                    display inline-block
                .ant-form-item-label
                    vertical-align top
        .formz-wrapper
            width 60%
            display inline-block
            .ant-form-item
                width 100%
                display inline-block
                margin-bottom 10px
                .ant-form-item-control-wrapper
                    width 60%
                    display inline-block
                .ant-form-item-label
                    vertical-align top
        .formz-wrappersel
            width 90%
            display inline-block
            .ant-form-item
                width 100%
                display inline-block
                margin-bottom 10px
                .ant-form-item-control-wrapper
                    width 85%
                    display inline-block
                .ant-form-item-label
                    width 77px
                    vertical-align top
        .ant-form-item
            margin-bottom: 5px;
        .ant-modal-body
            overflow-y: inherit;
            max-height 517px !important;
        .ant-btn-default
            display: none
        .ant-btn-primary
            background-color #0F5D67
            border-color #0F5D67
        .ant-modal-body
            overflow auto
            .changefrom
                .ant-form-item-control-wrapper
                    width 51%
            .changefroms
                .ant-form-item
                    text-align right
                    padding-right 23px
                    .ant-form-item-control-wrapper
                        width 66%
        .form-imgs
            width 100%
            padding-left 48px
            margin-top 15px
            position relative
            .ant-form-item-label
                vertical-align top
                width 93px
                margin-top 20px
                margin-right 20px
            .ant-form-item-control-wrapper
                display inline-block
</style>
