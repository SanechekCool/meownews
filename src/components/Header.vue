<template>
	<v-toolbar color="grey lighten-2" height='90'>
		<img src="/Logo.png" id='header' class='ml-3' style='width:40px;height: 40px;' @click='goHome'>
		<v-toolbar-title  id='header' class='display-2 ml-3' @click='goHome'>MeowNews</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items v-if='!user'>
			<HeaderUnAuth />
		</v-toolbar-items>
		<v-toolbar-items v-else>
			<HeaderAuthorized />
		</v-toolbar-items>
	</v-toolbar>
</template>

<script>
import axios from 'axios'
import HeaderUnAuth from '@/components/HeaderUnAuth'
import HeaderAuthorized from '@/components/HeaderAuthorized'

export default {
	data() {
		return {

		}
	},
	components: {
		HeaderUnAuth, HeaderAuthorized
	},
	computed: {
		user(){
			return this.$root.user
		}
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