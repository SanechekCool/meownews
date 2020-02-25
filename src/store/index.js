import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  	state: {
		domain: 'https://meowapi.herokuapp.com/api',
		user: {},
		color: "#E0E0E0",
		textColor: '#448AFF',
		
	},
	getters: {
		loggedIn(){
			return localStorage.getItem("token") != undefined
		}
	},
  	mutations: {
		createUser(state, user){
			state.user = user
		},
		signOut(state){
			localStorage.removeItem("token")
			state.user = {}
		}
  	},
  	actions: {
		async GET_INFO({commit, state}, token) {
			localStorage.setItem("token", token)
			let info = (await axios({
				method: 'get',
				url: state.domain + '/get-user-detail/',
				headers: {
					"Authorization": 'Token ' + token
				}
			})).data
			const { first_name, last_name, email, username, image, id } = info
			const user = { first_name, last_name, email, username, image, id }
			commit("createUser", user)
		}
		
  	},
  
})
