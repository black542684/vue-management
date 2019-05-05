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
      <el-steps ref="steps" align-center style="margin:15px 0;" :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!--tabs标签页-->
      <el-tabs :before-leave="tabsChange" @tab-click="tabChange" tab-position="left">
        <el-tab-pane label="基本信息">
          <!--基本信息下面的表单-->
          <el-form ref="form" :model="addForm" :rules="rule" label-width="120px" >
            <el-form-item prop="goods_name" label="商品名称：">
              <el-input v-model="addForm.goods_name" class="input-width"></el-input>
            </el-form-item>
            <el-form-item prop="goods_cat" label="所属分类：">
              <el-cascader
                  clearable
                  :props="{value: 'cat_id',label: 'cat_name'}"
                  expand-trigger="hover"
                  :options="options"
                  v-model="selectedOptions"
                  >
              </el-cascader>
            </el-form-item>
            <el-form-item prop="goods_price" label="商品价格：">
              <el-input v-model="addForm.goods_price" class="input-width"></el-input>
            </el-form-item>
            <el-form-item prop="goods_number" label="商品数量：">
              <el-input v-model="addForm.goods_number" class="input-width"></el-input>
            </el-form-item>
            <el-form-item prop="goods_weight" label="商品重量：">
              <el-input v-model="addForm.goods_weight" class="input-width"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <!--动态参数-->
          <div class="div-tag" v-for="(item,i) in manyParams" :key="i">
          <p>
            {{item.attr_name}}：
          </p>
            <el-tag color="#fff" size="normal" style="margin:5px 5px 5px 0;border:1px solid #409eff;" v-if="value" v-for="(value,i) in item.attr_vals.split(',')" :key="i">{{value}}</el-tag>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <!--静态参数-->
          <!--<div class="div-tag" v-for="(item,i) in onlyParams" :key="i">-->
          <!--  <p>-->
          <!--    {{item.attr_name}}：-->
          <!--  </p>-->
          <!--  <el-tag size="normal" style="margin:5px;" v-if="value" v-for="(value,i) in item.attr_vals.split(',')" :key="i">{{value}}</el-tag>-->
          <!--</div>-->
          <el-form label-width="180px">
            <el-form-item v-for="(item,i) in onlyParams" :key="i" :label="item.attr_name + '：'">
              <el-input style="width:250px;" :value="item.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
              action="http://localhost:8888/api/private/v1/upload/"
              list-type="picture-card"
              :headers="headers"
              :on-success="handleSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <quill-editor v-model="addForm.goods_introduce"></quill-editor>
          <el-button @click="addShop()" style="margin-top:20px;" type="primary">提交商品</el-button>
        </el-tab-pane>
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
.div-tag{
  margin:0 0 15px 15px;
}
p{
  margin-bottom:0;
}
</style>
