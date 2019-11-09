<template>
	<v-menu left offset-y :close-on-content-click="false">
		<v-btn slot="activator" flat >Войти</v-btn>
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
			<v-alert type="error" >
				{{err}}
			</v-alert>
			<v-btn v-if='!loading' flat @click='login' >Войти</v-btn>
			<v-progress-circular v-else indeterminate color="black" class='mr-5 mb-1' :size='37'></v-progress-circular>
			<v-dialog
			  v-model="dialog"
			  width="700"
			  transition="dialog-transition"
			>
				<v-btn color="blue accent-2" class='ml-2' dark  slot="activator">Создать аккаунт</v-btn>
				<v-card class="elevation-2 ">
					<v-toolbar dark :color="color" class='mb-2'>
						<v-toolbar-title>Регистрация</v-toolbar-title>
					</v-toolbar>
                     <v-row>
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
                        <small class='mr-4'>Уже есть аккаунт?&nbsp; <router-link to='/login'>Войти</router-link></small>
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
			color: 'primary',
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
		signIn(username, password){
			axios({
				method: 'post',
				url: 'https://meowapi.herokuapp.com/api-token-auth/',
				data: {
					"username": username,
					"password": password
				}
			})
			.then((response) => {
				localStorage.token = response.data.token
				axios({
		  			method: 'get',
		  			url: 'https://meowapi.herokuapp.com/api/get-user-detail/',
		  			headers: {
		  				'Authorization': 'Token ' + response.data.token
		  			}
		  		})
		  		.then((resp) => {
		  			this.$root.user = {
		  				firstName: resp.data.first_name,
		  				image: resp.data.image,
		  				lastName: resp.data.last_name,
		  				email: resp.data.email,
		  				id: resp.data.id,
		  				username: resp.data.username
		  			}
		  		})			
	  		})
	  		.catch((err)=> {
	  			this.err = err.message
				this.loading = false
			})	
		},
		login(){
			this.loading = true
			this.signIn(this.username, this.password)
			
		},
		signUp(){
			this.loading = true
			const formData = new FormData()
			formData.append('file', this.file)
			formData.append('upload_preset', this.cloudinary.uploadPreset)
			axios.post('https://api.cloudinary.com/v1_1/dnkc78u1w/upload', formData)
			.then((res) => {
				axios({
					method: 'post',
					url: 'https://meowapi.herokuapp.com/api/users/',
					data : {
						"username": this.usernameReg,
						"email": this.emailReg,
						"first_name": this.firstName,
						"last_name": this.lastName,
						"password": this.passwordReg,
						"image": res.data.secure_url
					}
				})
				.then(() => {
					this.signIn(this.usernameReg, this.passwordReg)
				})
				.catch( (error) => {
					this.loading = false
					this.error = error.message 
				}) 
			})
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