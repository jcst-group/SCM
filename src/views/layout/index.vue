<template>
    <a-layout class="components-layout-demo-custom-trigger">
        <a-layout-sider style="background:#0F5D67" :trigger="null" collapsible v-model="collapsed">
            <div class="logo" :class="{'pos': collapsed}">
                <div class="chinese">
                    <a-icon class="logo-icon" type="user"/>
                    <span v-show="!collapsed">{{title}}管理平台</span>
                </div>
            </div>
            <a-menu
                style="background:#0F5D67"
                mode="inline"
                :defaultSelectedKeys="[110]"
                :defaultOpenKeys="[1]"
                :selectedKeys='selectMenu'
                @click="select">
                <a-sub-menu v-for="item in menuArr" :key="item.id">
                    <span slot="title">
                        <icon-font style="font-size: 24px;color:#fff" type="icon-jinrong"/>
                        <span class="slider-desc">{{item.name}}</span>
                    </span>
                    <a-menu-item style="padding-left: 30px" v-for='ele in item.children' :key="ele.id" @click="goRoute(ele.code)" class="menu-item">
                        <span class="slider-desc">{{ele.name}}</span>
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0;">
                <a-icon
                    class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="() => collapsed = !collapsed"
                />
                <a-button @click="logout" class="logout-button" type='primary'>
                    <a-icon :rotate='-90' type='logout'></a-icon>
                    退出
                </a-button>
                <div style="float:right;cursor: pointer;" @click="tonewpage()">
                  <span style="margin:0px 10px 0px 20px">
                    <a-badge :count="numbers" :overflowCount="999"><a-avatar shape="square" icon="message" style="background: #2c909c;"/></a-badge>
                  </span>
                </div>
                <span style="float: right;font-size: 18px">用户: <span style="font-weight: 600">{{username}}</span></span>
            </a-layout-header>
            <a-layout-content
                ref="layoutCont"
                style="margin: 10px 0; background: #fff;min-width 1240px"
            >
                <div style="min-width:1200px;padding:24px 30px">
                    <router-view @homeRoute='homeRoute'></router-view>
                </div>
            </a-layout-content>
        </a-layout>
        <a-modal
                title="退出登录"
                :visible="visible"
                @ok="handleOk"
                :confirmLoading="confirmLoading"
                @cancel="handleCancel"
        >
            <p>确定要退出登录吗？</p>
        </a-modal>
    </a-layout>
</template>

<script>
import { Icon } from 'ant-design-vue';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1492562_aagyzupw3wa.js'
});
import {userMenu,logout} from '@/api/allApi'
const menuArr = [
    {
        key: '1',
        name: '在申请检测汇总',
        route: 'application',
        type: 'icon-daichuli'
    },
    {
        key: '2',
        name: '承接的检测项目',
        route: 'start',
        type: 'icon-usertime'
    },
    {
        key: '3',
        name: '完成的检测项目',
        route: 'application',
        type: 'icon-yiwancheng'
    },
    {
        key: '4',
        name: '检测机构设置',
        route: 'application',
        type: 'icon-setting'
    }
]
export default {
    components: {
        IconFont,
    },
    data() {
        return {
            collapsed: false,
            menuArr: [],
            selectMenu: [],
            visible:false,
            confirmLoading:false,
            username:'',
            num:'',
            title:'',
        };
    },
    created() {
        userMenu().then(res => {
            console.log(res)
            if (res.success) {
                this.menuArr = res.result
            }
        })
        this.title = window.localStorage.usertitle
    },
    mounted() {
        this.$refs.layoutCont.$el.style.minHeight = window.innerHeight - 85 + 'px'
        window.onresize = () => {
            this.$refs.layoutCont.$el.style.minHeight = window.innerHeight - 85 + 'px'
        }
        this.username = window.localStorage.username
        this.$store.dispatch("user/getapplynum")
    },
    computed:{
        numbers(){
            return this.$store.state.user.applynumber
        },
    },
    methods: {
        select(option) {
            this.selectMenu = [option.key]
        },
        goRoute(route) {
            this.$router.push({path: route})
        },
        homeRoute(query) {
            this.selectMenu = [query.key]
        },
        logout() {
            this.visible = true;
        },
        tonewpage(){
            this.$router.push('/finance/messages')
        },
        handleOk(e) {
            this.confirmLoading = true;
            logout().then(res => {
                if(res.success){
                    window.localStorage.clear();
                    this.$message.success('退出成功! 将跳转至登录页面')
                    setTimeout(() => {
                        this.confirmLoading = false;
                        this.$router.push({ path: '/login' })
                    },1000)
                }
            })
        },
        handleCancel(e) {
            this.visible = false;
        },
    }
};
</script>

<style lang='stylus'>
    .components-layout-demo-custom-trigger
        .trigger
            font-size 18px
            line-height 64px
            padding 0 24px
            cursor pointer
            transition color 0.3s
            &hover
                color #1890ff
        .logo
            color #fff
            font-size 16px
            margin 16px
            position relative
        .logo-icon
            font-size 18px
            margin-right 10px
        .pos
            left 50%
            transform translateX(-50%)
        .english
            font-size 7px
        .slider-desc
            letter-spacing 1px
        .logout-button
            font-size 16px
            float right
            margin-top 18px
            margin-right: 15px
            margin-left 20px
            background #2c909c
            border-color #2c909c
        .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected
            background #059db1
            color #fff
        .ant-menu-submenu-selected, .ant-menu-submenu, .ant-menu-submenu-title:active
            background-color #0F5D67
        .ant-menu-submenu-title
            span
                color: rgba(255,255,255, 0.65)
            &:hover
                span
                    color #ffffff
            .ant-menu-submenu-arrow
                &::after, &::before
                    background rgba(255,255,255, 0.65)
        .ant-menu-submenu > .ant-menu
            background-color #0F5D67
            box-shadow 0 2px 8px rgba(0, 0, 0, 0.45) inset
        .menu-item
            color rgba(255,255,255,0.65)
        .ant-menu-item-active
            background-color transparent
            color #fff
            &::after
                border none
        .ant-menu-inline .ant-menu-item::after
            border none
        .ant-menu-inline
            border-color black
        .ant-btn-primary
            background #2c909c
            border-color #2c909c
        .ant-btn-primary:hover
            background #2a7d87
            border-color #2a7d87
</style>
