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
    if (localStorage.token != undefined) {
      axios({
        method: 'get',
        url: 'https://meowapi.herokuapp.com/api/get-user-detail/',
        headers: {
          'Authorization': 'Token ' + this.token
        }
      })
      .then((response) => {
        this.user = {
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          username: response.data.username,
          image: response.data.image,
          id: response.data.id,
          pas: response.data.password
        }
      })
    }
    else this.user = null
  },
  render: h => h(App)
}).$mount('#app')
