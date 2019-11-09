<template>
	<div id='app'>
		<Header />
		<v-tabs
		v-model='tabs'
		dark
		slider-color="grey lighten-2"
		>
			<v-tab class='ml-5'>Главная</v-tab>
			<v-tab-item>
				<v-container fluid grid-list-xl>
					<h1 class='display-3 font-weight-thin mb-3'>Последние</h1>
					<v-layout   row wrap >
						<v-flex lg6 md12>
							<v-hover>
								<v-card @click='show(news[0].url)' :class="`elevation-${hover ? 6 : 2}`"  slot-scope="{ hover }" id='card' height='300'>
									<v-card-title>
										<h1 class='display-1 ml-5 mb-2 pt-1' id='text-title'>{{news[0].title}}</h1>
										<div id ='text'>
											<p class='ml-4 mt-1 subheading'>{{news[0].text}}</p>
										</div>
									</v-card-title>
									<v-divider class='mt-2'></v-divider>
									<v-card-actions>
										<v-layout row wrap>
											<v-flex xl7 lg6 sm6>
												<v-subheader class='ml-2'>{{getDate(news[0].pubDate)}}</v-subheader>
											</v-flex>
											<v-flex xl3 lg3 sm3 class='ml-4'>
												<v-subheader  class='ml-2'  style='color:#448AFF'>{{getTheme(news[0].theme)}}</v-subheader>
											</v-flex>
											<v-flex xl1 lg2 sm2 class='d-inline-flex'>
												<v-icon class='ml-5'>visibility</v-icon>
												<v-subheader>{{news[0].views}}</v-subheader>
											</v-flex>
										</v-layout>
									</v-card-actions>
								</v-card>
							</v-hover>
						</v-flex>
						<v-flex lg6 md12>
							<v-hover>
								<v-card @click='show(news[1].url)' :class="`elevation-${hover ? 6 : 2}`"  slot-scope="{ hover }" id='card' height='300'>
									<v-card-title>
										<h1 class='display-1 ml-5 mb-2 pt-1' id='text-title'>{{news[1].title}}</h1>
										<div id ='text'>
											<p class='ml-4 mt-1 subheading'>{{news[1].text}}</p>
										</div>
									</v-card-title>
									<v-divider class='mt-2'></v-divider>
									<v-card-actions>
										<v-layout row wrap>
											<v-flex xl7 lg6 sm6>
												<v-subheader class='ml-2'>{{getDate(news[1].pubDate)}}</v-subheader>
											</v-flex>
											<v-flex xl3 lg3 sm3 class='ml-4'>
												<v-subheader class='ml-2' style='color:#448AFF'>{{getTheme(news[1].theme)}}</v-subheader>
											</v-flex>
											<v-flex xl1 lg2 sm2 class='d-inline-flex'>
												<v-icon class='ml-5'>visibility</v-icon>
												<v-subheader>{{news[1].views}}</v-subheader>
											</v-flex>
										</v-layout>
									</v-card-actions>
								</v-card>
							</v-hover>
						</v-flex>
					</v-layout>
					
				</v-container>
				<v-container fluid >
					<h1 class='display-3 font-weight-thin'>Самые просматриваемые </h1>
					<v-divider class='mt-2 mb-4'></v-divider>
					<v-layout row wrap class='ml-5'>
						<v-flex lg2  v-for='(el, i) in topNews' :key='i' class='mx-4'>
							<v-flex lg12 class='d-inline-flex'>
								<v-subheader>Просмотры: {{el.views}}</v-subheader>
							</v-flex>
							<v-hover>		
								<v-card @click='show(el.url)' :class="`elevation-${hover ? 6 : 2}`"  slot-scope="{ hover }" height='220' id='card'> 
									<v-card-title>
										<h4 class='ml-4' id='text-title'>{{el.title}}</h4>
										<div class='mt-3' id='mostviewed-text-block'>
											<p class='ml-2 subheading'>{{el.text}}</p>
										</div>
									</v-card-title>
								</v-card>
							</v-hover>
						</v-flex>
					</v-layout>
					<v-divider class='mt-5'></v-divider>
				</v-container>
				<v-container v-if='userCity!= ""' fluid>
					<h1 class='display-3 font-weight-thin d-inline'>В вашем городе: </h1>
					<h1 class='display-3 font-weight-thin d-inline' id='city'>{{userCity}}</h1>
					<v-divider class='mt-2 mb-4'></v-divider>
					<v-layout v-if='cityNews.length > 0' row wrap>
						<v-flex lg2  v-for='(el, i) in cityNews' :key='i' class='mx-4'>
							<v-hover>		
								<v-card @click='show(el.url)' :class="`elevation-${hover ? 6 : 2}`"  slot-scope="{ hover }" height='220' id='card'> 
									<v-card-title>
										<h4 class='ml-4'>{{el.title}}</h4>
										<div style='height: 20px' class='mt-3'>
											<p class='ml-2 subheading'>{{el.text.split(" ").slice(0, 10).join(" ")}}</p>
										</div>
									</v-card-title>
								</v-card>
							</v-hover>
						</v-flex>
					</v-layout>
					<v-layout v-else row wrap justify-center>
						<h2 class='display-1 font-weight-thin d-inline'>В вашем городе пока нет новостей</h2>
					</v-layout>
					<v-divider class='mt-5'></v-divider>
				</v-container>
				<v-container fluid grid-list-xl>
					<h1 class='display-3 font-weight-thin'>Все</h1>
					<v-layout   row wrap>
						<v-flex lg4 md6 v-for='(item, i) in news.slice(2)' :key='i' class='mb-1'>
							<v-hover>
								<v-card @click='show(item.url)' :class="`elevation-${hover ? 6 : 2}`"  slot-scope="{ hover }" id='card' height='400' > 
									<v-card-title>
										<div style='height: 110px'>
											<h1 class='display-1 ml-5' id='text-title'>{{item.title}}</h1>
										</div>
										<div class='mt-3' id='text-block'>
											<p class='ml-4 subheading'>{{item.text}}</p>
										</div>
									</v-card-title>
									<v-divider class='mt-2'></v-divider>
									<v-card-actions>
										<v-layout row wrap>
											<v-flex xl7 lg6 sm8>
												<v-subheader class='ml-2'>{{getDate(item.pubDate)}}</v-subheader>
											</v-flex>
											<v-flex xl3 lg3 sm2>
												<v-subheader class='ml-2' style='color:#448AFF'>{{getTheme(item.theme)}}</v-subheader>
											</v-flex>
											<v-flex xl2 lg2 sm2 class='d-inline-flex'>
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
			</v-tab-item>
			<v-tab class='ml-5'>Рекомендуемое</v-tab>
			<v-tab-item>
				<Recommended />
			</v-tab-item>
			<v-tab class='ml-5'>Политика</v-tab>
			<v-tab-item>
				<keep-alive>
					<Section :theme='"politics"' :name='"Политика"' />
				</keep-alive>
			</v-tab-item>
			<v-tab class='ml-5'>Культура</v-tab>
			<v-tab-item>
				<Section :theme='"culture"' :name='"Культура"' />
			</v-tab-item>
			<v-tab class='ml-5'>Наука</v-tab>
			<v-tab-item>
				<Section :theme='"science"' :name='"Наука"' />
			</v-tab-item>
			<v-tab class='ml-5'>Религия</v-tab>
			<v-tab-item>
				<Section :theme='"religion"' :name='"Религия"' />
			</v-tab-item>
			<v-tab class='ml-5'>Экономика</v-tab>
			<v-tab-item>
				<Section :theme='"economy"' :name='"Экономика"' />
			</v-tab-item>
		</v-tabs>
	</div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header'
import Recommended from '@/components/Recommended'
import Section from '@/components/Section'

export default {
	name: 'Home',
	data() {
		return {
			items: ['Главная', 'Рекомендуемое', 'Культура', 'Спорт', 'Политика'],
			tabs: null,
			loader: false,
			news: [],
			userCity: '',
			cityNews: [],
			topNews: []
		}
	},
	components: {
		Header, Recommended, Section
	},
	computed: {
		
	},
	methods: {
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
						theme : element["theme"],
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
		async show(id){
			const endPoint =  id.split('/')[5];
			axios.get("https://meowapi.herokuapp.com/api/articles/views/" + endPoint + '/')
			this.$router.push('/news/' + endPoint)
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
		},
		getDate(date){
			const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
			return date.split("").slice(8, 10).join("") + " " + months[new Date(date).getMonth()] + " в " + date.split("").slice(11,16).join("")
								
		}
	},
	async created(){
		const response = await axios.get('https://meowapi.herokuapp.com/api/articles/')
		const data = response.data["results"]
		data.forEach((element, i) => {
			//let { title, text, pubDate, theme, url, views} = element.val() TODO: try this structure
			this.news.push({
				title : element["title"],
				text : element["summary"],
				pubDate : element["pub_date"],
				theme : element["theme"],
				url: element["url"],
				views: element["views"] 
			})
		})
		this.topNews = this.news.sort( (a, b) => a.views - b.views).slice(0, 5)
		this.next = response.data['next']

		navigator.geolocation.getCurrentPosition(async (position) => {
			this.userCity = YMaps.location.city
			const response = await axios.get('https://meowapi.herokuapp.com/api/articles/city/' + this.userCity.toLowerCase() + '/')
			if (response.data.length > 0) {
				for (var i = 0; i < 5; i++){
					this.cityNews.push({
						title : response.data[i]["title"],
						text : response.data[i]["summary"].split(" ").slice(6,).join(" "),
						pubDate : response.data[i]["pub_date"],
						theme : response.data[i]["theme"],
						url: response.data[i]["url"],
						views: response.data[i]["views"]
					})
				}	
			}
		})
				
	}
	
}
</script>

<style>
	#text{
		height: 120px;
	}
	#text2{
		height: 160px;
	}
	#card:hover{
		cursor: pointer;
	}
	#city{
		color: #448AFF;
	}
	#city:hover{
		cursor: pointer;
		border-bottom: 1px solid #448AFF;	
	}
	#text-block{
		height: 180px;
		overflow: hidden;
	    display: -webkit-box;
	    -webkit-line-clamp: 10;
	    -webkit-box-orient: vertical
	}
	#mostviewed-text-block{
		height: 92px;
		overflow: hidden;
	    display: -webkit-box;
	    -webkit-line-clamp: 4;
	    -webkit-box-orient: vertical
	}
	#text-title{
		height: 80px;
		overflow: hidden;
	    display: -webkit-box;
	    -webkit-line-clamp: 10;
	    -webkit-box-orient: vertical
	}
	


	@media screen and (max-width: 830px){
		#text{
			height: 90px;
		}
	}
</style>