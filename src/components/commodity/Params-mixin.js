export default {
  name: 'Params',
  data () {
    return {
      // 级联菜单渲染的内容
      options: [],
      // 级联菜单选中的数据
      selectedOptions: [],
      // Tab栏默然选中的项目
      activeName: 'many',
      // 查询页码
      goodsList: {
        // 查询的商品名字
        query: '',
        // 当前页码
        pagenum: 1,
        // 每一页的条数
        pagesize: 5
      },
      // 总条数
      total: 0,
      // 控制添加参数按钮是否可以操作
      disabled: true,
      // 动态参数下面的表格
      manyTableData: [],
      // 静态属性下面的表格
      onlyTableData: [],
      // 控制显示隐藏tag和input标签
      // showTag: false,
      // 用于获取tag下面的input里面的数据
      inputData: '',
      // 显示添加动态/静态参数的对话框
      addDialogVisible: false,
      // 添加参数表单绑定的数据
      addForm: {
        attr_name: ''
      },
      // 添加参数表单验证,和编辑参数表单验证
      rules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      },
      // 编辑参数表单显示或者隐藏
      editDialogVisible: false,
      // 编辑参数表单绑定数据
      editForm: {
        attr_name: '',
        attr_id: ''
      },
      // 静态参数绑定input
      onlyInputData: ''
    };
  },
  computed: {
    // 计算属性,用来获取选中分类的ID
    id: function () {
      if (this.selectedOptions.length === 3) {
        return this.selectedOptions[2];
      } else {
        return null;
      }
    }
  },
  mounted () {
    this.getData();
  },
  methods: {
    // 点击选中级联菜单的选项 触发的事件
    async handleChange () {
      // 判断是否选择了3级菜单
      if (this.selectedOptions.length !== 3) {
        this.selectedOptions = [];
        this.disabled = true;
        // 如果没有选择第三级菜单则清空 下面列表的数据
        this[this.activeName + 'TableData'] = [];
      } else {
        // 根据ID查询下面表中显示的数据
        // console.log(this.id);
        // 获取选中的属性 动态 或者 静态
        // 发送请求获取数据
        const {data: {data, meta}} = await this.$http.get(`categories/${this.id}/attributes`, {params: {
          sel: this.activeName
        }});
        if (meta.status !== 200) return this.$message.error('获取商品列表失败');
        // 需要处理data中的attr_vals属性，以逗号分隔变成数组
        if (this.activeName === 'many') {
          data.forEach(item => {
            // 给每个数组中的对象添加showTag属性用来控制显示当前行的tag和input标签
            item.showTag = false;
            if (item.attr_vals !== '') {
              // 如果不是空的，才会以逗号进行分割
              item.attr_vals = item.attr_vals.split(',');
            } else {
              item.attr_vals = [];
            }
          });
        } else {
          data.forEach(item => {
            // 给每个数组中的对象添加showTag属性用来控制显示当前行的tag和input标签
            item.showTag = false;
          });
        }
        this[this.activeName + 'TableData'] = data;
        this.disabled = false;
      }
    },
    // 获取所有商品的数据1
    async getData () {
      const {data: {data, meta}} = await this.$http.get('categories', {params: {
        type: 3
      }});
      if (meta.status !== 200) return this.$message.error('获取商品列表失败');
      // console.log(data);
      this.options = data;
    },
    // 切换tab栏目的时候触发的 函数
    switchover () {
      // 切换tab栏目的时候重新渲染列表
      this.handleChange();
    },
    // 用于tag添加,点击tag显示input
    showInput (row) {
      row.showTag = true;
      // 自动获取焦点
      this.$nextTick(() => {
        this.$refs['Input' + row.attr_id].focus();
      });
    },
    // 用于失去焦点之后，发送请求修改数据
    async hiddenInput (row) {
      // 判断用户是否输入了内容，如果没有则不进行发送请求
      if (this.inputData === '') {
        console.log('没有内容');
      } else {
        console.log(this.inputData);
        // 发送请求，把输入框 中的内容 发送给服务器
        const {data: {data, meta}} = await this.$http.put(`categories/${this.id}/attributes/${row.attr_id}`, {
          attr_name: row.attr_name,
          attr_sel: this.activeName,
          attr_vals: row.attr_vals.join(',') + ',' + this.inputData
        });
        console.log(meta, data);
        if (meta.status !== 200) return this.$message.error('添加tag失败');
        this.$message.success('添加tag成功');
        // 如果有内容则放进attr_vals数组中
        row.attr_vals.push(this.inputData);
        // 然后在清空输入框中的
        this.inputData = '';
      }
      row.showTag = false;
    },
    // 移除tag标签的事件
    delTag (row, i) {
      this.$confirm('此操作将删除tag, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确认删除的话，则发送请求
        // 发送请求前需要将数据处理一下
        let value = row.attr_vals.join(',');
        value = value.split(',');
        value.splice(i, 1);
        const {data: {meta}} = await this.$http.put(`categories/${this.id}/attributes/${row.attr_id}`, {
          attr_name: row.attr_name,
          attr_sel: this.activeName,
          attr_vals: value.join(',')
        });
        if (meta.status !== 200) {
          return this.$message.error('删除tag失败');
        } else {
          this.$message.success('删除tag成功');
          row.attr_vals = value;
        }
      }).catch(() => {});
    },
    // 添加动态参数对话框显示
    addMany () {
      this.addDialogVisible = true;
      this.$nextTick(() => {
        // 打开对话框的时候，还需要清空上一次的验证规则
        this.$refs.addForm.resetFields();
      });
    },
    // 添加静态参数对话框显示
    addOnly () {
      this.addDialogVisible = true;
      this.$nextTick(() => {
        // 打开对话框的时候，还需要清空上一次的验证规则
        this.$refs.addForm.resetFields();
      });
    },
    // 点击确定按钮 ，添加参数
    addParams () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.post(`categories/${this.id}/attributes`, {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          });
          if (meta.status !== 201) return this.$message.error('添加参数失败');
          this.$message.success('添加参数成功');
          this.handleChange();
        }
      });
      this.addDialogVisible = false;
    },
    // 删除参数
    delParams (row) {
      this.$confirm('此操作将删除参数, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确认删除的话，则发送请求
        const {data: {meta}} = await this.$http.delete(`categories/${this.id}/attributes/${row.attr_id}`);
        if (meta.status !== 200) return this.$message.error('删除参数失败');
        this.$message.success('删除参数成功');
        // 更新列表
        this.handleChange();
      }).catch(() => {});
    },
    // 编辑参数名称，显示对话框
    showEditParams (row) {
      this.editDialogVisible = true;
      this.$nextTick(() => {
        // 打开对话框的时候，还需要清空上一次的验证规则
        this.$refs.editForm.resetFields();
        this.editForm.attr_name = row.attr_name;
        this.editForm.attr_id = row.attr_id;
      });
    },
    // 编辑参数名称，点击提交按钮
    editParams () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          console.log(this.editForm);
          const {data: {meta}} = await this.$http.put(`categories/${this.id}/attributes/${this.editForm.attr_id}`, {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName
          });
          console.log(meta);
          if (meta.status !== 200) return this.$message.error('修改参数失败');
          this.$message.success('修改参数成功');
          // 更新列表数据
          this.handleChange();
          this.editDialogVisible = false;
        }
      });
    },
    // 点击静态参数tag显示input
    showOnly (row) {
      // 显示input
      row.showTag = true;
      // 获取焦点
      this.$nextTick(() => {
        this.$refs['onlyInput' + row.attr_id].focus();
        console.log(this.$refs.onlyInput);
        // input里面 的内容 等于 tag里面的内容
        this.onlyInputData = row.attr_vals;
      });
    },
    // input 失去焦点之后隐藏
    async hiddenOnlyInput (row) {
      // 判断用户是否输入了内容，如果没有则不进行发送请求
      if (this.onlyInputData === '') {
        console.log('没有内容');
      } else {
        console.log(this.onlyInputData);
        // 发送请求，把输入框 中的内容 发送给服务器
        const {data: {data, meta}} = await this.$http.put(`categories/${this.id}/attributes/${row.attr_id}`, {
          attr_name: row.attr_name,
          attr_sel: this.activeName,
          attr_vals: this.onlyInputData
        });
        console.log(meta, data);
        if (meta.status !== 200) return this.$message.error('操作失败');
        this.$message.success('操作成功');
        // 然后在清空输入框中的
        // 清空里面的内容
        row.attr_vals = this.onlyInputData;
        this.onlyInputData = '';
        row.showTag = false;
      }
    }
  }
};
