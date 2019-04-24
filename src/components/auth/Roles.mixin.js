export default {
  name: 'Roles',
  data () {
    return {
      // 表单中的所有数据
      tableData: [],
      // 添加角色，表单数据
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      // 打开添加角色对话框
      addRoleFormVisible: false,
      // 添加角色表单验证规则
      rules: {
        roleName: [
          { required: true, message: '角色名不能为空', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ]
      },
      // 编辑角色对话框
      editRoleFormVisible: false,
      // 编辑角色，表单数据
      editRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      // 分配权限对话框
      allotRoleFormVisible: false,
      // 分配权限假数据
      allotRoleData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }]
    };
  },
  mounted () {
    this.getData();
  },
  methods: {
    // 递归遍历数组中的对象????
    async getData () {
      const {data: {data, meta}} = await this.$http.get('roles');
      if (meta.status !== 200) return this.$message.error('获取角色列表失败');
      data.forEach(item => {
        item.child = item.children;
        delete item.children;
        item.child.forEach(item => {
          item.child = item.children;
          delete item.children;
          item.child.forEach(item => {
            item.child = item.children;
            delete item.children;
          });
        });
      });
      this.tableData = data;
    },
    // 添加角色
    addRole () {
      this.$refs.addRoleRules.validate(async valid => {
        // 如果验证成功则发送请求添加角色
        if (valid) {
          const {data: {meta}} = await this.$http.post('roles', this.addRoleForm);
          if (meta.status !== 201) return this.$message.error('添加角色失败');
          this.$message.success('添加角色成功');
          this.addRoleFormVisible = false;
          this.getData();
        }
      });
    },
    // 删除角色
    delRole (id) {
      this.$confirm('此操作将删除角色, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确认删除的话，则发送请求
        const {data: {meta}} = await this.$http.delete('roles/' + id);
        if (meta.status !== 200) return this.$message.error('删除用户失败');
        // 删除成功的话则更新列表
        this.getData();
        // 提示角色删除成功
        this.$message.success('删除角色成功');
      }).catch(() => {});
    },
    // 打开编辑角色对话框
    async editRole (id) {
      this.editRoleFormVisible = true;
      // 打开对话框的时候需要清除上一次的校验结果,但是需要在表单渲染完成之后
      this.$nextTick(() => {
        this.$refs.editRoleRules.resetFields();
      });
      // 根据ID查询角色信息
      const {data: {data, meta}} = await this.$http.get('roles/' + id);
      if (meta.status !== 200) return this.$message.error('获取角色信息失败');
      this.editRoleForm = data;
    },
    // 提交编辑角色
    async editSubmit () {
      const {data: {meta}} = await this.$http.put('roles/' + this.editRoleForm.roleId, {
        roleName: this.editRoleForm.roleName,
        roleDesc: this.editRoleForm.roleDesc
      });
      if (meta.status !== 200) return this.$message.error('编辑角色信息失败');
      this.$message.success('编辑角色成功');
      this.editRoleFormVisible = false;
      this.getData();
    },
    // 删除权限
    delRight (roleID, id, row) {
      console.log(roleID, id);
      this.$confirm('此操作将删除权限, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确认删除的话，则发送请求
        const {data: {data, meta}} = await this.$http.delete(`roles/${roleID}/rights/${id}`);
        if (meta.status !== 200) return this.$message.error('删除用户失败');
        // 删除成功的话则更新列表
        data.forEach(item => {
          item.child = item.children;
          delete item.children;
          item.child.forEach(item => {
            item.child = item.children;
            delete item.children;
          });
        });
        row.child = data;
        // 提示权限删除成功
        this.$message.success('删除权限成功');
      }).catch(() => {});
    },
    // 分配权限
    allotRole () {
      this.allotRoleFormVisible = true;
    }
  }
};
