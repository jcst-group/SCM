<template>
    <div>
        <a-modal
                title="关联基地"
                :visible="visible"
                @ok="handleOk"
                @cancel="handleCancel"
                :maskClosable="false"
        >
            <a-form
                    :form="form">
                <a-form-item label='关联基地选择'>
                    <a-select
                            mode='multiple'
                            v-decorator="['baseid' ,{
                            initialValue:record.baseIds,
                            rules: [{required: true, message: '请选择关联基地'}]
                        }]">
                        <a-select-option
                                v-for="item in baseData"
                                :key="item.id"
                                :value='item.id'>
                            {{item.baseName}}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
    import { financebaseall,basebind } from "@/api/allApi"
    export default {
        data() {
            return {
                visible: false,
                id: "",
                form: this.$form.createForm(this),
                baseData:[],
                baseid:'',
                record:{},
            };
        },
        methods: {
            handleOk() {
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        const params = this.form.getFieldsValue()
                        let baseids = [...params.baseid]
                        for (let i = 0; i < baseids.length; i++) {
                            var index = baseids[i]
                            baseids[i] = {
                                id: index
                            }
                        }
                        delete params.baseid
                        params.bases = baseids
                        params.id = this.id;
                        basebind(params).then((res) =>{
                            if(res.success){
                                this.$parent._loadData();
                                this.$message.success(res.result);
                                this.visible = false;
                            }
                        })
                    }
                })
            },
            handleCancel() {
                this.visible = false;
                this.value = []
            },
            add(record) {
                this.form.resetFields()
                this.record= record;
                this.id = record.id;
                financebaseall().then(res => {
                    if(res.success){
                        this.baseData = res.result;
                    }
                });
                if (record !== undefined) {
                    let baseIds = []
                    this.record = record
                    this.record.bases.forEach(item => {
                        baseIds.push(item.id)
                    })
                    this.record.baseIds = baseIds
                } else {
                    this.record = {}
                }
                this.visible = true;
            }
        }
    };
</script>
<style scoped>
</style>

