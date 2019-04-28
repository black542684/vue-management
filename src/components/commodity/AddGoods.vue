<template>
  <div class="addGoods_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
          center
          title="请按照步骤录入商品信息"
          type="info"
          show-icon>
      </el-alert>
      <!--步骤条 -->
      <el-steps align-center="true" style="margin:15px 0;" :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!--tabs标签页-->
      <el-tabs tab-position="left" style="height: 200px;">
        <el-tab-pane label="基本信息">
          <!--基本信息下面的表单-->
          <el-form label-width="120px" >
            <el-form-item label="商品名称：">
              <el-input class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="所属分类：">
              <el-select class="input-width" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品价格：">
              <el-input class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="商品数量：">
              <el-input class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="商品重量：">
              <el-input class="input-width"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import mixin from './AddGoods-mixin';
export default {
  mixins: [mixin]
};
</script>

<style scoped>
.input-width{
  width:200px;
  float:left;
}
.label{
  margin-bottom: 18px;
}
</style>
