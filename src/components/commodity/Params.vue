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
              :props="{value:'cat_id', label:'cat_name'}"
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange()">
          </el-cascader>
        </el-form-item>
        <el-tabs @tab-click="switchover()" v-model="activeName">
          <el-tab-pane label="动态参数" name="many">
            <el-button type="success" disabled>添加动态参数</el-button>
            <!--添加动态参数下面的表单-->
            <el-table
                :data="manyTableData"
                style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-tag size="normal" v-for="(item,i) in scope.row.attr_vals" :key="i" closable>
                      {{item}}
                    </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  label="属性名称"
                  prop="attr_name">
              </el-table-column>
              <el-table-column width="200" label="操作" prop="name">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button icon="el-icon-edit" round></el-button>
                    <el-button icon="el-icon-delete" round></el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="only ">
            <el-button type="success" disabled>添加静态参数</el-button>
            <!--静态参数的表格-->
            <el-table
                :data="onlyTableData"
                style="width: 100%">
              <el-table-column
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  label="属性名称"
                  width="120">
              </el-table-column>
              <el-table-column
                  label="属性值"
                  width="120">
              </el-table-column>
              <el-table-column width="50" label="操作">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button icon="el-icon-edit" round></el-button>
                    <el-button icon="el-icon-delete" round></el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
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
