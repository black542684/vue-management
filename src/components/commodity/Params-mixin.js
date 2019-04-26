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
      onlyTableData: []
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
        console.log(this.activeName);
        // 发送请求获取数据
        const {data: {data, meta}} = await this.$http.get(`categories/${this.id}/attributes`, {params: {
          sel: this.activeName
        }});
        console.log(meta);
        if (meta.status !== 200) return this.$message.error('获取商品列表失败');
        // 需要处理data中的attr_vals属性，以逗号分隔变成数组
        if (this.activeName === 'many') {
          data.forEach(item => {
            item.attr_vals = item.attr_vals.split(',');
          });
        }
        this[this.activeName + 'TableData'] = data;
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
      console.log(this.activeName);
      // 切换tab栏目的时候重新渲染列表
      this.handleChange();
    }
  }
};
