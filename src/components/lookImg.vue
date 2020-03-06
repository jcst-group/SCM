<template>
    <div class="container">
        <div class="img-wrapper">
            <img width="100%" height="100%" :src="'/api/pictureInfo/show/' + imgUrl">
            <div class="img-mask">
                <a-icon type="eye" @click="openImage()"/>
            </div>
        </div>
        <a-modal
            :maskClosable='true'
            :visible="imgModal"
            :footer="null"
            @cancel='handleImgCancel'
            :destroyOnClose="true"
            class="modal-imgs"
            :closable="false"
            style="text-align:center">
            <div id="imgsdiv" style="display: flex;justify-content: center;align-items: center;margin: 0 auto" :style="{transform:'rotateZ('+deg+'deg)'}"><img ref="imgs" id="imgs" :src="imgUrl ? '/api/pictureInfo/show/' + imgUrl : ''" width="100%"></div>
            <div style="margin-top: 15px;height: 30px"><a-button icon='redo' @click="rotatesRight()" type='primary' style="float: right">向右旋转</a-button><a-button icon='undo' @click="rotatesleft()" type='primary' style="margin-right: 10px;float: right;">向左旋转</a-button></div>
        </a-modal>
    </div>
</template>

<script>
    export default {
        props: {
            imgUrl: {
                type: String,
                default: '',
            }
        },
        data() {
            return {
                imgModal: false,
                deg:0,
            }
        },
        methods: {
            openImage() {
                this.imgModal = true
                this.deg =0;
            },
            handleImgCancel() {
                this.imgModal = false
            },
            rotatesleft(){
                this.deg -= 90;
                let width = this.$refs.imgs.width;
                let height = this.$refs.imgs.height;
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
    .container
        .img-wrapper
            position relative
            width 100px
            height 100px
            .img-mask
                position absolute
                top 0
                right 0
                left 0
                bottom 0
                background-color rgba(0, 0, 0, 0.5)
                opacity 0
                z-index 99
                transition all 0.3s
                i
                    font-size 30px
                    color rgba(255, 255, 255, 0.85)
                    transform translate(-50%, -50%)
                    position absolute
                    top 50%
                    left 50%
            &:hover
                .img-mask
                    opacity 1
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
