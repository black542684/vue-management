export default {
  name: 'Rights',
  data () {
    return {
      tableData: []
    };
  },
  mounted () {
    this.getData();
  },
  methods: {
    async getData () {
      const {data: {data, meta}} = await this.$http.get('rights/list');
      if (meta.status !== 200) return this.$message.error('获取列表失败');
      this.tableData = data;
    }
  }
};
