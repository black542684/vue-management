<template>
  <div class="login-container">
    <div class="centre">
      <img src="../assets/images/logo.png" height="56" width="230"/>
      <el-form :rules="rules" :model="form" ref="form">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username" prefix-icon="iconfont icon-account"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="form.password" prefix-icon="iconfont icon-eye-slash"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('form')">登录</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login (form) {
      // 提交的时候也要通过表单验证
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          // 如果表单校验成功则发送请求服务器
          const {data: {data, meta}} = await this.$http.post('login', this.form);
          if (meta.status !== 200) {
            this.$message.error(meta.msg);
          }
          // 如果登入成功则把 token的值 记录在 sessionStorage
          sessionStorage.setItem('token', data.token);
          // 登入成功之后记录登入状态
          sessionStorage.setItem('login', 'true');
          // 然后跳转至首页
          this.$router.push('/home');
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container{
  height: 100%;
  background:linear-gradient(45deg,#EFF7FE,#0C5460);
}
.login-container .centre{
  width: 407px;
  height: 255px;
  padding:15px;
  border:1px solid #ccc;
  box-shadow:0 2px 15px #eee;
  border-radius:5px;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-60%);
  background:linear-gradient(210deg,#f0f8ff,#d1ecf1);
  box-sizing:border-box;
}
.login-container .centre img{
  display:block;
  margin:0 auto;
  margin-bottom:15px;
}
</style>
