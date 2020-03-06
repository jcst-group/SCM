<template>
    <div class="tab-wrapper">
        <a-tabs
            class="tab-wrapper"
            @change="callback"
            :activeKey='activeKey'
            type="card">
            <a-tab-pane tab="基础信息" key="1">
                <div class="basic-info">
                    <div class="grid-wrapper">
                        <div>
                            <span class="label">专合社名称：</span>
                            <span class="desc">111</span>
                        </div>
                        <div>
                            <span class="label">专合社地址：</span>
                            <span class="desc"></span>
                        </div>
                        <div>
                            <span class="label">法人代表名称：</span>
                            <span class="desc"></span>
                        </div>
                        <div>
                            <span class="label">联系电话：</span>
                            <span class="desc"></span>
                        </div>
                        <div>
                            <span class="label">联系人：</span>
                            <span class="desc"></span>
                        </div>
                        <div>
                            <span class="label">地块面积(亩)：</span>
                            <span class="desc"></span>
                        </div>
                        <div>
                            <span class="label">主营产品：</span>
                            <span class="desc"></span>
                        </div>
                        <div>
                            <span class="label">银行网点：</span>
                            <span class="desc"></span>
                        </div>
                        <div>
                            <span class="label">营业执照注册号：</span>
                            <span class="desc"></span>
                        </div>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane tab="附加材料" key="2">
                <div class="img-info">
                    <lookImg :imgUrl="require('../assets/img/ddwb01.png')"></lookImg>
                </div>
            </a-tab-pane>
            <a-tab-pane tab="担保情况" key="3">
                <div class="guarantee-info">
                    <div class="flex-wrapper">
                        <div>
                            <span class="label">担保情况：</span>
                            <span class="desc">有</span>
                        </div>
                        <div>
                            <span class="label">担保公司：</span>
                            <span class="desc"></span>
                        </div>
                        <div>
                            <span class="label">担保公司联系人：</span>
                            <span class="desc"></span>
                        </div>
                        <div>
                            <span class="label">担保公司联系电话：</span>
                            <span class="desc"></span>
                        </div>
                    </div>
                    <div class="guarantee-wrapper">
                        <div class="warranty">
                            <span>拟保函：</span>
                            <lookImg :imgUrl="require('../assets/img/ddwb01.png')"></lookImg>
                        </div>
                        <div class="warranty1">
                            <span>担保函：</span>
                            <lookImg :imgUrl="require('../assets/img/ddwb01.png')"></lookImg>
                        </div>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane tab="审核审批材料" key="4">
                <div class="examine-info">
                    444
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import lookImg from './lookImg'
    export default {
        components:{
            lookImg
        },
        data() {
            return {
                activeKey: '1'
            }
        },
        methods: {
            callback(key) {
                this.activeKey = key
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .tab-wrapper
        margin-bottom 20px
        .basic-info
            padding 10px 20px
            .grid-wrapper
                display grid
                grid-template-columns: repeat(3, 33.33%);
                grid-template-rows: repeat(3, 33.33%);
                color #000
                height 200px
        .flex-wrapper
            width 100%
            display flex
            flex-wrap wrap
            margin-bottom 20px
            div
                width 400px
        .guarantee-wrapper
            display flex
            width 80%
            margin 0 auto
            & > div
                flex 1
                display flex
        .flex-wrapper,.grid-wrapper
            div
                height 40px
                line-height 40px
                .label
                    display inline-block
                    width 40%
                    text-align right
                    vertical-align top
                .desc
                    width 59%
                    display inline-block
                    height 80%
                    text-align center
                    background rgba(238,238,238,1)
                    border 1px solid rgba(170,170,170,1)
                    vertical-align middle
                    line-height 30px
</style>