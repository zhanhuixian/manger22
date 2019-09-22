<template>
<div>
  <!-- 面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{manger}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{list}}</el-breadcrumb-item>
  </el-breadcrumb>
  
  </div>
</template>

<script>
export default {
  props: ["manger", "list"]
};
</script>

<style lang="less" scoped>
    .bread{
      height: 50px;
      background-color: #d3dce6;
      margin-top: -20px;
      line-height: 50px;
      padding-left: 20px;
    }
    
</style>