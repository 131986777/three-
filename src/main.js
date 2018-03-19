// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
//require('./assets/css/flx.css')
require('./assets/js/rem');
import $ from 'jquery'
import { Navbar, TabItem } from 'mint-ui';
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
//
//
//
//
Vue.use(Mint);


//import cess from './assets/js/ce.js'
Vue.config.productionTip = false

//const ces
/* eslint-disable no-new */





new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
