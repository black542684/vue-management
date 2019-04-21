<template>
  <el-container class="home">
    <el-header class="home-header">
      <el-button @click="myMenu()" class="iconfont icon-menu" size="mini" circle></el-button>
      <span class="home-header-title">基于VUE后台管理系统</span>
      <el-button class="home-exit" @click="exit()" type="danger" size="mini" round>退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="flag?'65px':'180px'" class="home-aside">
        <el-menu
            v-for="item in list"
            :key="item.id"
            style="border: none; margin-top: 5px"
            :collapse="flag"
            :collapse-transition="false"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
              <el-menu-item style="min-width: 0" v-for="(value,index) in item.children" :index="item.order+'-'+(index+1)" :key="value.id">
                <i class="el-icon-menu"></i>
                {{value.authName}}
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home-main">
        <h1>欢迎您来到VUE项目后台管理系统。</h1>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      flag: false,
      list: []
    };
  },
  mounted () {
    if (sessionStorage.getItem('login') === 'true') {
      this.$message({
        message: '登录成功',
        center: true,
        duration: 1000,
        type: 'success'
      });
      sessionStorage.setItem('login', 'false');
    }
    this.getData();
  },
  methods: {
    myMenu () {
      this.flag = !this.flag;
    },
    async getData () {
      const {data: {data}} = await this.$http.get('menus');
      if (!data) {
        return this.$message({
          message: '获取数据列表失败',
          center: true,
          duration: 1000,
          type: 'error'
        });
      }
      this.list = data;
      console.log(this.list);
    },
    // 用户退出
    exit () {
      // sessionStorage.removeItem('token');
      // this.$router.push('/login');
      this.$confirm('此操作将退出用户, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认退出则清除sessionStorage 里面的数据，跳转到登入页面
        sessionStorage.removeItem('token');
        this.$router.push('/login');
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    }
  }
};
</script>

<style scoped>
.home{
  height: 100%;
}
.home-header{
  background: #373d41;
  line-height:60px;
}
.home-header-title{
  font-size:18px;
  color:#ccc;
  padding-left:15px;
}
.home-aside{
  background: #333744;
}
.home-exit{
  float:right;
  margin-top:15px;
}
.home-main{
  background-color: #eaedf1;
  padding:20px;
}
.home-main h1{
  font-size: 24px;
  margin: 0;
  font-weight: 400;
  text-align: center;
  padding-top: 200px;
}
</style>
