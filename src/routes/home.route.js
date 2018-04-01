export default [
    {path: '', component: () => import('../home/intro/index.vue')},
    {path: 'guide', component: () => import('../home/guide/index.vue')},    
    {path: 'intro', component: () => import('../home/intro/index.vue')},
    {path: 'look', component: () => import('../home/look/index.vue')},
    {path: 'articles', component: () => import('../home/articles/index.vue')},
    {path: 'projects', component: () => import('../home/projects/index.vue')},
    {path: 'donate', component: () => import('../home/donate/index.vue')}    
]