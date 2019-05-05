<template>
  <div class="user-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 页面主体区域 -->
    <el-card>
      <div class="MyBox" ref="Box" style="width: 100%;height:450px;"></div>
    </el-card>
  </div>
</template>

<script>
/* 1. 引入 echarts 插件 */
/* 2. 准备一个容器 */
/* 3. 实例化echarts对象 需要容器dom */
/* 4. 需要符合echarts规则的配置项 */
/* 5. 设置配置项给实例 */
import echarts from 'echarts';
export default {
  name: 'Reports',
  data () {
    return {
      option: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    };
  },
  mounted () {
    this.getData();
  },
  methods: {
    async getData () {
      const {data: {data, meta}} = await this.$http.get('reports/type/1');
      if (meta.status !== 200) return this.$message.error('获取数据失败');
      console.log(data, meta);
      const myEcharts = echarts.init(this.$refs.Box);
      const options = {...this.option, ...data};
      myEcharts.setOption(options);
    }
  }
};
</script>

<style scoped>

</style>
