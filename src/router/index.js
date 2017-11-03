import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Header from '@/components/Header'
import Login from '@/components/Login'
import Signin from '@/components/Signin'
import FirebaseAuth from '@/components/FirebaseAuth'
import About from '@/components/About'
import Bookmarker from '@/components/Bookmarker'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Hello',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/firebaseauth',
      name: 'Firebase',
      component: FirebaseAuth
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/bookmarker',
      name: 'Bookmarker',
      component: Bookmarker
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '*',
      redirect: { name: 'Login' } // redirect '/login'
    }
  ],
  mode: 'history'
})
