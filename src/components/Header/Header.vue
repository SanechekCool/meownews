<template>
	<v-toolbar :color='color' height='90'>
		<img src="/Logo.png" id='header' class='ml-3' style='width:40px;height: 40px;' @click='goHome'>
		<v-toolbar-title id='header' class='display-2 ml-3' @click='goHome'>MeowNews</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items v-if='!loggedIn'>
			<HeaderUnAuth />
		</v-toolbar-items>
		<v-toolbar-items v-else>
			<HeaderAuthorized />
		</v-toolbar-items>
	</v-toolbar>
</template>

<script>
import axios from 'axios'
import HeaderUnAuth from './HeaderUnAuth'
import HeaderAuthorized from './HeaderAuthorized'
import { mapState, mapGetters } from 'vuex'

export default {
	data() {
		return {

		}
	},
	components: {
		HeaderUnAuth, HeaderAuthorized
	},
	computed: {
		...mapState(["user"]),
		...mapState(["color"]),
		...mapGetters(["loggedIn"])
	},
	methods: {
		goHome(){
			this.$router.replace('/')
		}
	}
}
</script>

<style>
	#header:hover{
		cursor: pointer;
	}
</style>