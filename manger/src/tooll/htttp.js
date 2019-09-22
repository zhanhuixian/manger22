import axios from "axios"
const http = axios.create({
  baseURL: `http://localhost:8888/api/private/v1/`
  
});
// 请求拦截
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization=window.sessionStorage.getItem("token")
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
export default http
// 获取左侧数据
export const menus=()=>{
    return http.get("menus")
}
// 获取用户数据
export const users=({query,pagenum,pagesize})=>{
    return http.get("users",{
        params:{query,pagenum,pagesize},
    })
}
// 添加用户
export const addUser=({username,password,email,mobile})=>{
    return http.post("users",{username,password,email,mobile})
}
// 修改用户状态
export const change=(uid,type)=>{
    return http.put(`users/${uid}/state/${type}`)
}
// 编辑用户提交
export const editUser=({id,email,mobile})=>{
   return http.put(`users/${id}`,{
       email,
       mobile
   })
}
// 删除用户
export const deleteUser=(id)=>{
    return http.delete("users/"+id)
}
// 获取角色列表
export const roleList=()=>{
    return http.get("roles")
}
// 分配角色
export const fenRole=(id,rid)=>{
    return http.put(`users/${id}/role`,{rid})
}