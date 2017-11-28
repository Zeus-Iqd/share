import Vue from 'vue'
import Router from 'vue-router'
import demo01 from '../components/demo01'
import demo02 from '../components/demo02'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    redirect: '/demo01'
  },
  {
    path: '/demo01',
    component: demo01
  },
  {
    path: '/demo02',
    component: demo02
  }
]

export default new Router({ routes })
