import Vue from 'vue'
import Axios from 'axios'
import vuetify from './plugins/vuetify'
import chartkick from './plugins/chartkick'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  chartkick,
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
