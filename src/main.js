import Vue from 'vue'
import App from './App.vue'
import router from './route/route'
import store from './store/index'
// import {Button, LocaleProvider, pagination} from 'ant-design-vue'
import './assets/css/reset.css'
// Vue.component(Button.name, Button)
// Vue.component(LocaleProvider.name, LocaleProvider)
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import VueParticles from 'vue-particles'

Vue.config.productionTip = false

Vue.use(VueParticles)

Vue.use(Antd)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
