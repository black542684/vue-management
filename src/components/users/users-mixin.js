export default {
  name: 'Users',
  data () {
    // 自定义表单验证规则
    let vaildateMobil = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error('手机号输入不正确'));
      }
      return callback();
    };
    return {
      // 用户数据列表
      tableData: [],
      // 获取用户数据列表传递的参数
      userForm: {
        // 查询第几页
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页数据的个数
        pagesize: 5
      },
      // 设置分页总条数
      total: 0,
      // 添加用户的弹出对话框
      dialogVisible: null,
      // 添加用户的表单
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户表单的验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: vaildateMobil, trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {
    // 获取列表数据
    this.getData();
  },
  methods: {
    // 获取用户列表数据
    async getData () {
      const {data: {data, meta}} = await this.$http.get('users', {params: this.userForm});
      if (meta.status !== 200) return this.$message.error('获取用户数据列表失败');
      // 把数据渲染到列表
      this.tableData = data.users;
      // 获取总页数
      this.total = data.total;
    },
    // 点击分页获取分页数据
    gainPage (value) {
      // value 就是当前页的页码，获取页面发送axios请求，接收返回的分页数据，把tableData 中的数据改变
      // 把当前页码换成点击的页码
      this.userForm.pagenum = value;
      this.getData();
    },
    // 添加用户按钮，弹出添加用户对话框
    addUser () {
      this.dialogVisible = true;
    },
    // 确认添加用户
    addUserFormData (form) {
      this.$refs[form].validate(async (valid) => {
        // 点击确认添加按钮，也要验证表单，如果通过验证才发送axios 给后台
        if (valid) {
          const {data: {meta}} = await this.$http.post('users', this.addUserForm);
          if (meta.status !== 201) {
            return this.$message.error(meta.msg);
          }
          this.dialogVisible = false;
          // 用户添加成功之后，刷新页面数据
          this.getData();
          return this.$message.success('添加用户成功');
        }
      });
    }
  }
};
