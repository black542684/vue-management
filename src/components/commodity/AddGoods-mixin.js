export default {
  name: 'AddGoods',
  data () {
    return {
      // 控制步骤条走了几步
      active: 0,
      // 表单中绑定的数据
      addForm: {
        // 商品名称
        goods_name: '',
        // 所属分类列表
        goods_cat: '',
        // 价格
        goods_price: '',
        // 数量
        goods_number: '',
        // 重量
        goods_weight: '',
        // 介绍
        goods_introduce: '',
        // 上传图片的临时路径
        pics: [],
        // 商品参数,包含 动态参数 和 静态属性
        attrs: []
      },
      // 级联中显示的数据
      options: [],
      // 选中级联绑定的数据
      selectedOptions: [],
      // 表单验证
      rule: {
        // 商品名称
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        // 所属分类列表
        goods_cat: [
          { required: true, message: '分类必须是三级', trigger: 'change' }
        ],
        // 价格
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        // 数量
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        // 重量
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      },
      // 动态参数
      manyParams: [],
      // 静态参数
      onlyParams: [],
      // 上传图片的列表
      // fileList: [],
      // 点击显示大图片
      dialogImageUrl: '',
      // 点击显示大图片的框
      dialogVisible: false,
      // 上传图片的请求头
      headers: {
        Authorization: sessionStorage.getItem('token')
      }
    };
  },
  watch: {
    // 监听selectedOptions中的数据变化
    selectedOptions (now, old) {
      if (now.length === 3) {
        this.addForm.goods_cat = now.toString();
      } else {
        this.addForm.goods_cat = '';
      }
    }
  },
  mounted () {
    this.getData();
  },
  methods: {
    tabChange (v) {
      // this.active = +v.index;
    },
    // 获取分类列表
    async getData () {
      const {data: {data, meta}} = await this.$http.get('categories');
      if (meta.status !== 200) return this.$message.error('获取数据失败');
      this.options = data;
    },
    // 获取静态参数，动态参数
    async getParams (type) {
      const id = this.selectedOptions[2];
      const {data: {data, meta}} = await this.$http.get(`categories/${id}/attributes`, {params: {sel: type}});
      if (meta.status !== 200) return this.$message.error('获取数据失败');
      this[type + 'Params'] = data;
      // console.log(data, meta);
    },
    // 在切换tabs的时候触发的函数
    async tabsChange (activeName, oldActiveName) {
      // console.log(activeName, oldActiveName);
      // 在页面加载的时候不能执行这个函数所以 oldActiveName必须是 0 的时候触发
      // 进行表单验证
      if (oldActiveName === '0') {
        return new Promise((resolve, reject) => {
          this.$refs.form.validate(valid => {
            if (valid) {
              resolve();
              this.active = +activeName;
              // 获取动态参数
              this.getParams('many');
              // 获取静态参数
              this.getParams('only');
            } else {
              reject(new Error('错误'));
            }
          });
        });
      }
      this.active = +activeName;
    },
    // 上传图片成功之后的钩子函数
    handleSuccess (response, file, fileList) {
      // response 是上传成功之后服务器返回的对象
      const {data, meta} = response;
      if (meta.status === 200) {
        this.$message.success('图片上传成功');
      }
      this.addForm.pics.push({pic: data.tmp_path});
    },
    // 删除图片后的函数
    handleRemove (file, fileList) {
      // console.log(file.response.data.tmp_path);
      // 查找删除的图片，在pics中的下标
      const index = this.addForm.pics.findIndex(value => value.pic === file.response.data.tmp_path);
      // 删除这个下标对应的数组
      this.addForm.pics.splice(index, 1);
    },
    handlePictureCardPreview (file) {
      // 点击图片显示大图
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 提交商品
    async addShop () {
      // 获取ID
      const id = this.selectedOptions[2];
      const {data: {meta}} = await this.$http.put('goods/' + id, this.addForm);
      if (meta.status !== 200) return this.$message.error('创建商品失败');
      this.$message.success('创建商品成功');
      this.$router.push('/goods');
    }
  }
};
