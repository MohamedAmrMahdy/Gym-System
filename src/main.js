import Vue from 'vue'
import vuetify from './plugins/vuetify'
import chartkick from './plugins/chartkick'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  chartkick,
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
