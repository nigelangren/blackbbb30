import Vue from 'vue'
import App from './App.vue'

import './assets/statics/site/css/style.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import axios from 'axios'
// import VueAxios from 'vue-axios'
import vueRouter from 'vue-router'
import index from './components/index.vue'
import detail from './components/detail.vue'
import cart from './components/cart.vue'
import user from './components/user.vue'
import indexlist from './components/listindex.vue'
import order from './components/order.vue'
import detatle from './components/detatle.vue'
import admin from './components/admin.vue'

Vue.use(user, axios)
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

Vue.use(vueRouter)

const routes=[
  {
    path:'/index',
    component:index
  },  
  {
    path:'/',
    redirect:'index'
  },
  {
    path:'/detail/:id',
    component:detail
  },
  {
    path:'/cart',
    component:cart
  },
  {
    path:'/user',
    component:user,
    children:[
      {
        path:'listindex',
        component:indexlist
      },
      {
        path:'',
        redirect:'listindex'
      },
      {
        path:'order',
        component:order
      },
      {
        path:'detatle',
        component:detatle
      }
    ]
  },
  {
    path:'/adminlist',
    component:admin
  }
];

const router = new vueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
