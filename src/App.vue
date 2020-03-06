<template>
  <a-locale-provider :locale="zh_CN" id="app">
    <router-view></router-view>
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
export default {
  data() {
    return {
      zh_CN,
    };
  },
};
</script>

<style lang="stylus">
  .ant-layout-content
    overflow auto
  .ant-table-bordered .ant-table-thead > tr > th
    white-space nowrap !important
</style>
