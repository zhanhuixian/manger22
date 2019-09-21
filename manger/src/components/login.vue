<template>
  <div class="content">
    <div class="form_box">
      <el-form :label-position="labelPosition" :rules="rules" ref="ruleForm" label-width="80px">
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
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
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 11个字符", trigger: "blur" }
        ]
      }
    };
  }
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