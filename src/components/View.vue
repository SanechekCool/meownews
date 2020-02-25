<template>
	<div>
		<Header />
		<v-container>
			<v-layout column>
				<h1 class='font-weight-medium display-3 mt-3'>{{item.title}}</h1>
				<h2 class='mt-2' style='color: #448AFF;'>{{Helper.getTheme(item.theme)}}</h2>
				<v-dialog
				  v-model="dialog"
				  width="700px"
				  height='500px'
				  transition="dialog-transition"
				>
					<template v-slot:activator="{ on }"><img v-if='item.img != "none"' :src="item.img" id='newsImg' class='mt-2' v-on='on'></template>
					<img :src="item.img" id='newsImg'>
				</v-dialog>
				<h2 class='font-weight-thin mt-3'>{{item.text}}</h2>
				<v-btn text @click='read' class='mt-4'>Читать в источнике</v-btn>
			</v-layout>
		</v-container>
		<v-divider class='mx-5'></v-divider>
		<v-container>
			<h2 class='d-inline'>Также: </h2>
			<h2  class='d-inline' id='theme'>{{Helper.getTheme(item.theme)}}</h2>
			<v-container fluid>
				<v-row dense justify="center"> 
					<v-col  v-for='(item, i) in themeNews' :key='i' cols='2' class='mx-6' style="min-width: 360px; max-width: 100%;">
						<v-hover>
							<v-card :class="`elevation-${hover ? 6 : 2}`"
							slot-scope="{ hover }" 
							id='card'
							height='220'
							@click='show(item.id)'
							>
								<v-card-title >
									<div class="col-0 text-truncate display-1">
										{{ item.title }}
									</div>
									<div id='image-block' class='mt-2'>
										<img :src="item.img" style='width: 150px; height: 75px; ' alt="">
									</div>
									<div class="col-0 text-truncate mt-1">
										{{ item.text }}
									</div>
								</v-card-title>
							</v-card>
						</v-hover>
					</v-col>
				</v-row>
			</v-container>
		</v-container>
	</div>
	
</template>

<script>
import axios from 'axios'
import Header from './Header/Header'
import Helper from '../modules/Helper'
import { mapState } from 'vuex'
import NewsHelper from '../modules/NewsHelper'


export default {
	data(){
		return {
			item: {
				title: '',
				text: '',
				pubDate: '',
				url: ''
			},
			themeNews: [],
			Helper: Helper,
			dialog: false,
			news: [],
		}
	},
	components: {
		Header
	},
	computed: {
		Id(){
			return this.$route.params.id
		},
		...mapState(['domain'])
	},
	methods: {
		show(id){
			this.$router.push('/news/' + id)
			window.scrollTo("0", "0")
		},
		read(){
			window.open(this.item.url)
		},
		async resolveNews(){
			const response = await axios.get('https://meowapi.herokuapp.com/api/articles/'+ this.$route.params.id)
			const { title, text, pub_date, url_to_source, theme, id, img } = await response.data
			this.item = { title, text, pub_date, url: url_to_source, id, theme, img }

			let domain = await this.domain + '/articles/filter/theme/' + this.item.theme + '/'
			const resposnse = await NewsHelper.loadNews(domain)
			this.themeNews = resposnse[0].slice(0, 4)
		}
	},
	mounted(){
		window.scrollTo("0", "0")
	},
	async created(){
		this.resolveNews()
	},
	watch: {
		Id(){
			this.resolveNews()
		}
	}
}
</script>

