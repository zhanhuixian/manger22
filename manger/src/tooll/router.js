// 路由相关
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import login from "../components/login.vue"
import index from "../components/index.vue"
import users from "../components/users.vue"
const routes=[
  {path:"/login",component:login},
  {path: '/', redirect: '/login' },
  {path:"/index",component:index,
  children:[{
      path:"/users",component:users
  }]
}
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
 export default router