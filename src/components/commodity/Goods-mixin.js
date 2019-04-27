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
      if (this.searchGoods === '') {
        this.goodsList.pagenum = 1;
      }
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
      this.goodsList.query = this.searchGoods;
      this.getData();
      console.log(this.goodsList.pagenum);
    }
  }
};
