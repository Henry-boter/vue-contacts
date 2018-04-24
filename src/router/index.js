import Vue from 'vue'
import Router from 'vue-router'
import Contacts from '@/pages/Contacts'
import ContactsDetail from '@/pages/ContactsDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Contacts',
      component: Contacts,
      children: [
        {
          path: ':id',
          component: ContactsDetail
        }
      ]
    }
  ]
})
