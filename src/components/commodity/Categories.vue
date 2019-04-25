<template>
  <div class="categories_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button class="topButton" type="primary" @click="addClassify()" plain>添加分类</el-button>
        <el-table
            :data="tableData"
            :indent="50"
            row-key="cat_id"
            style="width: 100%">
          <el-table-column label="分类名称" prop="cat_name">
          </el-table-column>
          <el-table-column
              label="是否有效"
              prop="cat_deleted">
            <template slot-scope="scope">
              <i v-if="!scope.row.cat_deleted" class="el-icon-success"></i>
              <i v-else class="el-icon-error"></i>
            </template>
          </el-table-column>
          <el-table-column label="等级" prop="cat_level">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.cat_level===0">一级分类</el-tag>
              <el-tag v-if="scope.row.cat_level===1" type="success">二级分类</el-tag>
              <el-tag v-if="scope.row.cat_level===2" type="warning">三级分类</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button icon="el-icon-edit" round></el-button>
                <el-button icon="el-icon-delete" round></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      <!--分页按钮-->
      <div class="pagination_right">
        <el-pagination
            background
            @current-change="currentPage"
            layout="prev, pager, next"
            :page-size="getGoodsList.pagesize"
            :total="getGoodsList.total">
        </el-pagination>
      </div>
    </el-card>
    <!--添加分类对话框-->
    <el-dialog
        title="添加分类"
        :visible.sync="addDialogVisible"
        width="400px"
        >
      <el-form ref="addForm" label-width="100px" :rules="rules" :model="addFormLabelAlign">
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addFormLabelAlign.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="分类名称：">
          <el-cascader
              change-on-select
              style="width:100%"
              expand-trigger="hover"
              :options="options"
              :props="{value:'cat_id', label:'cat_name'}"
              v-model="selectedOptions"
              >
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCommodity()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import mixin from './Categories-mixin';
export default {
  mixins: [mixin]
};
</script>

<style scoped>
.pagination_right{
  margin:15px 0;
  float:right;
}
  .el-icon-success{
    color:green;
  }
  .el-icon-error{
    color:red;
  }
  .topButton{
    margin:0 0 15px;
  }
</style>
