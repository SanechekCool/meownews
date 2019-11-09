<template>
	<div>
		<v-container fluid grid-list-xl>
			<h1 class='display-3 font-weight-thin'>Все</h1>
			<v-layout  row wrap>
				<v-flex lg4 md6 v-for ='(item, i) in news' :key='i' class='mb-1'>
					<v-hover>
						<v-card @click='show(item.url)' :class="`elevation-${hover ? 6 : 2}`"  slot-scope="{ hover }" id='card' height='400' > 
							<v-card-title>
								<div style='height: 110px'>
									<h1 class='display-1 ml-5'>{{checkTitle(item.title)}}</h1>
								</div>
								<div style='height: 180px' class='mt-3'>
									<p class='ml-4 subheading'>{{checkText(item.text)}}</p>
								</div>
							</v-card-title>
							<v-divider class='mt-2'></v-divider>
							<v-card-actions>
								<v-layout row wrap>
									<v-flex lg7>
										<v-subheader class='ml-2' >{{getDate(item.pubDate)}}</v-subheader>
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
</template>

<script>
import axios from 'axios'

export default {
    name: 'Section',
    props: ["theme", "name"],
	data() {
		return {
			next: null,
			news: [],
			loader: false
		}
	},
	methods: {
		getDate(date){
			const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
			return date.split("").slice(8, 10).join("") + " " + months[new Date(date).getMonth()] + " в " + date.split("").slice(11,16).join("")				
		},
		
		show(id){
			const endPoint = id.split('/')[5]
			this.$router.push('/news/' + endPoint)
		},
		async loadMore(){
			this.loader = true
			try {
				const response = await axios.get(this.next)
				let data = response.data["results"]
				data.forEach((element, i) => {
					//let { title, text, pubDate, theme, url, views} = element.val() TODO: try this structure
					this.news.push({
						title : element["title"],
						text : element["summary"],
						pubDate : element["pub_date"],
						url: element["url"],
						views: element["views"] 
					})
				})
				this.next = response.data['next']
			}
			catch(err) {
				console.error(err);
			}
			this.loader = false
		},
	},
	async mounted(){
		const response = axios.get("https://meowapi.herokuapp.com/api/articles/theme/" + this.theme)
		let data = response.data["results"]
		data.forEach( (element, i) => {
			//let { title, text, pubDate, theme, url, views} = element.val() TODO: try this structure
			this.news.push({
				title : element["title"],
				text : element["summary"],
				pubDate : element["pub_date"],
				url: element["url"],
				views: element["views"] 
			})
			
		})
		this.next = response.data['next']
	}
}
</script>