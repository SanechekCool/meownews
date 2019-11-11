<template>
	<v-menu left offset-y :close-on-content-click="false">
		<template v-slot:activator="{ on }"><v-btn v-on='on' text >Войти</v-btn></template>
		
	  	<v-card class='pa-3 pr-5' width='300' height='270'>
			<v-text-field
			  label="Имя пользователя"
			  solo
			  v-model='username'
			></v-text-field>
			<v-text-field
			  name="password"
			  label="Пароль"
			  solo
			  type='password'
			  v-model='password'
			></v-text-field>
			<v-alert dismissible type="error" v-if='err'>
				{{err}}
			</v-alert>
			<v-btn v-if='!loading' text @click='login' >Войти</v-btn>
			<v-progress-circular v-else indeterminate color="black" class='mr-5 mb-1' :size='37'></v-progress-circular>
			<v-dialog
			  v-model="dialog"
			  width="1000"
			  transition="dialog-transition"
			>
				<template v-slot:activator="{ on }"><v-btn  class='ml-2' :color='color' dark v-on='on'>Создать аккаунт</v-btn></template>
				
				<v-card >
					<v-toolbar dark :color="color" class='mb-2'>
						<v-toolbar-title>Регистрация</v-toolbar-title>
					</v-toolbar>
                     <v-row>
						<v-col cols="12" sm="6">
                           <v-text-field class='px-2' prepend-icon="mdi-account" label="Имя" v-model='firstName' :color='color' type="text"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field class='px-2' prepend-icon="mdi-email" label="Фамилия" v-model='lastName' :color='color' type="text"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                           <v-text-field class='px-2' prepend-icon="mdi-account" label="Имя пользователя" v-model='usernameReg' :color='color' type="text"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field class='px-2' prepend-icon="mdi-email" label="E-Mail" v-model='email' :color='color' type="text"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                             <v-file-input class='px-2' type="file" accept="image/*"  v-model='file' prepend-icon="mdi-camera" :color='color' label="Фото профиля"></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field class='px-2' prepend-icon="mdi-key" label="Пароль" v-model='password' :color='color' type="password" @keyup.enter='register'></v-text-field>
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

			if (typeof token == Object) this.err = token
			else this.$store.dispatch("GET_INFO", token)	

		}
	}

}
</script>

<style>
	#file{
		position: absolute;
	    opacity: 0;
	    outline: none;
	    cursor: pointer;
	    display: block;
	}
</style>