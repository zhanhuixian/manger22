import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 全局导入基础样式
import "./assets/css/base.less"
// element相关
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 路由
import router from "./tooll/router.js"
// 全局导入组件
import bread from "./tooll/bread.vue"
Vue.component("bread",bread)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
