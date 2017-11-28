<template>
  <div>
    <ul class="main" id="ul">
    </ul>
  </div>
</template>

<script>
import analyzeData from './demo'
let echarts = require('echarts')
export default {
  computed: {
    chart() {
      return new Array(analyzeData.length)
    }
  },
  methods: {
    getAnalyzeData() {
      // 生成dom结构
      let ul = document.getElementById('ul')
      analyzeData.forEach((e, i) => {
        let li = document.createElement('li')
        li.className = 'item'
        li.id = `pie${i}`
        ul.appendChild(li)
      })
      // 组装数据
      let analyzeDataArr = []
      analyzeData.forEach((item, index) => {
        let optionList = item.optionList
        let optionListArr = optionList.map(({ content, answerCount }) => ({
          name: content,
          value: answerCount
        }))
        let picExample = optionList.map(item => item.content)
        let itemObj = {
          title: {
            text: item.descript,
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          // 图例
          legend: {
            x: 'center',
            y: 'bottom',
            data: picExample
          },
          // series[i]-pie 系列
          series: {
            type: 'pie',
            // 内圆半径，外圆半径
            radius: [0, 100],
            // 位置，左右，上下
            center: ['50%', '50%'],
            data: optionListArr
          }
        }
        analyzeDataArr.push(itemObj)
      })

      this.drawGraph(analyzeDataArr)
    },
    drawGraph(data) {
      // 绘图方法
      this.$nextTick(() => {
        data.forEach((e, i) => {
          this.chart[i] = echarts.init(document.getElementById(`pie${i}`))
          this.chart[i].showLoading()
          this.chart[i].setOption(data[i])
          this.chart[i].hideLoading()
        })
      })
    }
  },
  mounted() {
    this.getAnalyzeData()
  }
}
</script>

<style lang="less">
li {
  list-style: none;
}
.main {
  width: 50%;
  margin: 0 auto;
  .item {
    box-sizing: border-box;
    width: 100%;
    height: 600px;
    margin-top: 30px;
    padding: 20px 0;
    border: 1px solid #ccc;
  }
}
</style>

