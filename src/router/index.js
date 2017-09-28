import Vue from 'vue'
import Router from 'vue-router'
import multiSel from '@/components/multiSel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'multiSel',
      component: multiSel
    }
  ]
})
