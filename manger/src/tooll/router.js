// 路由相关
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import login from "../components/login.vue"
import index from "../components/index.vue"
import users from "../components/users.vue"
import roles from "../components/roles.vue"
import rights from "../components/rights.vue"
import params from "../components/params.vue"
import reports from "../components/reports.vue"
import categories from "../components/categories.vue"
import orders from "../components/orders.vue"
import goods from "../components/goods.vue"
const routes = [
  { path: "/login", component: login },
  { path: '/', redirect: '/login' },
  {
    path: "/index", component: index,
    children: [
      {
      path: "/users", component: users}, 
      { path: "/roles", component: roles },
    { path: "/rights", component: rights },
    { path: "/params", component: params },
    { path: "/reports", component: reports },
    { path: "/orders", component: orders },
    { path: "/categories", component: categories },
    {path:"/goods",component:goods}]
  }
]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path.includes("index")) {
    if (window.sessionStorage.getItem("token")) {
      next()
    } else {
      Vue.prototype.$message.error("请重新登录")
      router.push("/login")
    }

  } else {
    next()
  }
})
export default router