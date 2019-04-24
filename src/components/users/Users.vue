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
            <el-input v-model="searchUsers" placeholder="请输入搜索关键字">
              <el-button @click="search()" slot="append" icon="el-icon-search"></el-button>
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
          <el-table-column prop="email" label="邮箱">
          </el-table-column>
          <el-table-column prop="mobile" label="电话">
          </el-table-column>
          <el-table-column prop="role_name" label="角色">
          </el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template slot-scope="scope">
              <el-switch
                  @change="userStatus(scope.row.id, scope.row.mg_state)"
                  v-model="scope.row.mg_state"
                  active-color="#13ce66"
                  inactive-color="#ccc">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button icon="el-icon-edit" @click="editUser(scope.row.id)" round></el-button>
                <el-button icon="el-icon-delete" @click="edlUser(scope.row.id)"></el-button>
                <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start">
                  <el-button icon="el-icon-setting" @click="allocationUser(scope.row)" round></el-button>
                </el-tooltip>
              </el-button-group>
            </template>
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
      <!--添加用户弹出的对话框-->
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="400px">
        <el-form :rules="rules" :model="addUserForm" label-width="80px" ref="addForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserForm.password" type="password" autocomplete="off"></el-input>
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
      <!--编辑用户弹出的对话框-->
      <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="400px">
        <el-form :rules="rules" :model="editUserForm" label-width="80px" ref="editForm">
          <!--编辑用户对话框，用户名字不能编辑-->
          <el-form-item label="用户名" prop="username">
            <el-input :disabled="true" v-model="editUserForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="editUserForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserFormData()">确 定</el-button>
        </span>
      </el-dialog>
      <!--分配角色的对话框-->
      <el-dialog title="提示" :visible.sync="roleDialogVisible" width="30%">
        <div class="role">
          <span>当前用户：</span>
          <span>{{getUsersRole.username}}</span>
        </div>
        <div class="role">
          <span>当前角色：</span>
          <span>{{getUsersRole.role_name}}</span>
        </div>
        <div class="role">
          <span>分配角色：</span>
          <el-select v-model="roleValue" placeholder="请选择">
            <el-option
            v-for="item in usersRole"
            :label="item.roleName"
            :value="item.id"
            :key="item.id">
            </el-option>
          </el-select>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole()">确 定</el-button>
        </div>
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
  .el-card {
    margin-top: 15px;
    background-color: #fff;
  }

  .is-plain {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
  }

  .user-pagination {
    margin: 20px 0;
    float: right;
  }

  .el-form-item {
    color: #ccc;
  }
  .role{
    margin: 10px 0;
  }
</style>
