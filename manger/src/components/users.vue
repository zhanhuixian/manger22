<template>
  <div>
    <!--  -->
    <bread manger="用户管理" list="用户列表"></bread>
    <!-- 输入框 -->
    <el-input placeholder="请输入内容" v-model="aboutUser.query" class="ii" @input="getUserList()">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 添加按钮 -->
    <el-button type="success" plain @click="addUser()">添加用户</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="200"></el-table-column>
      <el-table-column label="用户状态" width="100">
        <!-- switch开关 -->
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="edit_user(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeUser(scope.row)"
            plain
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            @click="fenRoles(scope.row)"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="aboutUser.pagenum"
      :page-sizes="[3,5, 10, 15]"
      :page-size="aboutUser.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户弹框 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="editList" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="editList.username" autocomplete="off" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editList.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="editList.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="xiuUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色弹框 -->
    <el-dialog title="分配角色" :visible.sync="fenFormVisible">
      <el-form :model="fenList">
        <el-form-item label="当前用户" :label-width="formLabelWidth">
          <span>{{fenList.username}}</span>
        </el-form-item>
        <el-form-item label="请选择角色" :label-width="formLabelWidth">
          <el-select v-model="fenList.rid" placeholder="请选择用户角色">
            <el-option :label="item.roleName" :value="item.id" v-for="(item,index) in roleList" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fenFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="fenUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  users,
  addUser,
  change,
  editUser,
  deleteUser,
  roleList,
  fenRole
} from "../tooll/htttp.js";
export default {
  name: "users",
  data() {
    return {
      input3: "",
      tableData: [],
      aboutUser: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      total: 1,
      value: true,
      rid:0,
      // 表单
      dialogFormVisible: false,
      editFormVisible: false,
      fenFormVisible: false,
      editList: {},
      roleList:[],
      fenList: {
        username: "",
        rid:""
      },
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 11个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserList();
    this.getRoleList()
  },
  methods: {
    // 获取表格数据
    getUserList() {
      users(this.aboutUser).then(res => {
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
    },
    // 分页相关
    handleSizeChange(val) {
      this.aboutUser.pagesize = val;
      this.aboutUser.pagenum = 1;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.aboutUser.pagenum = val;
      this.getUserList();
    },
    // 添加用户按钮
    addUser() {
      this.dialogFormVisible = true;
    },
    // 确定新增用户
    newUser() {
      addUser(this.form).then(res => {
        if (res.data.meta.status == 201) {
          this.$message({
            type: "success",
            message: "新增用户成功",
            duration: 1500
          });
        } else {
          this.$message.error(res.data.meta.msg);
        }
        this.dialogFormVisible = false;
      });
    },
    // 修改用户状态
    changeState(row) {
      change(row.id, row.mg_state).then(res => {
        if (res.data.meta.status == 200) {
          this.$message({
            type: "success",
            message: "设置用户状态成功",
            duration: 1500
          });
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },
    // 编辑用户
    edit_user(edit) {
      this.editFormVisible = true;
      this.editList = edit;
    },
    xiuUser() {
      this.editFormVisible = false;
      editUser(this.editList).then(res => {
        if (res.data.meta.status == 200) {
          this.$message({
            type: "success",
            message: "修改成功",
            duration: 1500
          });
          this.getUserList();
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },
    // 删除用户
    removeUser(row) {
      deleteUser(row.id).then(res => {
        if (res.data.meta.status == 200) {
          this.$message({
            type: "success",
            message: "删除成功",
            duration: 1500
          });
          this.getUserList();
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },
    // 点击角色按钮
    fenRoles(row){
       this.fenFormVisible=true
       this.fenList.username=row.username
       var rid=0
       for(let i=0;i<this.roleList.length;i++){
         if(this.roleList[i].roleName==row.role_name){
           rid=this.roleList[i].id
           break
         }
       }
       this.fenList.rid=rid
       this.fenList.id=row.id

    },
    // 获取角色
    getRoleList(){
      roleList().then(res=>{
        this.roleList=res.data.data
      
      })
    },
    fenUser(){
      this.fenFormVisible=false
       fenRole( this.fenList.id,this.fenList.rid).then(res=>{
         if (res.data.meta.status == 200) {
          this.$message({
            type: "success",
            message: "分配角色成功",
            duration: 1500
          });
          this.getUserList();
        } else {
          this.$message.error(res.data.meta.msg);
        }
         
       })
    }
  }
};
</script>

<style lang="less" scoped>
.ii {
  width: 350px;
}
.el-form-item__content {
  margin-left: 0;
  z-index: 999;
}
</style>