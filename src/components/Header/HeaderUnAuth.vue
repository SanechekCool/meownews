<template>
	<v-menu left offset-y :close-on-content-click="false">
		<template v-slot:activator="{ on }"><v-btn v-on='on' text >Войти</v-btn></template>
		
	  	<v-card class='pa-3 pr-5' >
			<v-text-field
			  label="Имя пользователя"
			  outlined
			  :color='color'
			  v-model='username'
			></v-text-field>
			<v-text-field
			  name="password"
			  label="Пароль"
			  outlined
			  :color='color'
			  type='password'
			  v-model='password'
			></v-text-field>
			<v-alert type="error" v-if='err'>
				{{ err }}
			</v-alert>
			<v-row v-if='!loading' >
				<v-col cols='4'>
					<v-btn text @click='login' >Войти</v-btn>
				</v-col>
				<v-col cols='8'>
					<v-btn  class='ml-2' :color='color' dark  @click='dialog = true'>Создать аккаунт</v-btn>
				</v-col>
			</v-row>
			
			<div v-else class='d-flex justify-center align-center'>
				<v-avatar
					size="50"
				>
					<img src="../../assets/logo.svg"  id='animation-logo' alt="alt">
				</v-avatar>
			</div>
			<v-dialog
			  v-model="dialog"
			  width="1200"
			  transition="dialog-transition"
			>
				<v-card >
					<v-toolbar dark :color="color" class='mb-2'>
						<v-toolbar-title>Регистрация</v-toolbar-title>
					</v-toolbar>
                     <v-row>
						<v-col cols="12" sm="6">
                           <v-text-field class='px-2' name='name' prepend-icon="mdi-face" label="Имя" v-model='firstName' :color='color' type="text"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field class='px-2' name='surname' prepend-icon="mdi-face" label="Фамилия" v-model='lastName' :color='color' type="text"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                           <v-text-field class='px-2' name='username' prepend-icon="mdi-account" label="Имя пользователя" v-model='usernameReg' :color='color' type="text"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field class='px-2' name='email' prepend-icon="mdi-email" label="E-Mail" v-model='email' :color='color' type="text"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                             <v-file-input class='px-2' type="file" accept="image/*"  v-model='file' prepend-icon="mdi-camera" :color='color' label="Фото профиля"></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field class='px-2'  prepend-icon="mdi-key" label="Пароль" v-model='password' :color='color' type="password" @keyup.enter='register'></v-text-field>
                        </v-col>
                    </v-row>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn :color="color" @click='signUp' dark>Зарегистрироваться</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-card>
	</v-menu>
</template>

<script>
import axios from 'axios'
import cloudinary from 'cloudinary-core'
import Auth from '../../modules/Auth'

export default {
	name: 'HeaderUnAuth',
	data() {
		return {
			username: '',
			cloudinary: {
		       uploadPreset: 'meownews',
		       apiKey: '651186457518946',
		       cloudName: 'dnkc78u1w'
		    }, 
			show: false,
			lastName: '',
			firstName: '',
			color: '#448AFF',
			passwordReg: '',
			file: null,
			imageSrc: '',
			error: '',
			loading: false,
			err: '',
			alert: false,
			email: '',
			usernameReg: '',
			dialog: false,
			password: ''
		}
	},
	computed: {
	},
	methods: {
		fileChange(e){
			this.file = e.target.files[0]
			if (this.file) {
	        	const reader = new FileReader()
	        	reader.onload = (es) => {
	            	this.imageSrc = es.target.result
	        	}
	        	reader.readAsDataURL(this.file)
	    	}
		},
		async signIn(username, password){
			const token = await Auth.signIn(username, password)
			if (typeof token == "object") this.err = token
			else this.$store.dispatch("GET_INFO", token)
			this.loading = false
		},
		login(){
			this.loading = true
			this.signIn(this.username, this.password)
			
		},
		async signUp(){
			this.loading = true
			const formData = new FormData()
			formData.append('file', this.file)
			formData.append('upload_preset', this.cloudinary.uploadPreset)
			let photoUrl = (await axios.post('https://api.cloudinary.com/v1_1/dnkc78u1w/upload', formData)).data.secure_url
			const token = await Auth.signUp(this.emailReg, this.usernameReg, this.passwordReg, photoUrl, this.firstName, this.lastName);

			if (typeof token == "object") this.err = token
			else this.$store.dispatch("GET_INFO", token)	

		}
	}

}
</script>

<style>
	
</style>