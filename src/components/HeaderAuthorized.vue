<template>
    <v-menu offset-x left :close-on-content-click="false">
		<v-avatar :size="70" :tile='true' slot='activator' class='mr-4'><img :src="user.image"></v-avatar>
		<v-card>
			<v-list class='mr-4'>
	          	<v-list-tile avatar>
	          		<v-dialog
	          		  v-model="dialog"
	          		  width="500px"
	          		>
	          			<v-list-tile-avatar :size='55' id='img' slot='activator'>
		                	<img :src='user.image' class='mr-4'>
		            	</v-list-tile-avatar>
		            	<v-card>

					        <v-card-title class="headline grey lighten-2" primary-title>Изменить аватар</v-card-title>
					        <v-card-text>Выберите файл для загрузки</v-card-text>
					        <v-divider></v-divider>
					        <div id="dropbox" class='mt-3'>
					          	<input type="file"accept="image/*" id="input-file" @change='imageChange'>
					          	<v-flex class='d-inline-flex ml-5'>
					          		<v-icon large class='ml-4'>add_a_photo</v-icon>
					          		<p class='mt-3 pl-2'>Перетащите файл для загрузки</p>
					          	</v-flex>
					        </div>
					        <img v-if='imgsrc != ""' :src="imgsrc" id='imgChanged'>
					        <v-divider></v-divider>
					        <v-card-actions v-if='!loading'>
					            <v-spacer></v-spacer>
					            <v-btn color="primary" flat @click="change">Изменить</v-btn>
					        </v-card-actions>
					        <v-card-actions v-else>
					        	<v-alert v-if='error' type="error">
					        		{{error}}
					        	</v-alert>
					            <v-spacer></v-spacer>
					            <v-progress-circular indeterminate color="primary" class='mr-5' :size='37'></v-progress-circular>
					        </v-card-actions>
					    </v-card>
	          		</v-dialog>
		            <v-list-tile-content>
		                <v-list-tile-title>{{user.firstName}} {{user.lastName}}</v-list-tile-title>
		                <v-list-tile-sub-title>{{user.username}}</v-list-tile-sub-title>
		            </v-list-tile-content>
		            
		        </v-list-tile>
	       	</v-list>
        	<v-divider></v-divider>
          			<v-btn flat @click='signOut'>Выйти</v-btn>
          	</v-list>
		</v-card>
	</v-menu>
</template>

<script>
import cloudinary from 'cloudinary-core'
import axios from 'axios'

export default {
	name: 'HeaderAuthorized',
	data(){
		return {
			dialog: false,
			file: null,
			imgsrc: '',
			error: '',
			loading: false,
			cloudinary: {
		       uploadPreset: 'meownews',
		       apiKey: '651186457518946',
		       cloudName: 'dnkc78u1w'
		    }, 
		}
	},
	computed: {
		user(){
			return this.$root.user
		}
	},
	methods: {
		change(){
			this.loading = true
			const formData = new FormData()
			formData.append('file', this.file)
			formData.append('upload_preset', this.cloudinary.uploadPreset)
			axios.post('https://api.cloudinary.com/v1_1/dnkc78u1w/upload', formData)
			.then((res) => {
				axios.put('https://meowapi.herokuapp.com/api/users/' + this.user.id + '/', {
					"first_name": this.user.firstName,
	  				"last_name": this.user.lastName,
	  				"email": this.user.email,
	  				"image": res.data.secure_url,
	  				"username": this.user.username,
	  				"id": this.user.id
				})
				.then(()=> {
					this.loading = false
					this.$root.user.image = res.data.secure_url
					this.file = null
					this.dialog = false
					this.imgsrc = ''
				})
				.catch((err) => {
					this.loading = false
					this.error = err.message
				})
			})
		},
		signOut(){
			localStorage.token = ''
			this.$root.user = null
		},
		imageChange(e){
			this.file = e.target.files[0]
			if (this.file) {
	        	const reader = new FileReader()
	        	reader.onload = (es) => {
	            	this.imgsrc = es.target.result
	        	}
	        	reader.readAsDataURL(this.file)
	    	}
		}

	},
	mounted() {
      	window.addEventListener("dragover", (e) => {
          e.preventDefault()
          document.querySelector("#dropbox").style.opacity = 0.3
      	})
      	window.addEventListener("drop", (e) => {
            e.preventDefault()
            document.querySelector("#dropbox").style.opacity = 1
          	this.file = e.dataTransfer.files[0]
          	if (this.file) {
	        	const reader = new FileReader()
	        	reader.onload = (es) => {
	            	this.imgsrc = es.target.result
	        	}
	        	reader.readAsDataURL(this.file)
	    	}  
        })
  	}
}
</script>

<style>
	#dropbox {
	    outline: 2px dashed grey;
	    outline-offset: -15px;
	}
	#dropbox p {
	    font-size: 20px;
	    text-align: center;
	    padding: 50px 0;
	}
	#input-file {
	    opacity: 0; 
	    width: 100%;
	    height: 120px;
	    position: absolute;
	    cursor: pointer;
	}
	#img:hover{
		opacity: 0.97;
		cursor: pointer;
	}
	#imgChanged{
		width: 300px;
		height: 400px;
		margin-left: 90px;
	}	
</style>