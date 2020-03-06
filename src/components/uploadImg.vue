<template>
    <div
        class="upload-img-wrapper">
        <a-upload
            name="file"
            listType="picture-card"
            :multiple='true'
            :action="imgurl"
            :beforeUpload="beforeUpload"
            :headers="headers"
            :fileList='fileList'
            @change="handleIndentChange"
            @preview="handlePreview"
            :remove='removePic'
            :data='record'
            :disabled="disabled"
        >
            <div v-if="fileList.length < this.maxLength">
                <a-icon type="plus" style="font-size:20px"  />
                <div class="ant-upload-text">Upload</div>
            </div>
        </a-upload>
        <a-modal :maskClosable='true' :closable="false" class="modal-imgs"  :visible="picVisible" :footer="null" @cancel="handelCancel" :destroyOnClose="true">
            <div id="imgsdiv" style="display: flex;justify-content: center;align-items: center;margin: 0 auto" :style="{transform:'rotateZ('+deg+'deg)'}"><img ref="imgs" id="imgs" alt="example" style="width: 100%" :src="picImage" /></div>
            <div style="margin-top: 15px;height: 30px"><a-button icon='redo' @click="rotatesRight()" type='primary' style="float: right">向右旋转</a-button><a-button icon='undo' @click="rotatesleft()" type='primary' style="margin-right: 10px;float: right;">向左旋转</a-button></div>
        </a-modal>
    </div>
</template>

<script>
    const imgshowapi = "/api/pictureInfo/show/"
    import {deletepictureInfo} from '@/api/allApi'
    export default {
        props: {
            picList: {
                type: Array,
                default() {
                    return []
                }
            },
            maxLength: {
                type: Number,
                default() {
                    return 4
                }
            },
            imgurl:{
                type: String
            },
            disabled:{
                type: Boolean,
                default() {
                    return false
                }
            },
            record: {
                type: Object,
                default() {
                    return {}
                }
            },
            useDelete: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                fileList: [],
                fileId: [],
                imgLock: true,
                picVisible: false,
                picImage: '',
                imglist:[],
                deg:0,
            }
        },
        created() {
            this.headers = { "X-Access-Token": window.localStorage.token };
            if (this.picList.length) {
                this.picList.forEach(item => {
                    this.fileList.push({
                        uid: item.id,
                        name: item.pictureUrl,
                        status:'done',
                        url: imgshowapi + item.pictureUrl
                    })
                    this.fileId.push({
                        id: item.id
                    })
                })
            }
        },
        watch: {
            imglist(val) {
                this.fileList = [];
                this.fileId = [];
                if (val.length) {
                    val.forEach(item => {
                        this.fileList.push({
                            uid: item.id,
                            name: item.pictureUrl,
                            status:'done',
                            url: imgshowapi + item.pictureUrl
                        })
                        this.fileId.push({
                            id: item.id
                        })
                    })
                }
            }
        },
        methods: {
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
            handleIndentChange(info) {
                if (!this.imgLock) {
                    return
                }
                this.fileList = info.fileList
                if (info.file.status === 'done' && info.file.response && info.file.response.result) {
                    this.$message.success(info.file.response.message)
                    this.fileId.push({
                        id: info.file.response.result.id
                    })
                }
            },
            handlePreview(file) {
                this.picVisible = true
                this.picImage = file.url || file.thumbUrl
                this.deg =0;
            },
            removePic(file) {
                return new Promise((resolve) => {
                    var that = this
                    this.$confirm({
                        title: '确定要删除该图片么',
                        onCancel() {
                            return resolve(false)
                        },
                        onOk() {
                            if (that.useDelete) {
                                return deletepictureInfo({
                                    id: file.response ? file.response.result.id : file.uid
                                }).then(res => {
                                    that.$message.info(res.message)
                                    let delId = file.response ? file.response.result.id : file.uid
                                    that.fileList = that.fileList.filter(item => {
                                        let id = item.response ? item.response.result.id : item.uid
                                        return id !== delId
                                    })
                                    return resolve(true)
                                })
                            }
                            that.$message.info('删除图片成功')
                            let id = file.response ? file.response.result.id : file.uid
                            let index = that.fileId.findIndex(item => {
                                return item.id === id
                            })
                            that.fileId.splice(index,1)
                            return resolve(true)
                        }
                    })
                }).then(res => {
                    return res
                })
            },
            handelCancel() {
                this.picVisible = false
            },
            rotatesleft(){
                this.deg -= 90;
                let width = this.$refs.imgs.width;
                let height = this.$refs.imgs.height;
                console.log(width);
                console.log(height);
                document.getElementById('imgs').style.width = width + 'px'
                document.getElementById('imgs').style.height = height + 'px'
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
            }
        }
    }
</script>

<style lang="stylus">
    .upload-img-wrapper
        overflow hidden
        display flex
        position relative
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
