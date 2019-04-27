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
      // 动态参数下面的表格
      manyTableData: [],
      // 静态属性下面的表格
      onlyTableData: [],
      // 控制显示隐藏tag和input标签
      // showTag: false,
      // 用于获取tag下面的input里面的数据
      inputData: ''
    };
  },
  computed: {
    // 计算属性
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
      if (this.selectedOptions.length !== 3) {
        this.selectedOptions = [];
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
            }
          });
        }
        this[this.activeName + 'TableData'] = data;
        console.log(data);
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
    showInput (tag) {
      tag = false;
      console.log(tag);
      // 自动获取焦点
      this.$nextTick(() => {
        this.$refs.Input.focus();
      });
    },
    // 用于失去焦点之后，发送请求修改数据
    async hiddenInput (row) {
      row.showTag = false;
      // 判断用户是否输入了内容，如果没有则不进行发送请求
      if (!this.inputData) {
        console.log('没有内容');
      } else {
        // 发送请求，把输入框 中的内容 发送给服务器
        const {data: {data, meta}} = await this.$http.post(`categories/${row.attr_id}/attributes`, {
          attr_name: row.attr_name,
          attr_sel: this.activeName,
          attr_vals: row.attr_vals.join(',') + this.inputData
        });
        if (meta.status !== 201) return this.$message.error('修改参数失败');
        console.log(data);
        // 如果有内容则放进attr_vals数组中
        row.attr_vals.push(this.inputData);
        // 然后在清空输入框中的
        this.inputData = '';
      }
    }
  }
};
