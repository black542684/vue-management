<template>
  <div class="params_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
          title="注意：第三级分类才可设置参数。"
          type="warning"
          show-icon>
      </el-alert>
      <el-form>
        <el-form-item label="选择商品分类：">
          <el-cascader
              clearable
              :props="{value:'cat_id', label:'cat_name'}"
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange()">
          </el-cascader>
        </el-form-item>
        <el-tabs @tab-click="switchover()" v-model="activeName">
          <el-tab-pane label="动态参数" name="many">
            <el-button type="success" @click="addMany()" :disabled="disabled">添加动态参数</el-button>
            <!--添加动态参数下面的表单-->
            <el-table
                :data="manyTableData"
                style="width: 100%">
              <el-table-column width="100" type="expand">
                <template slot-scope="scope">
                  <el-tag @close="delTag(scope.row,i)" size="normal" v-for="(item,i) in scope.row.attr_vals" :key="i" closable>
                    {{item}}
                  </el-tag>
                  <el-tag
                      :disable-transitions="true"
                      v-show="!scope.row.showTag"
                      @click="showInput(scope.row)"
                      size="normal"
                      style="width: 100px;">+添加tag</el-tag>
                  <el-input
                      :ref="'Input'+ scope.row.attr_id"
                      @blur="hiddenInput(scope.row)"
                      @keyup.native.enter="hiddenInput(scope.row)"
                      v-show="scope.row.showTag"
                      v-model="inputData"
                      style="width: 100px;margin:5px;"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                  label="属性名称"
                  prop="attr_name">
              </el-table-column>
              <el-table-column width="200" label="操作" prop="name">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button icon="el-icon-edit" @click="showEditParams(scope.row)" round></el-button>
                    <el-button icon="el-icon-delete" @click="delParams(scope.row)" round></el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="only">
            <el-button type="success" @click="addOnly()" :disabled="disabled">添加静态参数</el-button>
            <!--静态参数的表格-->
            <el-table
                :data="onlyTableData"
                style="width: 100%">
              <el-table-column
                  type="index"
                  width="100">
              </el-table-column>
              <el-table-column
                  prop="attr_name"
                  label="属性名称">
              </el-table-column>
              <el-table-column
                  label="属性值">
                <template slot-scope="scope">
                  <el-tag size="normal"
                          style="width:200px;"
                          @click="showOnly(scope.row)"
                          v-show="!scope.row.showTag"
                          :disable-transitions="true"
                  >
                    {{scope.row.attr_vals}}
                  </el-tag>
                  <el-input
                      @blur="hiddenOnlyInput(scope.row)"
                      :ref="'onlyInput'+scope.row.attr_id"
                      style="width:200px;margin:5px;"
                      v-model="onlyInputData"
                      v-show="scope.row.showTag"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column width="200" label="操作">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button icon="el-icon-edit" @click="showEditParams(scope.row)" round></el-button>
                    <el-button icon="el-icon-delete" @click="delParams(scope.row)" round></el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!--添加动态参数/静态参数对话框-->
    <el-dialog
        :title="activeName==='many'?'添加动态参数':'添加静态参数'"
        :visible.sync="addDialogVisible"
        width="30%"
        >
      <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px">
        <el-form-item prop="attr_name" label="参数名称：">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addParams()">确 定</el-button>
  </span>
    </el-dialog>
    <!--编辑静态/动态参数对话框-->
    <el-dialog
        :title="activeName==='many'?'修改动态参数':'修改静态参数'"
        :visible.sync="editDialogVisible"
        width="30%"
    >
      <el-form ref="editForm" :rules="rules" :model="editForm" label-width="100px">
        <el-form-item prop="attr_name" label="参数名称：">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editParams()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import mixin from './Params-mixin';
export default {
  mixins: [mixin]
};
</script>

<style scoped>
.el-form{
  margin:15px 0 0;
}
.el-tag{
  margin:5px;
}
</style>
