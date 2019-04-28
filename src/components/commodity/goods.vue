<template>
  <div class="goods_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--搜索框和按钮-->
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入搜索关键字" v-model="searchGoods">
              <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="18">
          <router-link :to="{path:'/goods/add'}">
            <el-button type="primary" class="is-plain">添加商品</el-button>
          </router-link>
        </el-col>
      </el-row>
      <!--表单区域-->
      <template>
        <el-table
            :data="goodsData"
            stripe
            style="width:100%">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column width="600" prop="goods_name" label="商品名称">
          </el-table-column>
          <el-table-column prop="goods_price" label="价格">
          </el-table-column>
          <el-table-column prop="goods_weight" label="重量">
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              {{scope.row.add_time | formatTime}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button icon="el-icon-edit" round></el-button>
                <el-button icon="el-icon-delete" @click="delGoods(scope.row)" round></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!--分页按钮-->
      <div class="pagination">
        <el-pagination
            @current-change="gainPage"
            class="user-pagination"
            background
            layout="prev, pager, next"
            :page-size="goodsList.pagesize"
            :current-page="goodsList.pagenum"
            :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import mixin from './Goods-mixin';
export default {
  mixins: [mixin]
};
</script>

<style scoped>
.pagination{
  float:right;
  margin:15px;
}
</style>
