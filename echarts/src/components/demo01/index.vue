<template>
  <div>
    <div id="echart"></div>
    <button @click="$router.push('/demo02')">demo02</button>
  </div>
</template>

<script>
let echarts = require('echarts')
export default {
  data() {
    return {
      a: 2
    }
  },
  mounted() {
    let myChart = echarts.init(document.getElementById('echart'))
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  }
}
</script>

<style lang="less" scoped>
#echart {
  width: 600px;
  height: 600px;
}
</style>
