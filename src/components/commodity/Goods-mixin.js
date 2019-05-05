export default {
  name: 'goods',
  data () {
    return {
      goodsList: {
        // 查询字符串
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页显示的条数
        pagesize: 5
      },
      // 总共的条数
      total: 5,
      // 商品列表表单显示的数据
      goodsData: [],
      // 搜索商品输入框绑定的数据
      searchGoods: ''
    };
  },
  mounted () {
    this.getData();
  },
  methods: {
    // 页面加载的时候获取列表数据
    async getData () {
      // if (this.searchGoods === '') {
      //   this.goodsList.pagenum = 1;
      // }
      const {data: {data, meta}} = await this.$http.get('goods', {params: this.goodsList});
      if (meta.status !== 200) return this.$message.error('获取商品列表失败');
      this.goodsData = data.goods;
      // 获取商品总数
      this.total = data.total;
    },
    // 切换页码的时候使用的方法
    gainPage (v) {
      // 修改页码，重新加载数据
      this.goodsList.pagenum = v;
      this.getData();
    },
    // 搜索商品
    search () {
      this.goodsList.pagenum = 1;
      this.goodsList.query = this.searchGoods;
      this.getData();
      console.log(this.goodsList.pagenum);
    },
    // 删除商品
    delGoods (row) {
      console.log(row.goods_id);
      this.$confirm('此操作将删除商品, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确认删除的话，则发送请求
        const {data: {meta}} = await this.$http.delete('goods/' + row.goods_id);
        if (meta.status !== 200) return this.$message.error('删除商品失败');
        // 删除成功的话则更新列表
        this.getData();
        // 提示用户删除成功
        this.$message.success('删除商品成功');
      }).catch(() => {});
    },
    // 添加商品
    addGoods () {
      this.$router.push({path: '/goods/add'});
    }
  }
};
