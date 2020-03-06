<template>
    <a-modal
            title="工单执行情况"
            v-model="visible"
            @ok="handleOk"
            style="top:10%;height: 90%;"
            :width='1040'
            okText="确定"
            :maskClosable="false"
            class="workorder-module">
        <div class="flex-wrapper">
            <div class="title">图片信息：</div>
            <div style="flex: 1;text-align:left" v-if="imgDatas.length > 0">
                <lookImg
                        :imgUrl='item.pictureUrl'
                        v-for="item in imgDatas"
                        :key="item.id">
                </lookImg>
            </div>
        </div>
        <div class='examine-body' v-if="materialDatas.length > 0">
            <div class="title">
                <span>物料信息</span>
            </div>
            <a-table
                    :columns="allColumnmat"
                    :dataSource="materialDatas"
                    :pagination='false'
                    rowKey="id"
                    bordered />
        </div>
        <div class='examine-body' v-if="deviceDatas.length > 0">
            <div class="title">设备信息</div>
            <a-table
                    :columns="allColumnsdev"
                    :dataSource="deviceDatas"
                    :pagination='false'
                    rowKey="id"
                    bordered />
        </div>
        <div class='examine-body' v-if="personDatas.length > 0">
            <div class="title">人员信息</div>
            <a-table
                    style="width: 100%"
                    :columns="allColumnsper"
                    :dataSource="personDatas"
                    :pagination='false'
                    rowKey="id"
                    bordered>
                <span slot="companys">
                      <span>人/天/亩</span>
                </span>
            </a-table>
        </div>
<!--        <div class="flex-wrapper">-->
<!--            <div class="title">-->
<!--                <span>语音备注：</span>-->
<!--            </div>-->
<!--            <audio v-if="visible" controls='controls' ref="audio" style="vertical-align: top; margin-right: 30px"></audio>-->
<!--        </div>-->
        <div slot="footer">
            <a-button type='primary' @click="handleOk">关闭查看</a-button>
        </div>
    </a-modal>
</template>

<script>
    import lookImg from '@/components/lookImg'
    export default {
        components:{
            lookImg
        },
        data(){
            return{
                visible:false,
                record:{},
                imgDatas: [],
                materialDatas: [],
                deviceDatas: [],
                personDatas: [],
                allColumnmat: [
                    {
                        title: '名称',
                        dataIndex: 'materialName',
                        key: 'materialName',
                        align: "center"
                    },
                    {
                        title: '单位',
                        dataIndex: 'company',
                        align: "center"
                    },
                    {
                        title: '计划单价',
                        dataIndex: 'preUnitPrice',
                        key: 'preUnitPrice',
                        align: "center"
                    },
                    {
                        title: '计划总量',
                        dataIndex: 'preUnitCount',
                        key: 'preUnitCount',
                        align: "center"
                    },
                    {
                        title: '计划费用',
                        dataIndex: 'preCal',
                        key: 'preCal',
                        align: "center"
                    },
                    {
                        title: '实际单价',
                        dataIndex: 'actUnitPrice',
                        key: 'actUnitPrice',
                        align: "center"
                    },
                    {
                        title: '实际总量',
                        dataIndex: 'actUnitCount',
                        key: 'actUnitCount',
                        align: "center"
                    },
                    {
                        title: '实际费用',
                        dataIndex: 'actCal',
                        key: 'actCal',
                        align: "center"
                    }
                ],
                allColumnsdev: [
                    {
                        title: '名称',
                        dataIndex: 'deviceName',
                        key: 'deviceName',
                        align: "center"
                    },
                    {
                        title: '单位',
                        dataIndex: 'company',
                        align: "center"
                    },
                    {
                        title: '计划单价',
                        dataIndex: 'preUnitPrice',
                        key: 'preUnitPrice',
                        align: "center"
                    },
                    {
                        title: '计划总量',
                        dataIndex: 'preUnitCount',
                        key: 'preUnitCount',
                        align: "center"
                    },
                    {
                        title: '计划费用',
                        dataIndex: 'preCal',
                        key: 'preCal',
                        align: "center"
                    },
                    {
                        title: '实际单价',
                        dataIndex: 'actUnitPrice',
                        key: 'actUnitPrice',
                        align: "center"
                    },
                    {
                        title: '实际总量',
                        dataIndex: 'actUnitCount',
                        key: 'actUnitCount',
                        align: "center"
                    },
                    {
                        title: '实际费用',
                        dataIndex: 'actCal',
                        key: 'actCal',
                        align: "center"
                    }
                ],
                allColumnsper: [
                    {
                        title: '名称',
                        dataIndex: 'personName',
                        key: 'personName',
                        align: "center"
                    },
                    {
                        title: '单位',
                        dataIndex: 'companys',
                        scopedSlots: { customRender: "companys" },
                        align: "center"
                    },
                    {
                        title: '计划单价',
                        dataIndex: 'preUnitPrice',
                        key: 'preUnitPrice',
                        align: "center"
                    },
                    {
                        title: '计划总量',
                        dataIndex: 'preUnitCount',
                        key: 'preUnitCount',
                        align: "center"
                    },
                    {
                        title: '计划费用',
                        dataIndex: 'preCal',
                        key: 'preCal',
                        align: "center"
                    },
                    {
                        title: '实际单价',
                        dataIndex: 'actUnitPrice',
                        key: 'actUnitPrice',
                        align: "center"
                    },
                    {
                        title: '实际总量',
                        dataIndex: 'actUnitCount',
                        key: 'actUnitCount',
                        align: "center"
                    },
                    {
                        title: '实际费用',
                        dataIndex: 'actCal',
                        key: 'actCal',
                        align: "center"
                    }
                ],
            }
        },
        methods:{
            open(record){
              this.visible = true;
              this.record = record.workOrder;
              this.imgDatas = this.record.pictureInfoList;
              this.materialDatas = this.record.materialActList
              this.deviceDatas = this.record.deviceActList
              this.personDatas = this.record.personnelActList
              // if (record.fileInfo && record.fileInfo !== null) {
              //   this.$nextTick(() => {
              //       this.$refs.audio.src = '/api/fileInfo/getAudio' + (!this.record.fileInfo ? '' : '?fileUrl=' + this.record.fileInfo.fileUrl)
              //   })
              // }
            },
            handleOk(){
                this.visible = false;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .workorder-module
        .ant-btn-primary
            background #2c909c
            border-color #2c909c
        .flex-wrapper
            position relative
            text-align center
            display flex
            margin-bottom 30px
            .title
                font-size 20px
                width: 150px
                margin-right: 10px
                font-weight 600
                text-align left
                &::before
                    content: " "
                    display inline-block
                    height 20px
                    width 4px
                    border-radius 2px
                    background-color #2C909C
                    margin-right 5px
                    position relative
                    top 3px
        .examine-body
            margin-bottom 30px
            .title
                font-size 20px
                width: 150px
                margin-right: 10px
                font-weight 600
                text-align left
                margin-bottom 10px
                &::before
                    content: " "
                    display inline-block
                    height 20px
                    width 4px
                    border-radius 2px
                    background-color #2C909C
                    margin-right 5px
                    position relative
                    top 3px
</style>
