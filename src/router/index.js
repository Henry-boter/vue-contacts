import Vue from 'vue'
import Router from 'vue-router'
import Contacts from '../pages/contacts/contacts.vue'
import Car from '../pages/car/Car.vue'
import Home from '@/pages/home/Home.vue'
import ContactsDetail from '@/pages/contacts/ContactsDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts,
      children: [
        {
          path: ':id',
          component: ContactsDetail
        }
      ]
    },
    {
      path: '/car',
      name: 'car',
      component: Car
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
