<template>
    <a-modal
        title="信息展示"
        v-model="visible"
        style="top:10%;height: 90%"
        :width='800'
        :footer='null'
        :maskClosable="false"
        class="add-memeber">
        <a-list itemLayout="horizontal" :dataSource="message">
            <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta
                    :description="item.messageStatus.displayName"
                >
                    <span slot="title">{{item.createTime}}</span>
                </a-list-item-meta>
                <span slot="extra">{{item.commont}}</span>
            </a-list-item>
        </a-list>
    </a-modal>
</template>

<script>
    export default {
        data() {
            return {
                visible: false,
                message: []
            }
        },
        methods: {
            open(message) {
                this.visible = true
                this.message = message || []
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
