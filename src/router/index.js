import Vue from 'vue'
import Router from 'vue-router'
import Contacts from '../pages/contacts/contacts.vue'
import ContactsDetail from '@/pages/contacts/ContactsDetail'

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
