import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register/register.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'register',
      component: register
    }
  ]
})
