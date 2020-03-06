<template>
    <a-modal
        title="社员详情"
        v-model="visible"
        :footer='null'
        style="top:10%;height: 90%"
        :width='1000'
        :maskClosable="false"
        class="look-member">
        <div class="info-wrapper">
            <div class="info-title" style="text-align:center">
                农民编码: {{record.memberCode}}
            </div>
            <div class="info-content">
                <div class="head-content">
                    <div class="head-pic" v-if="record.headPictureInfos">
                        <span style="display: block;text-align: center;">农户照片:</span>
                        <div style="text-align:center">
                            <lookImg style="margin-top: 5px; display:inline-block" :imgUrl='record.headPictureInfos[0].pictureUrl'></lookImg>
                        </div>
                    </div>
                    <div class="head-info">
                        <div class="flex-wrapper all-margin">
                            <div>
                                <span class="label">姓名：</span>
                                <span class="desc">{{record.realName}}</span>
                            </div>
                            <div>
                                <span class="label">身份证：</span>
                                <span class="desc">{{record.identifyCode}}</span>
                            </div>
                        </div>
                        <div class="info-address all-margin">
                            <span class="label">地址：</span>
                            <span class="desc">{{record.memberAddress}}</span>
                        </div>
                        <div class="flex-wrapper all-margin">
                            <div>
                                <span class="label">联系电话：</span>
                                <span class="desc">{{record.phone}}</span>
                            </div>
                            <div>
                                <span class="label">详细地址：</span>
                                <span class="desc">{{record.address ? record.address.street : '无'}}</span>
                            </div>
                        </div>
                        <div class="flex-wrapper all-margin">
                            <div>
                                <span class="label">地块面积：</span>
                                <span class="desc">{{record.blockArea}}</span>
                            </div>
                        </div>
                        <div class="info-address all-margin">
                            <span class="label">地块位置：</span>
                            <span class="desc">{{record.blockInfo}}</span>
                        </div>
                    </div>
                </div>
                <div class="idcart-wrapper">
                    <span>身份证照片：</span>
                    <lookImg
                        :imgUrl='item.pictureUrl'
                        v-for="item in record.idPictureInfos"
                        :key="item.id">
                    </lookImg>
                </div>
                <div class="idcart-wrapper">
                    <span>入社协议：</span>
                    <lookImg
                        :imgUrl='item.pictureUrl'
                        v-for="item in record.concPictureInfos"
                        :key="item.id">
                    </lookImg>
                </div>
            </div>
        </div>
    </a-modal>
</template>

<script>
    import lookImg from '@/components/lookImg'
    export default {
        components: {
            lookImg
        },
        data() {
            return {
                visible: false,
                record: {}
            }
        },
        methods: {
            open(record) {
                this.record = record ? record: {}
                this.visible = true
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .look-member
        .info-wrapper
            padding 10px 20px
        .head-content
            display flex
            .head-pic
                width: 30%
                padding 20px
            .head-info
                flex 1
                padding 10px
                .all-margin
                    margin-bottom 10px
                .flex-wrapper
                    display flex
                    div
                        width 300px
                        height 40px
                        line-height 40px
                .label
                    display inline-block
                    width 100px
                    text-align right
                    vertical-align top
                .desc
                    width 60%
                    display inline-block
                    height 32px
                    text-align center
                    background rgba(238,238,238,1)
                    border 1px solid rgba(170,170,170,1)
                    vertical-align middle
                    line-height 30px
        .idcart-wrapper
            padding 0 20px
            display flex
            margin-bottom 20px
            span
                width: 100px
            .container
                margin-right: 10px
</style>
