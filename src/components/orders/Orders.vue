<template>
  <div class="user-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
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
      </el-row>
      <!--表单区域-->
      <template>
        <el-table
            :data="tableData"
            stripe
            style="width:100%">
          <el-table-column
              type="index"
              width="50">
          </el-table-column>
          <el-table-column prop="order_number" label="订单编号">
          </el-table-column>
          <el-table-column prop="order_price" label="订单金额">
          </el-table-column>
          <el-table-column label="是否付款">
            <template slot-scope="scope">
              {{scope.row.pay_status === '0'?'未付款':'已付款'}}
            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货">
          </el-table-column>
          <el-table-column prop="create_time" label="下单时间">
            <template slot-scope="scope">
              {{scope.row.create_time | formatTime}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button icon="el-icon-edit" @click="editUser()" round></el-button>
                <el-button icon="el-icon-location" @click="timeDialogVisible = true" round></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!--分页按钮-->
      <div class="clearfix" style="padding-top:15px;">
        <el-pagination
            style="float: right;"
            @current-change="gainPage"
            class="user-pagination"
            background
            layout="prev, pager, next"
            :page-size="userForm.pagesize"
            :current-page="userForm.pagenum"
            :total="total">
        </el-pagination>
      </div>
      <!--收货地址-->
      <el-dialog title="收货地址" :visible.sync="dialogVisible" width="500px">
        <el-form :model="addUserForm" label-width="80px">
          <el-form-item label="省市区">
            <el-cascader
                expand-trigger="hover"
                :options="options"
                >
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button @click="dialogVisible = false" type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <!--时间线-->
      <el-dialog title="物流查询" :visible.sync="timeDialogVisible" width="500px">
        <el-timeline>
          <el-timeline-item
              v-for="(item, index) in activities"
              :key="index"
              :timestamp="item.time">
            {{item.context}}
          </el-timeline-item>
        </el-timeline>
        <span slot="footer" class="dialog-footer">
          <el-button @click="timeDialogVisible = false">取 消</el-button>
          <el-button @click="timeDialogVisible = false" type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import mixin from './Orders-mixin';
export default {
  name: 'Orders',
  mixins: [mixin]
};
</script>

<style scoped>

</style>
