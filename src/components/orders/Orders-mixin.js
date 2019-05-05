import city from './city';
export default {
  name: 'Orders',
  data () {
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
      // 收货地址对话框
      dialogVisible: false,
      addUserForm: {},
      // 收货地址级联菜单
      options: city,
      // 时间线
      timeDialogVisible: false,
      // 物流时间线
      activities: [
        {
          'time': '2018-05-10 09:39:00',
          'ftime': '2018-05-10 09:39:00',
          'context': '已签收,感谢使用顺丰,期待再次为您服务',
          'location': ''
        },
        {
          'time': '2018-05-10 08:23:00',
          'ftime': '2018-05-10 08:23:00',
          'context': '[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件',
          'location': ''
        },
        {
          'time': '2018-05-10 07:32:00',
          'ftime': '2018-05-10 07:32:00',
          'context': '快件到达 [北京海淀育新小区营业点]',
          'location': ''
        },
        {
          'time': '2018-05-10 02:03:00',
          'ftime': '2018-05-10 02:03:00',
          'context': '快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]',
          'location': ''
        },
        {
          'time': '2018-05-09 23:05:00',
          'ftime': '2018-05-09 23:05:00',
          'context': '快件到达 [北京顺义集散中心]',
          'location': ''
        },
        {
          'time': '2018-05-09 21:21:00',
          'ftime': '2018-05-09 21:21:00',
          'context': '快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]',
          'location': ''
        },
        {
          'time': '2018-05-09 13:07:00',
          'ftime': '2018-05-09 13:07:00',
          'context': '顺丰速运 已收取快件',
          'location': ''
        },
        {
          'time': '2018-05-09 12:25:03',
          'ftime': '2018-05-09 12:25:03',
          'context': '卖家发货',
          'location': ''
        },
        {
          'time': '2018-05-09 12:22:24',
          'ftime': '2018-05-09 12:22:24',
          'context': '您的订单将由HLA（北京海淀区清河中街店）门店安排发货。',
          'location': ''
        },
        {
          'time': '2018-05-08 21:36:04',
          'ftime': '2018-05-08 21:36:04',
          'context': '商品已经下单',
          'location': ''
        }
      ]
    };
  },
  mounted () {
    // 获取列表数据
    this.getData();
  },
  methods: {
    // 获取列表数据
    async getData () {
      // 如果没有输入内容则查询的是第一页
      // if (this.searchUsers === '') {
      //   this.userForm.pagenum = 1;
      // }
      const {data: {data, meta}} = await this.$http.get('orders', {params: this.userForm});
      if (meta.status !== 200) return this.$message.error('获取用户数据列表失败');
      // 把数据渲染到列表
      this.tableData = data.goods;
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
    // 收货地址的
    async editUser (id) {
      this.dialogVisible = true;
    }
  }
};
