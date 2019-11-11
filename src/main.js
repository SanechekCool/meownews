import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  data: {
    user: null
  },
  created(){
    if (store.getters.loggedIn) {
			store.dispatch("GET_INFO", localStorage.getItem("token"))
		}
		else {
			localStorage.removeItem("token") 
		}
    
  },
  render: h => h(App)
}).$mount('#app')
