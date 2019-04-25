export default {
  name: 'Categories',
  data () {
    return {
      tableData: [],
      getGoodsList: {
        type: '',
        // 当前页码值
        pagenum: 1,
        pagesize: 5
      },
      // 控制添加分类对话框，打开与关闭
      addDialogVisible: false,
      // 添加分类，表单内容
      addFormLabelAlign: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      // 添加分类，级联控件内显示的内容
      options: [],
      // 添加分类，级联控件内获取 选中的内容
      selectedOptions: [],
      // 添加分类表单验证规则
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {
    this.getData();
  },
  methods: {
    async getData () {
      const {data: {data, meta}} = await this.$http.get('categories', {params: this.getGoodsList});
      if (meta.status !== 200) return this.$message.error('获取商品分类列表失败');
      console.log(data);
      this.getGoodsList = {
        pagenum: data.pagenum,
        pagesize: data.pagesize,
        total: data.total
      };
      this.tableData = data.result;
    },
    // 点击切换分页
    currentPage (e) {
      this.getGoodsList.pagenum = e;
      this.getData();
    },
    // 添加分类按钮，打开添加分类对话框
    addClassify () {
      this.selectedOptions = [];
      this.addDialogVisible = true;
      this.$nextTick(async () => {
        // 清空验证规则
        this.$refs.addForm.resetFields();
        const {data: {data, meta}} = await this.$http.get('categories', {params: {type: 2}});
        if (meta.status !== 200) return this.$message.error('获取分类列表失败');
        this.options = data;
      });
    },
    // 确认添加商品分类
    addCommodity () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          console.log(this.selectedOptions);
          let len = this.selectedOptions.length;
          if (len !== 0) {
            this.addFormLabelAlign.cat_pid = this.selectedOptions[len - 1];
            this.addFormLabelAlign.cat_level = len;
          }
          const {data: {meta}} = await this.$http.post('categories', this.addFormLabelAlign);
          if (meta.status !== 201) return this.$message.error('添加分类失败');
          this.$message.success('添加分类成功');
          this.getData();
          this.addDialogVisible = false;
        }
      });
    }
  }
};
