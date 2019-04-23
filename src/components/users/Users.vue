<template>
  <div class="user-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 页面主体区域 -->
    <el-card>
    <!--搜索框和按钮-->
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入搜索关键字">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" @click="addUser()" class="is-plain">添加用户</el-button>
        </el-col>
      </el-row>
    <!--表单区域-->
      <template>
        <el-table
            :data="tableData"
            stripe
            style="width:100%">
          <el-table-column prop="username" label="姓名">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" >
          </el-table-column>
          <el-table-column prop="mobile" label="电话" >
          </el-table-column>
          <el-table-column prop="role_name" label="角色" >
          </el-table-column>
          <el-table-column prop="mg_state" label="状态" >
            <template slot-scope="scope">
              <el-switch
                  v-model="scope.row.mg_state"
                  active-color="#13ce66"
                  inactive-color="#ccc">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <el-button-group>
              <el-button icon="el-icon-edit" round></el-button>
              <el-button icon="el-icon-delete"></el-button>
              <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start">
              <el-button icon="el-icon-setting" round></el-button>
              </el-tooltip>
            </el-button-group>
          </el-table-column>
        </el-table>
      </template>
    <!--分页按钮-->
      <el-pagination
          @current-change="gainPage"
          class="user-pagination"
          background
          layout="prev, pager, next"
          :page-size="userForm.pagesize"
          :current-page="userForm.pagenum"
          :total="total">
      </el-pagination>
    <!--弹出的对话框-->
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="400px">
        <el-form :rules="rules" :model="addUserForm" label-width="80px" ref="form">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUserFormData('form')">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import mixin from './users-mixin';
export default {
  mixins: [mixin]
};
</script>

<style scoped>
.el-card{
  margin-top:15px;
  background-color: #fff;
}
.is-plain {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
  .user-pagination{
    margin:20px 0;
    float: right;
  }
  .el-form-item{
    color:#ccc;
  }
</style>
