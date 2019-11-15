<template>
	<div>
		<Header />
		<v-container>
			<v-layout column>
				<h1 class='font-weight-medium display-3 mt-3'>{{item.title}}</h1>
				<h2 class='mt-2' style='color: #448AFF;'>{{getTheme(item.theme)}}</h2>
				<v-dialog
				  v-model="dialog"
				  width="700px"
				  height='500px'
				  transition="dialog-transition"
				>
					<template v-slot:activator="{ on }"><img v-if='item.src!= "none"' :src="item.src" id='newsImg' class='mt-2' v-on='on'></template>
					<img :src="item.src" id='newsImg'>
				</v-dialog>
				<h2 class='font-weight-thin mt-3'>{{item.text}}</h2>
				<v-btn text @click='read' class='mt-4'>Читать в источнике</v-btn>
			</v-layout>
		</v-container>
		<v-divider class='mx-5'></v-divider>
		<v-container>
			<h2 class='d-inline'>Также: </h2>
			<h2  class='d-inline' id='theme'>{{getTheme(item.theme)}}</h2>
			<v-layout  row wrap class='mt-4 mb-4'>
				<v-flex lg2  v-for='(el, i) in themeNews' :key='i' class='mx-4'>
					<v-hover>		
						<v-card @click='show(el.url)' :class="`elevation-${hover ? 6 : 2}`"  slot-scope="{ hover }" id='card' height='220'> 
							<v-card-title>
								<h4 class='ml-4'>{{el.title}}</h4>
								<div class='mt-3' id='also-text-block'>
									<p class='ml-2 subheading'>{{el.text}}</p>
								</div>
							</v-card-title>
						</v-card>
					</v-hover>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
	
</template>

<script>
import axios from 'axios'
import Header from './Header/Header'

export default {
	data(){
		return {
			item: {
				title: '',
				text: '',
				pubDate: '',
				url: ''
			},
			dialog: false,
			news: [],
			resp: null
		}
	},
	components: {
		Header
	},
	computed: {
		Id(){
			return this.$route.params.id
		},
		themeNews(){
			var i = Math.floor(Math.random() * (this.news.length - 5))
			if (window.innerWidth > 1600){
				return this.news.slice(i, i+5)
			}
			else return this.news.slice(i, i+4)
		}
	},
	methods: {
		show(url){
			this.$router.replace('/news/' + url.split("/")[5])
			window.scrollTo("0", "0")
		},
		read(){
			window.open(this.item.url)
		},
		getDate(date){
			const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "					декабря"]
			return date.split("").slice(8, 10).join("") + " " + months[new Date(date).getMonth()] + " в " + date.split("").slice(11,16).join("")
								
		},
		getTheme(theme){
			switch(theme){
				case 'politics': 
					return 'Политика'
					break
				case 'science':
					return 'Наука'
					break
				case 'religion':
					return 'Религия'
					break
				case 'culture':	
					return 'Культура'
					break
				case 'economy':	
					return 'Экономика'
					break
				case 'world':	
					return 'В мире'
					break
			}
		}
	},
	created(){
		axios.get('https://meowapi.herokuapp.com/api/articles/'+ this.$route.params.id)
		.then( (response) => {
			this.resp = response.data
			this.item = {
				title: this.resp['title'],
				text : this.resp["summary"],
				pubDate: this.resp['pub_date'],
				url: this.resp['url_to_source'],
				theme: this.resp['theme'],
				src: this.resp["img"]
			}
		})

	},
	watch: {
		item(newVal){
			if (newVal){
				axios.get("https://meowapi.herokuapp.com/api/articles/theme/" + newVal.theme + "/")
				.then( (response) => {
					this.response = response.data['results']
					this.response.forEach((el, i) => {
						this.news.push({
							title : this.response[i]["title"],
							text : this.response[i]["summary"],
							url: this.response[i]["url"]
						})
					})
				})
			}
		},
		Id(newVal){
			if (newVal){
				axios.get('https://meowapi.herokuapp.com/api/articles/'+ newVal)
				.then( (response) => {
					this.resp = response.data
					this.item = {
						title: this.resp['title'],
						text : this.resp["summary"],
						pubDate: this.resp['pub_date'],
						url: this.resp['url_to_source'],
						theme: this.resp['theme'],
						src: this.resp["img"]
					}
				})

			}
		}
	}
}
</script>

