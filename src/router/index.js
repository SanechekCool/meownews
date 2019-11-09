import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import View from '../components/View.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/news/:id',
      name: 'View',
      component: View
    }
  ]
})
