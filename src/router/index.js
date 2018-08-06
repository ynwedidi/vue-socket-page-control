import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import img from '@/views/img'
import button from '@/views/button'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'button',
      component: button
    },
    {
      path: '/img',
      name: 'img',
      component: img
    }
  ]
})
