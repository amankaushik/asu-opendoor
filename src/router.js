import Vue from 'vue'
import Router from 'vue-router'
import Sort from '@/views/Sort.vue'
import Stack from '@/views/Stack.vue'
import Landing from "@/views/Landing";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/sort',
            name: 'sort',
            component: Sort
        },
        {
            path: '/stack',
            name: 'stack',
            component: Stack
        },
        {
            path: '/',
            name: 'landing',
            component: Landing
        }
    ]
})
