// common alias
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './routes/index.route'

// alias for project-meer
import Meer from '../../meer/dist/packages/meer.development.js'
import NavWrap from './projects/meer/common/NavWrap.vue'
import VuePrism from 'vue-prism'
Vue.use(Meer)
Vue.use(VuePrism)
Vue.use(VueRouter)
Vue.component('nav-wrap', NavWrap)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
