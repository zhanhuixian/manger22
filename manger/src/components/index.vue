<template>
    <el-container class="myindex">
        <!-- 头部 -->
      <el-header>
          <img src="../assets/img/logo.jpg" alt="">
          <h1>优购后台管理系统</h1>
          <a href="javascript:void(0)"  @click="logout()">退出</a>
      </el-header>
      <el-container>
          <!-- 侧边栏 -->
    <el-aside style="width: 200px">
    <el-col  >  
        <el-menu class="el-menu-vertical-demo"  unique-opened router>
      <el-submenu :index='""+index' v-for="(item,index) in leftList" :key="index">
        <template slot="title">
          <i class="el-icon-location myi" ></i>
          <span class="myspan">{{item.authName}}</span>
        </template>
         <el-menu-item :index="subitem.path" v-for="(subitem,subindex) in item.children" :key="subindex"><i class="el-icon-menu"></i>
        {{subitem.authName}}</el-menu-item>
      </el-menu-item>
      </el-submenu>
      </el-menu>
        </el-col>
        </el-aside>
        <!-- 中间部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import {menus} from "../tooll/htttp.js"
export default {
    name:"index",
    data() {
        return {
            leftList:[]
            
        }
    },
    created(){
        menus().then(res=>{
            this.leftList=res.data.data
            
        })

    },
    methods: {
        logout() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!',
            duration:1500

          });
          window.sessionStorage.removeItem("token")
          this.$router.push("/login")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出',
            duration:1500
          });          
        });
      }
    },
};
</script>

<style lang="less" scoped >
.myindex{
    height: 100%;
    .el-header {
    background-color: #b3c0d1;
    color: #fff;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
        height: 60px;
    }
    a{
        color:orange;
        font-size: 16px

    }
  }
  
  .el-aside {
    background-color: #fff;
    color: #333;
    line-height: 200px;
    text-align: center;
  }
  
  .el-main {
    background-color: #e9eef3;
    color: #333;
  }
  .myi{
      margin-left:-50px;
  }
  .myspan{
      margin-left: 10px;
  }

}

  

</style>