// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import firebase from 'firebase';
import { firebaseapp, db } from '@/firebaseConfig'


Vue.use(VueResource);
Vue.http.options.root = 'https://bookmarker-448f6.firebaseio.com/';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mode: 'history'
})
