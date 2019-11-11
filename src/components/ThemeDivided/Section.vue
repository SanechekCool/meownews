<template>
	<div>
		<div v-if='loading'>
			<v-progress-circular 
				indeterminate
				color="black"
			></v-progress-circular>
		</div>
		<div else>
			<v-container fluid grid-list-xl>
				<h1 class='display-3 font-weight-thin' style='color: #448AFF'>{{ name }}</h1>
				<v-layout v-if='news' row wrap>
					<v-flex lg4 md6 v-for ='(item, i) in news' :key='i' class='mb-1'>
						<v-hover>
							<v-card @click='show(item.url)' :class="`elevation-${hover ? 6 : 2}`"  slot-scope="{ hover }" id='card' height='400' > 
								<v-card-title>
									<div style='height: 110px'>
										<h1 class='display-1 ml-5'>{{ item.title }}</h1>
									</div>
									<div style='height: 180px' class='mt-3'>
										<p class='ml-4 subheading'>{{ item.summary }}</p>
									</div>
								</v-card-title>
								<v-divider class='mt-2'></v-divider>
								<v-card-actions>
									<v-layout row wrap>
										<v-flex lg7>
											<v-subheader class='ml-2' >{{getDate(item.pub_date)}}</v-subheader>
										</v-flex>
										<v-flex lg3>
											<v-subheader class='ml-2' style='color:#448AFF'>{{name}}</v-subheader>
										</v-flex>
										<v-flex lg2 class='d-inline-flex'>
											<v-icon class='ml-4'>visibility</v-icon>
											<v-subheader  >{{item.views}}</v-subheader>
										</v-flex>
									</v-layout>
								</v-card-actions>
							</v-card>
						</v-hover>							
					</v-flex>
					<v-flex lg12 class='mt-5'>
						<v-hover>
							<v-card 
							@click='loadMore' 
							:class="`elevation-${hover ? 12 : 2}`" 
							class='mt-5' slot-scope="{ hover }" 
							id='card' height='200' 
							color='blue accent-2' 
							dark
							>
								<v-layout align-center justify-center row fill-height>
									<h1 v-if='!loader' class='display-3 font-weight-thin'>Загрузить еще</h1>
									<v-progress-circular v-else
										indeterminate
										color="white"
									></v-progress-circular>
								</v-layout>
							</v-card>
						</v-hover>
					</v-flex>
				</v-layout>
				
			</v-container>	
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import NewsHelper from '../../modules/NewsHelper'
import { mapState } from 'vuex'

export default {
    name: 'Section',
    props: ["theme", "name"],
	data() {
		return {
			loader: false,
			loading: true,
			news: [],
			next: ''
		}
	},
	computed: {
		...mapState(["domain"]),
		...mapState(['textColor']),
    },
	methods: {
		async loadMore(){
			this.loader = true
            const response = await NewsHelper.loadNews(this.next)
            this.news.push(...response[0])
            this.next = response[1]
            this.loader = false
		},
		getDate(date){
			const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
			return date.split("").slice(8, 10).join("") + " " + months[new Date(date).getMonth()] + " в " + date.split("").slice(11,16).join("")				
		},
		
		show(id){
			const _id =  id.split('/')[5];
			axios.get("https://meowapi.herokuapp.com/api/articles/views/" + _id)
			this.$router.push('/news/' + _id + '/')
		},
		
	},
	async mounted(){
		const domain = this.domain + '/articles/theme/' + this.theme + '/'
        const resposnse = await NewsHelper.loadNews(domain)
        this.news = resposnse[0]
        this.next = resposnse[1]
        this.loading = await false
		
	},
	
}
</script>