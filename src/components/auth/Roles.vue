<template>
  <div class="rights-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    页面主体区域-->
    <el-card>
      <el-row>
        <el-button type="primary" @click="addRoleFormVisible = true" plain>添加角色</el-button>
      </el-row>
      <el-table
          :data="tableData"
          style="width: 100%">
        <!--详细权限栏目-->
        <el-table-column width="100" type="expand">
          <template slot-scope="scope">
            <!--一级权限-->
            <el-row
                style="border-bottom:1px solid #eee"
                v-for="(firstItem,i) in scope.row.child"
                :style="i==0?'border-top:1px solid #eee':'none'"
                :gutter="20"
                :key="firstItem.id">
              <el-col :span="4">
                <el-tag @close="delRight(scope.row.id, firstItem.id, scope.row)" closable>{{firstItem.authName}}</el-tag>
              </el-col>
              <el-col :span="20">
                <el-row
                    v-for="(middleItem,index) in firstItem.child"
                    :key="middleItem.id"
                    :style="index !== 0 ? 'border-top:1px solid #eee' : 'none'">
                  <el-col :span="8">
                    <el-tag @close="delRight(scope.row.id, middleItem.id, scope.row)" closable type="success">{{middleItem.authName}}</el-tag></el-col>
                  <el-col :span="16">
              <!--三级权限-->
                    <el-tag @close="delRight(scope.row.id, lastItem.id, scope.row)" closable v-for="lastItem in middleItem.child" type="warning" :key="lastItem.id">
                      {{lastItem.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
            type="index"
            width="180">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
            prop="roleDesc"
            label="角色描述">
        </el-table-column>
        <el-table-column prop="path" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit" @click="editRole(scope.row.id)" round></el-button>
              <el-button icon="el-icon-delete" @click="delRole(scope.row.id)"></el-button>
              <el-button icon="el-icon-setting" @click="allotRole()" round></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--添加角色对话框-->
    <el-dialog width="400px" title="添加角色" :visible.sync="addRoleFormVisible">
      <el-form ref="addRoleRules" :rules="rules" :model="addRoleForm">
        <el-form-item prop="roleName" label-width="100px" label="角色名称：">
          <el-input v-model="addRoleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="roleDesc" label-width="100px" label="角色描述：">
          <el-input v-model="addRoleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑角色对话框-->
    <el-dialog width="400px" title="编辑角色" :visible.sync="editRoleFormVisible">
      <el-form ref="editRoleRules" :rules="rules" :model="editRoleForm">
        <el-form-item prop="roleName" label-width="100px" label="角色名称：">
          <el-input v-model="editRoleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="roleDesc" label-width="100px" label="角色描述：">
          <el-input v-model="editRoleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!--分配权限对话框-->
    <el-dialog width="400px" title="分配权限" :visible.sync="allotRoleFormVisible">
      <el-tree
          :data="allotRoleData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps">
      </el-tree>
    </el-dialog>
  </div>
</template>

<script>
import mixin from './Roles.mixin';
export default {
  mixins: [mixin]
};
</script>

<style scoped>
.el-table{
  margin-top:10px;
}
.el-row{
  display:flex;
  align-items: center;
}
.el-tag{
  margin:10px 5px;
}
</style>
