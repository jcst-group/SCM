<template>
  <div class="basic">
    <span class="basic-span">公司基础信息</span>
    <div class="basic-tops">
      <a-form :form='form'>
        <div>
          <div class="formz-wrapper">
            <a-form-item label="企业名称">
              <a-input
                      v-decorator="[
                  'username',
                  {
                    initialValue: cominfodata.username ? cominfodata.username : null,
                    rules: [{
                      required: true, message: '请输入企业名称',min:0,max:50
                    }]
                  }
                ]"
              />
            </a-form-item>
          </div>
          <div class="formz-wrapper">
            <a-form-item label="企业类型">
              <a-select v-decorator="[
                        'companyType',
                            {
                                initialValue:cominfodata.companyType ? cominfodata.companyType.code : '',
                                rules: [{ required: true, message: '请选择企业类型' }],
                            }
                        ]">
                <a-select-option v-for="item in companyEnum" :key="item.code" :value='item.code'>
                  {{item.displayName}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
          <div class="formz-wrapper wrpappers">
            <a-form-item label="社会统一信息代码">
              <a-input
                      v-decorator="[
                  'businessLience',
                  {
                    initialValue: cominfodata.businessLience ? cominfodata.businessLience : null,
                    rules: [{
                      required: true, message: '请输入社会统一信息代码',min:0,max:50
                    }]
                  }
                ]"
              />
            </a-form-item>
          </div>
        </div>
        <div>
          <div class="form-wrappersel" style="width: 66.5%;">
            <a-form-item label="企业地址">
              <a-select style="float:left;width:22%;margin-right:2%" v-model="province_code"  @change="changefirst">
                <a-select-option v-for="(v,k) in chinamap" :value="v.areaCode" :key="k">{{v.areaName}}</a-select-option>
              </a-select>
              <a-select style="float:left;width:19%;margin-right:2%;" v-model="city_code" @change="changescend">
                <a-select-option v-for="(v,k) in secondmap" :value="v.areaCode" :key="k">{{v.areaName}}</a-select-option>
              </a-select>
              <a-select style="float:left;width:19%;margin-right:2%;" v-decorator="[
                  'areaCode',
                  {
                    initialValue: area_code,
                    rules: [{
                      required: true, message: '请输入企业地址',min:0,max:50
                    }]
                  }
                ]" @change="changethree">
                <a-select-option v-for="(v,k) in threemap" :value="v.areaCode" :key="k">{{v.areaName}}</a-select-option>
              </a-select>
              <a-input
                      placeholder="请输入具体地址"
                      v-model="address"
                      style="float:left;width:34%;"
              >
              </a-input>
            </a-form-item>
          </div>
          <div class="form-wrappersel wrpapperss">
            <a-form-item label="社会统一代码到期日">
              <a-date-picker
                      style="width:100%"
                      v-decorator="['businessRegistDate', {
                        initialValue: cominfodata.businessRegistDate ? moment(cominfodata.businessRegistDate, 'YYYY-MM-DD') : null,
                        rules: [{required: true, message: '请选择到期日'}]
                    }]"
              />
            </a-form-item>
          </div>
        </div>
        <div>
          <div class="formz-wrapper">
            <a-form-item label="税务登记号">
              <a-input
                      v-decorator="[
                  'taxId',
                  {
                    initialValue: cominfodata.taxId ? cominfodata.taxId : null,
                    rules: [{
                      required: true, message: '请输入税务登记号',min:0,max:50
                    }]
                  }
                ]"
              />
            </a-form-item>
          </div>
          <div class="formz-wrapper">
            <a-form-item label="职工总人数">
              <a-input
                      onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
                      v-decorator="[
                  'stuffNum',
                  {
                    initialValue: cominfodata.stuffNum ? cominfodata.stuffNum : null,
                    rules: [{
                      required: false, message: ''
                    }]
                  }
                ]"
              />
            </a-form-item>
          </div>
          <div class="formz-wrapper wrpappers">
            <a-form-item label="资产总额(万元)">
              <a-input
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"
                      v-decorator="[
                  'assetCount',
                  {
                    initialValue: cominfodata.assetCount ? cominfodata.assetCount : null,
                    rules: [{
                      required: false, message: ''
                    }]
                  }
                ]"
              />
            </a-form-item>
          </div>
        </div>
        <div>
          <div class="form-wrapperimg">
            <a-form-item label='营业执照证件(两张)' :required="true">
              <div class="upload-wrapper">
                <a-upload
                        name="file"
                        listType="picture-card"
                        class="avatar-uploader"
                        :multiple="true"
                        action="/api/finance/pictureInfo/addFinanceBusinessPic"
                        :beforeUpload="beforeUpload"
                        :headers="headers"
                        :fileList='fileList'
                        @change="handleChanges"
                        @preview='handlePreview'
                        :remove='remove'
                >
                  <div v-if="fileList.length < 2">
                    <a-icon type="plus"/>
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
                <a-modal :maskClosable='true' :closable="false"  class="modal-imgs" :visible="imgVisible"  :footer="null" @cancel="handleImgCancel" :destroyOnClose="true">
                  <div id="imgsdiv" style="display: flex;justify-content: center;align-items: center;margin: 0 auto" :style="{transform:'rotateZ('+deg+'deg)'}"><img ref="imgs" id="imgs" alt="example" style="width: 100%" :src="imgUrl"/></div>
                  <div style="margin-top: 15px;height: 30px"><a-button icon='redo' @click="rotatesRight()" type='primary' style="float: right">向右旋转</a-button><a-button icon='undo' @click="rotatesleft()" type='primary' style="margin-right: 10px;float: right;">向左旋转</a-button></div>
                </a-modal>
              </div>
            </a-form-item>
          </div>
          <div class="form-wrapperimg"></div>
        </div>
        <a-button type='primary' class="buttons" @click="handleok()">更新并保存</a-button>
      </a-form>
    </div>
    <div style="margin-top: 30px">
      <span class="basic-span">公司法人信息</span>
      <div class="basic-content">
        <a-form :form='forms'>
          <div>
            <div class="formz-wrapper">
              <a-form-item label="企业法人名称">
                <a-input
                        v-decorator="[
                  'legalPersonName',
                  {
                    initialValue: legalpersondata.legalPersonName ? legalpersondata.legalPersonName : null,
                    rules: [{
                      required: true, message: '请输入企业法人名称',min:0,max:50
                    }]
                  }
                ]"
                />
              </a-form-item>
            </div>
            <div class="formz-wrapper"></div>
            <div class="formz-wrapper"></div>
          </div>
          <div>
            <div class="formz-wrapper">
              <a-form-item label="联系人">
                <a-input
                        v-decorator="[
                  'contractMan',
                  {
                    initialValue: legalpersondata.contractMan ? legalpersondata.contractMan : null,
                    rules: [{
                      required: false, message: '请输入联系人名称',min:0,max:50
                    }]
                  }
                ]"
                />
              </a-form-item>
            </div>
            <div class="formz-wrapper">
              <a-form-item label="联系电话">
                <a-input
                        onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
                        v-decorator="[
                  'contractNum',
                  {
                    initialValue: legalpersondata.contractNum ? legalpersondata.contractNum : null,
                    rules: [{
                            required: false,
                            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                            message: '联系电话格式错误'
                    }]
                  }
                ]"
                />
              </a-form-item>
            </div>
            <div class="formz-wrapper">
              <a-form-item label="联系邮箱">
                <a-input
                        v-decorator="[
                  'contractEmail',
                  {
                    initialValue: legalpersondata.contractEmail ? legalpersondata.contractEmail : null,
                    rules: [{
                      type: 'email', message: '这不是一个正确的邮箱',
                    }, {
                      required: false, message: '请输入邮箱',
                    }]
                  }
                ]"
                />
              </a-form-item>
            </div>
          </div>
          <div>
            <div class="form-wrapperimg">
              <a-form-item label='法人证件(前后两张)'>
                <div class="upload-wrapper">
                  <a-upload
                          name="file"
                          listType="picture-card"
                          class="avatar-uploader"
                          :multiple="true"
                          action="/api/finance/pictureInfo/addLegalPersonPic"
                          :beforeUpload="beforeUploadper"
                          :headers="headers"
                          :fileList='fileListper'
                          @change="handleChangesper"
                          @preview='handlePreviewper'
                          :remove='removeper'
                  >
                    <div v-if="fileListper.length < 2">
                      <a-icon type="plus"/>
                      <div class="ant-upload-text">Upload</div>
                    </div>
                  </a-upload>
                  <a-modal :maskClosable='true' :closable="false" class="modal-imgs"  :visible="imgVisibleper" :footer="null" @cancel="handleImgCancelper" :destroyOnClose="true">
                    <div id="imgsdiv01" style="display: flex;justify-content: center;align-items: center;margin: 0 auto" :style="{transform:'rotateZ('+deg01+'deg)'}"><img ref="imgs01" id="imgs01" alt="example" style="width: 100%" :src="imgUrlper"/></div>
                      <div style="margin-top: 15px;height: 30px"><a-button icon='redo' @click="rotatesRight01()" type='primary' style="float: right">向右旋转</a-button><a-button icon='undo' @click="rotatesleft01()" type='primary' style="margin-right: 10px;float: right;">向左旋转</a-button></div>
                  </a-modal>
                </div>
              </a-form-item>
            </div>
            <div class="form-wrapperimg"></div>
          </div>
          <a-button type='primary' class="buttons" @click="handleokper()">更新并保存</a-button>
        </a-form>
      </div>
    </div>
    <div style="margin-top: 30px">
      <span class="basic-span">注册信息</span>
      <div class="basic-bottom">
        <a-form :form='formss'>
          <div>
            <div class="formz-wrapper wrpappers">
              <a-form-item label="注册金额(万元)">
                <a-input
                        onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"
                        v-decorator="[
                  'registSum',
                  {
                    initialValue: registinfodata.registSum ? registinfodata.registSum : null,
                    rules: [{
                      required: true, message: '请输入注册金额'
                    }]
                  }
                ]"
                />
              </a-form-item>
            </div>
            <div class="formz-wrapper wrpappers">
              <a-form-item label="营业收入(万元)">
                <a-input
                        onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"
                        v-decorator="[
                  'businessIncome',
                  {
                    initialValue: registinfodata.businessIncome ? registinfodata.businessIncome : null,
                    rules: [{
                      required: false, message: ''
                    }]
                  }
                ]"
                />
              </a-form-item>
            </div>
            <div class="formz-wrapper">
            </div>
          </div>
          <div>
            <div class="form-wrappersel" style="width: 66.5%;">
              <a-form-item label="注册地址">
                <a-select style="float:left;width:22%;margin-right:2%" v-model="province_coderes"  @change="changefirstres">
                  <a-select-option v-for="(v,k) in chinamapres" :value="v.areaCode" :key="k">{{v.areaName}}</a-select-option>
                </a-select>
                <a-select style="float:left;width:19%;margin-right:2%;" v-model="city_coderes" @change="changescendres">
                  <a-select-option v-for="(v,k) in secondmapres" :value="v.areaCode" :key="k">{{v.areaName}}</a-select-option>
                </a-select>
                <a-select style="float:left;width:19%;margin-right:2%;" v-decorator="[
                  'areaCoderes',
                  {
                    initialValue: area_coderes,
                    rules: [{
                      required: true, message: '请输入注册地址',min:0,max:50
                    }]
                  }
                ]" @change="changethreeres">
                  <a-select-option v-for="(v,k) in threemapres" :value="v.areaCode" :key="k">{{v.areaName}}</a-select-option>
                </a-select>
                <a-input
                        placeholder="请输入具体地址"
                        v-model="addressres"
                        style="float:left;width:34%;"
                >
                </a-input>
              </a-form-item>
            </div>
            <div class="form-wrappersel wrpapperss"></div>
          </div>
          <div>
            <div class="form-wrappersel" style="width: 66.5%;">
              <a-form-item label="经营地址">
                <a-select style="float:left;width:22%;margin-right:2%" v-model="province_codebus"  @change="changefirstbus">
                  <a-select-option v-for="(v,k) in chinamapbus" :value="v.areaCode" :key="k">{{v.areaName}}</a-select-option>
                </a-select>
                <a-select style="float:left;width:19%;margin-right:2%;" v-model="city_codebus" @change="changescendbus">
                  <a-select-option v-for="(v,k) in secondmapbus" :value="v.areaCode" :key="k">{{v.areaName}}</a-select-option>
                </a-select>
                <a-select style="float:left;width:19%;margin-right:2%;" v-decorator="[
                  'areaCodebus',
                  {
                    initialValue: area_codebus,
                    rules: [{
                      required: true, message: '请输入经营地址',min:0,max:50
                    }]
                  }
                ]" @change="changethreebus">
                  <a-select-option v-for="(v,k) in threemapbus" :value="v.areaCode" :key="k">{{v.areaName}}</a-select-option>
                </a-select>
                <a-input
                        placeholder="请输入具体地址"
                        v-model="addressbus"
                        style="float:left;width:34%;"
                >
                </a-input>
              </a-form-item>
            </div>
            <div class="form-wrappersel wrpapperss"></div>
          </div>
          <a-button type='primary' class="buttons"  @click="handleokbus()">更新并保存</a-button>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {querycominfo,getChinaArea,getSecondArea,saveorupdate,getCompanyTypeEnum,querylegalPerson,saveorupdatelegalper,queryregistInfo,saveorupdateregistInfo} from '@/api/allApi'
  export default {
    data() {      return {
        moment,
        form: this.$form.createForm(this),
        forms:this.$form.createForm(this),
        formss:this.$form.createForm(this),
        cominfodata:{},
        imgLock: true,
        imgLockper:true,
        fileList: [],
        fileListper:[],
        imgSrc: [],
        imgUrl: '',
        imgSrcper: [],
        imgUrlper: '',
        imgVisible: false,
        imgVisibleper: false,
        province_code:'',
        province_coderes:'',
        province_codebus:'',
        city_code:'',
        city_coderes:'',
        city_codebus:'',
        area_code:'',
        area_coderes:'',
        area_codebus:'',
        chinamap:[],
        chinamapres:[],
        chinamapbus:[],
        secondmap:[],
        secondmapres:[],
        secondmapbus:[],
        threemap:[],
        threemapres:[],
        threemapbus:[],
        companyEnum:[],
        address:'',
        addressres:'',
        addressbus:'',
        ssxarea1:'',
        ssxarea1res:'',
        ssxarea1bus:'',
        ssxarea2:'',
        ssxarea2res:'',
        ssxarea2bus:'',
        ssxarea3:'',
        ssxarea3res:'',
        ssxarea3bus:'',
        imgSrcdel: [],
        imgSrcdelper: [],
        legalpersondata:{},
        registinfodata:{},
        deg:0,
        deg01:0,
      }
    },
    created() {
      const token = window.localStorage.token
      this.headers = {"X-Access-Token": token};
      this._loadData();
      getChinaArea().then((res)=>{
        if(res.success){
          this.chinamapbus=this.chinamapres=this.chinamap=res.result;
        }
      })
      getCompanyTypeEnum().then((res)=>{
        if(res.success){
          this.companyEnum = res.result
        }
      })
    },
    methods:{
      _loadData(){
        let imgshowapi = "/api/pictureInfo/show/"
        querycominfo().then(res => {
          console.log(res)
          if(res.success){
            this.cominfodata = res.result
            if(this.cominfodata.address){
              this.province_code = this.cominfodata.address.provinceCode
              getSecondArea({parentCode:this.cominfodata.address.provinceCode}).then((res)=>{
                if(res.success){
                  this.secondmap=res.result;
                  this.city_code = this.cominfodata.address.cityCode
                  getSecondArea({parentCode:this.cominfodata.address.cityCode}).then((res)=>{
                    if(res.success){
                      this.threemap=res.result;
                      this.area_code = this.cominfodata.address.areaCode
                      this.address = this.cominfodata.address.street
                      this.ssxarea1 = this.cominfodata.address.province
                      this.ssxarea2 = this.cominfodata.address.city
                      this.ssxarea3 = this.cominfodata.address.area
                    }
                  })
                }
              })
            }
            if(this.cominfodata.pictureInfos){
              this.cominfodata.pictureInfos.forEach(item => {
                this.fileList.push({
                  uid: item.id,
                  name: item.pictureUrl,
                  status:'done',
                  url: imgshowapi + item.pictureUrl
                })
                this.imgSrc.push({
                  id: item.id
                })
              })
            }
          }
        })
        querylegalPerson().then(res => {
          if(res.success){
            this.legalpersondata = res.result
            if(this.legalpersondata.pictureInfos){
              this.legalpersondata.pictureInfos.forEach(item => {
                this.fileListper.push({
                  uid: item.id,
                  name: item.pictureUrl,
                  status:'done',
                  url: imgshowapi + item.pictureUrl
                })
                this.imgSrcper.push({
                  id: item.id
                })
              })
            }
          }
        })
        queryregistInfo().then(res => {
          if(res.success){
            this.registinfodata = res.result
            if(this.registinfodata.registAddress){
              this.province_coderes = this.registinfodata.registAddress.provinceCode
              getSecondArea({parentCode:this.registinfodata.registAddress.provinceCode}).then((res)=>{
                if(res.success){
                  this.secondmapres=res.result;
                  this.city_coderes = this.registinfodata.registAddress.cityCode
                  getSecondArea({parentCode:this.registinfodata.registAddress.cityCode}).then((res)=>{
                    if(res.success){
                      this.threemapres=res.result;
                      this.area_coderes = this.registinfodata.registAddress.areaCode
                      this.addressres = this.registinfodata.registAddress.street
                      this.ssxarea1res = this.registinfodata.registAddress.province
                      this.ssxarea2res = this.registinfodata.registAddress.city
                      this.ssxarea3res = this.registinfodata.registAddress.area
                    }
                  })
                }
              })
            }
            if(this.registinfodata.businessAddress){
              this.province_codebus = this.registinfodata.businessAddress.provinceCode
              getSecondArea({parentCode:this.registinfodata.businessAddress.provinceCode}).then((res)=>{
                if(res.success){
                  this.secondmapbus=res.result;
                  this.city_codebus = this.registinfodata.businessAddress.cityCode
                  getSecondArea({parentCode:this.registinfodata.businessAddress.cityCode}).then((res)=>{
                    if(res.success){
                      this.threemapbus=res.result;
                      this.area_codebus = this.registinfodata.businessAddress.areaCode
                      this.addressbus = this.registinfodata.businessAddress.street
                      this.ssxarea1bus = this.registinfodata.businessAddress.province
                      this.ssxarea2bus = this.registinfodata.businessAddress.city
                      this.ssxarea3bus = this.registinfodata.businessAddress.area
                    }
                  })
                }
              })
            }
          }
        })
      },
      beforeUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";
        if (!(isPNG || isJPG)) {
          this.$message.error("只允许上传jpg/png格式图片");
        }
        const isLt5M = file.size / 1024 / 1024 < 10;
        if (!isLt5M) {
          this.$message.error("图片大小不能大于10M");
        }
        this.imgLock = (isJPG || isPNG) && isLt5M
        return (isJPG || isPNG) && isLt5M;
      },
      beforeUploadper(file) {
        const isJPG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";
        if (!(isPNG || isJPG)) {
          this.$message.error("只允许上传jpg/png格式图片");
        }
        const isLt5M = file.size / 1024 / 1024 < 10;
        if (!isLt5M) {
          this.$message.error("图片大小不能大于10M");
        }
        this.imgLockper = (isJPG || isPNG) && isLt5M
        return (isJPG || isPNG) && isLt5M;
      },
      handleChanges(info) {
        if (!this.imgLock) {
          return
        }
        this.fileList = info.fileList;
        if (info.file.response && info.file.response.result) {
          this.imgSrc.push({
            id: info.file.response.result.id
          })
        }
      },
      handleChangesper(info) {
        if (!this.imgLockper) {
          return
        }
        this.fileListper = info.fileList;
        if (info.file.response && info.file.response.result) {
          this.imgSrcper.push({
            id: info.file.response.result.id
          })
        }
      },
      handlePreview(file) {
        this.imgUrl = file.url || file.thumbUrl
        this.imgVisible = true
        this.deg =0;
      },
      handlePreviewper(file) {
        this.imgUrlper = file.url || file.thumbUrl
        this.imgVisibleper = true
        this.deg01 =0;
      },
      handleImgCancel() {
        this.imgVisible = false
      },
      handleImgCancelper() {
        this.imgVisibleper = false
      },
      remove(file){
        return new Promise((resolve) => {
          var that = this
          let id = file.response ? file.response.result.id : file.uid
          this.$confirm({
            title: '确定要删除该图片么',
            onCancel() {
              return resolve(false)
            },
            onOk() {
              that.imgSrcdel.push(id);
              return resolve(true)
            }
          })
        }).then(res => {
          return res
        })
      },
      removeper(file){
        return new Promise((resolve) => {
          var that = this
          let id = file.response ? file.response.result.id : file.uid
          this.$confirm({
            title: '确定要删除该图片么',
            onCancel() {
              return resolve(false)
            },
            onOk() {
              that.imgSrcdelper.push(id);
              return resolve(true)
            }
          })
        }).then(res => {
          return res
        })
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
      changefirstres(value,option){
        this.ssxarea1res=option.componentOptions.children[0].text;
        this.city_coderes='';
        this.area_coderes='';
        this.addressres='';
        this.formss.resetFields('areaCoderes')
        this.secondmapres=[];
        this.threemapres=[];
        getSecondArea({parentCode:value}).then((res)=>{
          if(res.success){
            this.secondmapres=res.result;
          }
        })
      },
      changefirstbus(value,option){
        this.ssxarea1bus=option.componentOptions.children[0].text;
        this.city_codebus='';
        this.area_codebus='';
        this.addressbus='';
        this.formss.resetFields('areaCodebus')
        this.secondmapbus=[];
        this.threemapbus=[];
        getSecondArea({parentCode:value}).then((res)=>{
          if(res.success){
            this.secondmapbus=res.result;
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
      changescendres(value,option){
        this.ssxarea2res=option.componentOptions.children[0].text;
        this.area_coderes='';
        this.addressres='';
        this.formss.resetFields('areaCoderes')
        this.threemapres=[];
        getSecondArea({parentCode:value}).then((res)=>{
          if(res.success){
            this.threemapres=res.result;
          }
        })
      },
      changescendbus(value,option){
        this.ssxarea2bus=option.componentOptions.children[0].text;
        this.area_codebus='';
        this.addressbus='';
        this.formss.resetFields('areaCodebus')
        this.threemapbus=[];
        getSecondArea({parentCode:value}).then((res)=>{
          if(res.success){
            this.threemapbus=res.result;
          }
        })
      },
      changethree(value,option){
        this.ssxarea3=option.componentOptions.children[0].text;
      },
      changethreeres(value,option){
        this.ssxarea3res=option.componentOptions.children[0].text;
      },
      changethreebus(value,option){
        this.ssxarea3bus=option.componentOptions.children[0].text;
      },
      handleok(){
        this.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            let params = this.form.getFieldsValue();
            params.businessRegistDate = this.moment(params.businessRegistDate).format('YYYY-MM-DD')
            var address={};
            address.province=this.ssxarea1;
            address.city=this.ssxarea2;
            address.area=this.ssxarea3;
            address.provinceCode=this.province_code;
            address.cityCode=this.city_code;
            address.areaCode=this.area_code=params.areaCode;
            address.street=this.address;
            params.address = address;
            params.id = this.cominfodata.id;
            delete params.areaCode;
            if(this.imgSrcdel){
              for(let index in this.imgSrcdel){
                for(let indexs in this.imgSrc){
                  if(this.imgSrc[indexs].id == this.imgSrcdel[index]){
                    this.imgSrc.splice(indexs,1)
                  }
                }
              }
            }
            if(this.imgSrc.length!=2){
              this.$message.error('请上传营业执照证件两张');
              return;
            }
            params.pictureInfos = this.imgSrc;
            console.log(params)
            saveorupdate(params).then((res)=>{
              if(res.success){
                this.$message.success(res.message);
              }
            })
          }
        })
      },
      handleokper(){
        this.forms.validateFieldsAndScroll((err, values) => {
          if (!err) {
            let params = this.forms.getFieldsValue();
            if(this.imgSrcdelper){
              for(let index in this.imgSrcdelper){
                for(let indexs in this.imgSrcper){
                  if(this.imgSrcper[indexs].id == this.imgSrcdelper[index]){
                    this.imgSrcper.splice(indexs,1)
                  }
                }
              }
            }
            params.id = this.legalpersondata.id;
            params.pictureInfos = this.imgSrcper;
            saveorupdatelegalper(params).then((res)=>{
              if(res.success){
                this.$message.success('修改法人信息成功');
              }
            })
          }
        })
      },
      handleokbus(){
        this.formss.validateFieldsAndScroll((err, values) => {
          if (!err) {
            let params = this.formss.getFieldsValue();
            var addressbus={};
            addressbus.province=this.ssxarea1bus;
            addressbus.city=this.ssxarea2bus;
            addressbus.area=this.ssxarea3bus;
            addressbus.provinceCode=this.province_codebus;
            addressbus.cityCode=this.city_codebus;
            addressbus.areaCode=this.area_codebus=params.areaCodebus;
            addressbus.street=this.addressbus;
            params.businessAddress = addressbus;
            var addressres={};
            addressres.province=this.ssxarea1res;
            addressres.city=this.ssxarea2res;
            addressres.area=this.ssxarea3res;
            addressres.provinceCode=this.province_coderes;
            addressres.cityCode=this.city_coderes;
            addressres.areaCode=this.area_coderes=params.areaCoderes;
            addressres.street=this.addressres;
            params.registAddress = addressres;
            params.id = this.registinfodata.id;
            delete params.areaCodebus;
            delete params.areaCoderes;
            saveorupdateregistInfo(params).then((res)=>{
              if(res.success){
                this.$message.success('修改注册信息成功');
              }
            })
          }
        })
      },
      rotatesleft(){
        this.deg -= 90;
        let width = this.$refs.imgs.width;
        let height = this.$refs.imgs.height;
        document.getElementById('imgs').style.width = width + 'px'
        document.getElementById('imgs').style.height =height + 'px'
        if(this.deg==-90 || this.deg==-270 ){
          document.getElementById('imgsdiv').style.width = height + 'px'
          document.getElementById('imgsdiv').style.height = width + 'px'
        }else{
          document.getElementById('imgsdiv').style.height = height + 'px'
          document.getElementById('imgsdiv').style.width = width + 'px'
        }
        if(this.deg <= -360){
          this.deg = 0
        }
      },
      rotatesRight(){
        this.deg += 90;
        let width = this.$refs.imgs.width;
        let height = this.$refs.imgs.height;
        document.getElementById('imgs').style.width = width + 'px'
        document.getElementById('imgs').style.height = height + 'px'
        if(this.deg==90 || this.deg==270 ){
          document.getElementById('imgsdiv').style.width = height + 'px'
          document.getElementById('imgsdiv').style.height = width + 'px'
        }else{
          document.getElementById('imgsdiv').style.height = height + 'px'
          document.getElementById('imgsdiv').style.width = width + 'px'
        }
        if(this.deg >= 360){
          this.deg = 0
        }
      },
      rotatesleft01(){
        this.deg01 -= 90;
        let width = this.$refs.imgs01.width;
        let height = this.$refs.imgs01.height;
        document.getElementById('imgs01').style.width = width + 'px'
        document.getElementById('imgs01').style.height =height + 'px'
        if(this.deg01==-90 || this.deg01==-270 ){
          document.getElementById('imgsdiv01').style.width = height + 'px'
          document.getElementById('imgsdiv01').style.height = width + 'px'
        }else{
          document.getElementById('imgsdiv01').style.height = height + 'px'
          document.getElementById('imgsdiv01').style.width = width + 'px'
        }
        if(this.deg01 <= -360){
          this.deg01 = 0
        }
      },
      rotatesRight01(){
        this.deg01 += 90;
        let width = this.$refs.imgs01.width;
        let height = this.$refs.imgs01.height;
        document.getElementById('imgs01').style.width = width + 'px'
        document.getElementById('imgs01').style.height =height + 'px'
        if(this.deg01==90 || this.deg01==270 ){
          document.getElementById('imgsdiv01').style.width = height + 'px'
          document.getElementById('imgsdiv01').style.height = width + 'px'
        }else{
          document.getElementById('imgsdiv01').style.height = height + 'px'
          document.getElementById('imgsdiv01').style.width = width + 'px'
        }
        if(this.deg01 >= 360){
          this.deg01 = 0
        }
      },
    }
  }
</script>

<style lang="stylus">
  .basic
    text-align center
    .basic-span
      font-weight 600
    .basic-tops,.basic-content,.basic-bottom
      width: 100%
      border 1px solid #ebebeb
      margin 20px 0px
      padding 30px 20px
      position relative
      .form-wrapperimg
        width 45%
        display inline-block
        text-align left
        .ant-form-item-label
          width 152px
          vertical-align baseline
          display inherit
        .ant-form-item-control-wrapper
          width 93%
          display inline-block
          margin-top 10px
          margin-left 15px
      .form-wrapper
        width 25%
        display inline-block
        .ant-form-item
          width 100%
          display inline-block
          .ant-form-item-control-wrapper
            width 65%
            display inline-block
          .ant-form-item-label
            width 100px
            vertical-align top
      .formz-wrapper
        width 33%
        display inline-block
        .ant-form-item
          width 100%
          display inline-block
          .ant-form-item-control-wrapper
            width 65%
            display inline-block
          .ant-form-item-label
            width 100px
            vertical-align top
      .form-wrappersel
        width 32%
        display inline-block
        .ant-form-item
          width 100%
          display inline-block
          .ant-form-item-control-wrapper
            width 82%
            display inline-block
          .ant-form-item-label
            width 92px
            vertical-align top
      .wrpappers
        .ant-form-item-label
          width 140px !important
        .ant-form-item-control-wrapper
          width 55% !important
      .wrpapperss
        .ant-form-item
          text-align left
          padding-left 16px
          .ant-form-item-label
            width 148px !important
            text-align left !important
          .ant-form-item-control-wrapper
            width 55.5% !important
    .basic-box
      width 100%
      text-align center
      margin-top 30px
      & span
        font-weight 800
    .icon
      font-size 18px
      vertical-align middle
    .buttons
      position absolute
      width 150px
      right 20px
      bottom 10px
  .modal-imgs
    .ant-modal-content
      background transparent
      box-shadow none
      -webkit-box-shadow none
    .ant-btn-primary
      background #2c909c
      border-color #2c909c
    .ant-btn-primary:hover
      background #2a7d87
      border-color #2a7d87
</style>
