import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import newList from '@/components/newList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
      	{
      		path: 'newlist',
      		component: newList
      	}
      ]
    }
  ]
})
