import Vue from 'vue'
import axios from 'axios'
import App from './App'

Vue.config.productionTip = false
Vue.config.devtools = false

axios.defaults.baseURL = '/api'

new Vue({
  el: '#app',
  template: '<App />',
  components: { App }
})
