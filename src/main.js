import Vue from 'vue'
import App from './App.vue'

import './assets/statics/site/css/style.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import vueRouter from 'vue-router'
import index from './components/index.vue'

Vue.config.productionTip = false

Vue.use(vueRouter)

const routes=[
  {
    path:'/index',
    component:index
  }

];

const router = new vueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
