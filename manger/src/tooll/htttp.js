import axios from "axios"
const http = axios.create({
  baseURL: `http://localhost:8888/api/private/v1/`
  
});

export default http

export const menus=()=>{
    return http.get("menus",{
        headers:{
            Authorization:window.sessionStorage.getItem("token")
        }
    })
}