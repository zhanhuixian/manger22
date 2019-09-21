<template>
  <div class="content">
    <div class="form_box">
      <el-form :label-position="labelPosition" :rules="rules" ref="ruleForm" label-width="80px" :model="ruleForm">
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" style="width:100%" @click="toIndex('ruleForm')" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import http from "../tooll/htttp.js"
export default {
name:"login",
  data() {
    return {
      labelPosition: "top",
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 11个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
      toIndex(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          http.post("login",this.ruleForm)
          .then(res=>{
              if(res.data.meta.status==200){
                  this.$message({
                      type:"success",
                      message:"登录成功",
                      duration:1500
                  })
                window.sessionStorage.setItem("token",res.data.data.token)
                  this.$router.push("/index")
               
              }else{
                  this.$message.error(res.data.meta.msg)
              }
              
          })
         
        }else{
            
            return false;
        }
        
        });
      }
     
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  .form_box {
    width: 580px;
    height: 437px;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 46px;
    h2 {
      margin-bottom: 24px;
    }
  }
}
</style>