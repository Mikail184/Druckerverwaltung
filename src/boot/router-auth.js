import { LocalStorage} from 'quasar'

// https://router.vuejs.org/guide/advanced/navigation-guards.html
export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem('loggedIn')
    if (!loggedIn && to.path !== '/auth') {
      next('/auth')
    } else {
      next()
    }
  })
}
