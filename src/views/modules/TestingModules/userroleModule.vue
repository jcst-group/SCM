<template>
    <div>
        <a-modal
                title="角色分配"
                :visible="visible"
                @ok="handleOk"
                @cancel="handleCancel"
                :maskClosable="false"
        >
            <a-checkbox-group :options="Options" v-model="value"/>
        </a-modal>
    </div>
</template>
<script>
    import { roleall, addRoleToUser } from "@/api/allApi";
    export default {
        data() {
            return {
                visible: false,
                id: "",
                Options: [],
                value: []
            };
        },
        methods: {
            handleOk() {
                let par = {};
                par.id = this.id;
                par.financeRoles = [];
                for (let i = 0; i < this.value.length; i++) {
                    let a = {};
                    a.id = this.value[i];
                    par.financeRoles.push(a);
                }
                addRoleToUser(par).then(res => {
                    this.value = []
                    if (res.success) {
                        this.$message.info(res.result);
                        this.$parent._loadData();
                        this.visible = false;
                    }
                });
            },
            handleCancel() {
                this.visible = false;
                this.value = []
            },
            add(record) {
                this.id = record.id;
                roleall().then(res => {
                    if (res.success) {
                        this.Options = [];
                        for (let i = 0; i < res.result.length; i++) {
                            let a = {};
                            a.label = res.result[i].name;
                            a.value = String(res.result[i].id);
                            this.Options.push(a);
                        }
                        if (record.financeRoles && record.financeRoles.length > 0) {
                            for (let i = 0; i < record.financeRoles.length; i++) {
                                this.value.push(String(record.financeRoles[i].id))
                            }
                        }
                    }
                });
                this.visible = true;
            }
        }
    };
</script>
<style scoped>

</style>

