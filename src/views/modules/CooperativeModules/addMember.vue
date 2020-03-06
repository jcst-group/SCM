<template>
     <a-modal
        title="添加社员"
        v-model="visible"
        @ok="handleOk"
        @cancel='handelCancel'
        style="top:10%;height: 90%"
        :width='800'
        cancelText="取消"
        okText="确定"
        :maskClosable="false"
        class="add-memeber">
        <div>
            <!-- <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                <a-checkbox @change="onCheckAllChange" :checked="checkAll">
                    选择全部
                </a-checkbox>
            </div>
            <br /> -->
            <a-checkbox-group :options="memberList" v-model="checkedList" @change="onChange" />
        </div>
    </a-modal>
</template>

<script>
    import {getMemberList} from '@/api/allApi'
    export default {
        data() {
            return {
                visible: false,
                memberList: [],
                checkAll: false,
                checkedList: []
            }
        },
        created() {
            getMemberList().then(res => {
                if (res.success) {
                    this.memberList = res.result.map(item => {
                        item.value = item.id + ''
                        item.label = item.realName
                        item.memberAddress = item.address.province + item.address.city + item.address.area
                        return item
                    })
                }
            })
        },
        methods: {
            open(data) {
                this.visible = true
                this.checkedList = []
                if (data && data.length) {
                    data.forEach(item => {
                        this.checkedList.push(item.value)
                    })
                }
            },
            onChange(checkedList) {
                this.checkAll = checkedList.length === this.memberList.length;
            },
            onCheckAllChange(e) {
                Object.assign(this, {
                    checkedList: e.target.checked ? this.memberList : [],
                    indeterminate: false,
                    checkAll: e.target.checked,
                });
            },
            handelCancel() {
                this.visible = true
            },
            handleOk() {
                let arr = []
                this.checkedList.forEach(item => {
                    for (let i = 0; i < this.memberList.length; i++) {
                        if (this.memberList[i].id + '' === item) {
                            arr.push(this.memberList[i])
                        }
                    }
                })
                this.$emit('checkMember', arr)
                this.visible = false
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>