import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 全局导入基础样式
import "./assets/css/base.less"
// element相关
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 路由相关
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import login from "./components/login.vue"
import index from "./components/index.vue"
const routes=[
  {path:"/login",component:login},
  {path: '/', redirect: '/login' },
  {path:"/index",component:index}
]
const router=new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
 if(to.path.includes("index")) {
   if(window.sessionStorage.getItem("token")){
     next()
   }else{
    Vue.prototype.$message.error("请重新登录")
    router.push("/login")
 }
   
 }else{
   next()
 }
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
