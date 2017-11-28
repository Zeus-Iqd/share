import Vue from 'vue'
import axios from 'axios'
import App from './App'
import echarts from 'echarts'
import router from '@/router'

Vue.prototype.echarts = echarts

Vue.config.productionTip = false
Vue.config.devtools = false

axios.defaults.baseURL = '/api'

new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
})
