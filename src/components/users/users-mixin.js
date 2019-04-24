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
        // 查询用户名
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页数据的个数
        pagesize: 5
      },
      // 绑定用户查询输入框的内容
      searchUsers: '',
      // 设置分页总条数
      total: 0,
      // 添加用户的弹出对话框
      dialogVisible: false,
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
      },
      // 编辑用户弹出的对话框
      editDialogVisible: false,
      // 编辑用户的表单
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      // 分配角色,弹出的框
      roleDialogVisible: false,
      // 分配角色中的角色
      usersRole: [],
      // 分配角色中获取用户，和角色信息
      getUsersRole: {
        username: '',
        role_name: ''
      },
      // 分配用户选中的角色
      roleValue: ''
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
      // 点击添加用户之后弹出对话框，之后需要清除对话框的内容,这个操作必须在对话框渲染出来之后，所以要在下一帧执行
      this.$nextTick(() => {
        this.$refs.addForm.resetFields();
      });
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
    },
    // 编辑用户的
    async editUser (id) {
      // 点击编辑按钮，弹出编辑对话框
      this.editDialogVisible = true;
      // 打开编辑对话框的时候还需要，把上一次的验证清除
      this.$nextTick(() => {
        this.$refs.editForm.resetFields();
      });
      // 通过ID查找用户，把用户数据渲染到页面中
      const {data: {data, meta}} = await this.$http.get('users/' + id);
      if (meta.status !== 200) return this.$message.error('获取用户数据失败');
      this.editUserForm = data;
    },
    // 确认添加编辑的用户
    editUserFormData () {
      // 首先需要获取用户的ID
      let id = this.editUserForm.id;
      // 点击确认添加用户之前，需要进行表单验证
      this.$refs.editForm.validate(async valid => {
        // 如果表单验证成功，则发送请求
        if (valid) {
          const {data: {meta}} = await this.$http.put('users/' + id, {
            email: this.editUserForm.email,
            mobile: this.editUserForm.mobile
          });
          if (meta.status !== 200) return this.$message.error('编辑用户失败');
          // 编辑成功需要关闭弹出框，然后更新首页数据
          this.$message.success('编辑用户成功');
          this.editDialogVisible = false;
          this.getData();
        }
      });
    },
    // 删除用户
    edlUser (id) {
      // 通过ID进行删除用户
      this.$confirm('此操作将删除用户, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确认删除的话，则发送请求
        const {data: {meta}} = await this.$http.delete('users/' + id);
        if (meta.status !== 200) return this.$message.error('删除用户失败');
        // 删除成功的话则更新列表
        this.getData();
        // 提示用户删除成功
        this.$message.success('删除用户成功');
      }).catch(() => {});
    },
    // 修改用户状态
    async userStatus (id, mgState) {
      // 传入用户的ID和用户当前的状态
      const {data: {meta}} = await this.$http.put(`users/${id}/state/${mgState}`);
      if (meta.status !== 200) return this.$message.error('修改用户状态失败');
      return this.$message.success('修改状态成功');
    },
    // 点击打开分配角色,对话框
    async allocationUser (row) {
      // 分配角色需要用户的ID，根据ID找到对应的用户
      // 点击分配角色，弹出对话框
      this.roleDialogVisible = true;
      // 发送请求获取角色信息
      const {data: {data, meta}} = await this.$http.get('roles');
      // const {data: {data, meta}} = await this.$http.put(`users/${id}/role`);
      if (meta.status !== 200) return this.$message.error('获取角色信息失败');
      // 把获取到的角色信息显示在页面中
      this.getUsersRole = {
        username: row.username,
        role_name: row.role_name,
        roleId: row.id
      };
      this.usersRole = data;
      // 点击分配角色对话框，清空里面的内容
      // this.roleValue = '';
    },
    // 提交分配角色按钮
    async addRole () {
      // 发送请求，修改角色
      const {data: {meta}} = await this.$http.put(`users/${this.getUsersRole.roleId}/role`, {
        rid: this.roleValue
      });
      if (meta.status !== 200) return this.$message.error('修改角色信息失败');
      // 提交之后需要关闭对话框
      this.roleDialogVisible = false;
      this.getData();
      this.$message.success('修改角色信息成功');
    },
    // 用户查询
    search () {
      console.log(this.searchUsers);
      // 设置查询的内容
      this.userForm.query = this.searchUsers;
      this.getData();
    }
  }
};
