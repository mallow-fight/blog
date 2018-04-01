// 所有页面的路由
import VueRouter from 'vue-router'
import meerRoute from './meer.route'
import homeRoute from './home.route'
export default new VueRouter({
    routes: [
         // default page
         {path: '*', component: () => import('../projects/meer/other/NotFound.vue')},
         {path: '/', component: () => import('../home/index.vue')},
         {
             path: '/home',
             component: () => import('../home/index.vue'),
             children: homeRoute
         },
         {
             path: '/home/projects/meer',
             component: () => import('../projects/meer/index.vue'),
             children: meerRoute
         }
    ]
})