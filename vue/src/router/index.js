import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../views/Dashboard.vue'
import Survey from '../views/Surveys.vue'
import SurveyView from '../views/SurveyView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import store from "../store";

import Test from '../views/test/Test.vue'
import MobileView from '../views/test/mobile-view.vue'
import ColorShapes from '../views/test/color-shapes.vue'

const routes = [
    {
        path: '/auth',
        redirect: '/login',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            {path: '/login', name: 'Login', component: Login},
            {path: '/register', name: 'Register', component: Register}
        ]
    },
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        // meta: {requiresAuth: true}, // check if user is authenticated
        children: [
            {path: '/dashboard', name: 'Dashboard', component: Dashboard},
            {path: '/survey', name: 'Survey', component: Survey},
            {path: '/survey/create', name: 'SurveyCreate', component: SurveyView},
            {path: '/survey/:id', name: 'SurveyView', component: SurveyView},
        ]
    },
    {path: '/test', name: 'Test', component: Test},
    {path: '/mobile', name: 'MobileView', component: MobileView},
    {path: '/cshapes', name: 'ColorShapes', component: ColorShapes},
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

// handling user auth
// router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth && !store.state.user.token) {
//         next({name: 'Login'})
//     } else if (store.state.user.token && to.meta.isGuest) {
//         next({name: 'Dashboard'})
//     }else {
//         next();
//     }
// })

export default router;