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
          <el-select placeholder="请选择" style="width:300px;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-tabs>
          <el-tab-pane label="动态参数" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="静态参数" name="second">配置管理</el-tab-pane>
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
</style>
