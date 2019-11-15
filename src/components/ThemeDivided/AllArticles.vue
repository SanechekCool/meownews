<template>
    <div id='app'>
        <div v-if='!loading'>

            <!-- Latest -->
            <div class='mb-6'>
                <h1 class='display-3 font-weight-thin my-12 ml-12'>Последние</h1>
                <v-container fluid>
                    <v-row dense> 
                        <v-col  v-for='n in 2' :key='n'  cols='6'  style="min-width: 360px; max-width: 100%;" class='px-4'>
                            <v-hover>
                                <v-card :class="`elevation-${hover ? 6 : 2}`"
                                slot-scope="{ hover }" 
                                id='card'
                                height='400'
                                @click='show(news[n].url)'
                                >
                                    <v-card-title >
                                        <div class="col-0 text-truncate mt-3 display-1">
                                            {{ news[n].title }}
                                        </div>
                                        <div id='image-block' class='mt-8'>
                                            <img :src="news[n].img" style='width: 300px; height: 150px; ' alt="">
                                        </div>
                                        <div class="col-0 text-truncate mt-3">
                                            {{ news[n].summary }}
                                        </div>
                                    </v-card-title>
                                    <v-divider class='mt-2'></v-divider>
                                    <v-card-actions>
                                        <v-row no-gutters>
                                            <v-col>
                                                <v-subheader class='ml-2'>{{getDate(news[n].pub_date)}}</v-subheader>
                                            </v-col>
                                            <v-col md="auto">
                                                <v-subheader class='ml-2' style='color: #448AFF'>{{getTheme(news[n].theme)}}</v-subheader>
                                            </v-col>
                                            <v-col lg="2">
                                                <div class='d-inline-flex ml-6'>
                                                    <v-icon color='red'>mdi-eye-outline</v-icon> 
                                                    <v-subheader style='color: red'>{{ news[n].views }}</v-subheader>
                                                </div>
                                                
                                            </v-col>
                                        </v-row>
                                    </v-card-actions>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
                


            <!-- Most viewed    -->
            <div class='mb-6'>
                <h1 class='display-3 font-weight-thin my-12 ml-12'>Самые просматриваемые</h1>
                <v-divider class='mt-2 mb-4'></v-divider>
                <v-container fluid>
                    <v-row dense> 
                        <v-col  v-for='(item, i) in topNews' :key='i'  cols='2' class='mx-2' style="min-width: 360px; max-width: 100%;">
                            <v-subheader style='color: red; '>Просмотры: {{ item.views }}</v-subheader>
                            <v-hover>
                                <v-card :class="`elevation-${hover ? 6 : 2}`"
                                slot-scope="{ hover }" 
                                id='card'
                                height='200'
                                @click='show(item.url)'
                                >
                                    <v-card-title >
                                        <div class="col-0 text-truncate mt-3 display-1">
                                            {{ item.title }}
                                        </div>
                                        <div id='image-block' class='mt-2'>
                                            <img :src="item.img" style='width: 150px; height: 75px; ' alt="">
                                        </div>
                                        <div class="col-0 text-truncate mt-1">
                                            {{ item.summary }}
                                        </div>
                                    </v-card-title>
                                    <!-- <v-card-actions>
                                        <v-row no-gutters>
                                            <v-col>
                                                <v-subheader class='ml-2'>{{getDate(news[n].pub_date)}}</v-subheader>
                                            </v-col>
                                            <v-col md="auto">
                                                <v-subheader class='ml-2' style='color: #448AFF'>{{getTheme(news[n].theme)}}</v-subheader>
                                            </v-col>
                                            <v-col lg="2">
                                                <div class='d-inline-flex ml-6'>
                                                    <v-icon color='red'>mdi-eye-outline</v-icon> 
                                                    <v-subheader style='color: red'>{{ news[n].views }}</v-subheader>
                                                </div>
                                                
                                            </v-col>
                                        </v-row>
                                    </v-card-actions> -->
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
                

            <!-- TODO: Divide into components -->
            
            <div v-if='userCity != ""' >
                <h1 class='display-3 font-weight-thin d-inline ml-12'>В вашем городе: </h1>
                <h1 class='display-3 font-weight-thin d-inline' id='city'>{{userCity}}</h1>
                <v-divider class='mt-12 mb-4'></v-divider>
                <v-container fluid v-if='cityNews.length > 0'>
                    <v-row dense> 
                        <v-col  v-for='(elem, i) in cityNews' :key='i'  cols='1' class='mx-2' style="min-width: 360px; max-width: 100%;">
                            <v-subheader style='color: red; '>Просмотры: {{ elem.views }}</v-subheader>
                            <v-hover>
                                <v-card :class="`elevation-${hover ? 6 : 2}`"
                                slot-scope="{ hover }" 
                                id='card'
                                height='200'
                                @click='show(elem.url)'
                                >
                                    <v-card-title >
                                        <div class="col-0 text-truncate mt-3 display-1">
                                            {{ elem.title }}
                                        </div>
                                        <div id='image-block' class='mt-2'>
                                            <img :src="elem.img" style='width: 150px; height: 75px; ' alt="">
                                        </div>
                                        <div class="col-0 text-truncate mt-1">
                                            {{ elem.summary }}
                                        </div>
                                    </v-card-title>
                                    <!-- <v-card-actions>
                                        <v-row no-gutters>
                                            <v-col>
                                                <v-subheader class='ml-2'>{{getDate(news[n].pub_date)}}</v-subheader>
                                            </v-col>
                                            <v-col md="auto">
                                                <v-subheader class='ml-2' style='color: #448AFF'>{{getTheme(news[n].theme)}}</v-subheader>
                                            </v-col>
                                            <v-col lg="2">
                                                <div class='d-inline-flex ml-6'>
                                                    <v-icon color='red'>mdi-eye-outline</v-icon> 
                                                    <v-subheader style='color: red'>{{ news[n].views }}</v-subheader>
                                                </div>
                                                
                                            </v-col>
                                        </v-row>
                                    </v-card-actions> -->
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-container>
                <v-layout v-else row wrap justify-center>
                    <h2 class='display-1 font-weight-thin d-inline'>В вашем городе пока нет новостей</h2>
                </v-layout>
                <v-divider class='mt-5'></v-divider>
            </div>


            <v-container fluid grid-list-xl>
                <h1 class='display-3 font-weight-thin my-12 ml-12'>Все</h1>
                <v-container fluid>
                    <v-row dense> 
                        <v-col  v-for='(el, i) in news.slice(2, )' :key='i'  cols='4'  style="min-width: 360px; max-width: 100%;" class='px-4'>
                            <v-hover>
                                <v-card :class="`elevation-${hover ? 6 : 2}`"
                                slot-scope="{ hover }" 
                                id='card'
                                height='400'
                                @click='show(el.url)'
                                >
                                    <v-card-title >
                                        <div class="col-0 text-truncate mt-3 display-1">
                                            {{ el.title }}
                                        </div>
                                        <div id='image-block' class='mt-8'>
                                            <img :src="el.img" style='width: 300px; height: 150px; ' alt="">
                                        </div>
                                        <div class="col-0 text-truncate mt-3">
                                            {{ el.summary }}
                                        </div>
                                    </v-card-title>
                                    <v-divider class='mt-2'></v-divider>
                                    <v-card-actions>
                                        <v-row no-gutters>
                                            <v-col>
                                                <v-subheader class='ml-2'>{{getDate(el.pub_date)}}</v-subheader>
                                            </v-col>
                                            <v-col md="auto">
                                                <v-subheader class='ml-2' style='color: #448AFF'>{{getTheme(el.theme)}}</v-subheader>
                                            </v-col>
                                            <v-col lg="2">
                                                <div class='d-inline-flex ml-4'>
                                                    <v-icon color='red'>mdi-eye-outline</v-icon> 
                                                    <v-subheader style='color: red'>{{ el.views }}</v-subheader>
                                                </div>
                                                
                                            </v-col>
                                        </v-row>
                                    </v-card-actions>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                    <v-col cols='12'>
                        <v-hover>
                            <v-card 
                            @click='loadMore' 
                            :class="`elevation-${hover ? 12 : 2}`" 
                            class='mt-5' slot-scope="{ hover }" 
                            id='card' height='200' 
                            :color='textColor' 
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
                    </v-col>
                </v-container>
            </v-container>	
        </div>
        <div v-else>
            <v-progress-circular 
            indeterminate
            color="black"
            ></v-progress-circular>
        </div>
    </div>
   
</template>

<script>
import axios from 'axios'
import NewsHelper from '../../modules/NewsHelper'
import { mapState } from 'vuex'

export default {
    name: 'AllArticles',
	data() {
		return {
			loader: false,
            userCity: '',
            loading: true,
            news: [],
            cityNews: [],
            next: ''
		}
    },
    computed: {
        ...mapState(['domain']),
        ...mapState(['textColor']),
        topNews(){
            return this.news.sort( (a, b) => a.views - b.views).reverse().slice(0, 5)
        }
    },
	methods: {
		async loadMore(){
            this.loader = true
            const response = await NewsHelper.loadNews(this.next)
            this.news.push(...response[0])
            this.next = response[1]
            this.loader = false
		},
		show(id){
			const _id =  id.split('/')[5];
			axios.get("https://meowapi.herokuapp.com/api/articles/views/" + _id)
			this.$router.push('/news/' + _id + '/')
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
        const domain = this.domain + '/articles/'
        let resposnse = await NewsHelper.loadNews(domain)
        this.news = resposnse[0]
        this.next = resposnse[1]
        this.loading = await false

		navigator.geolocation.getCurrentPosition(async (position) => {
			this.userCity = await YMaps.location.city
            const response = await axios.get('https://meowapi.herokuapp.com/api/articles/city/' + this.userCity + '/')
			const data = response.data["results"]
			if (data.length > 0) {
				data.forEach((element, i ) => {
                    if (i < 5) {
                        let { title, summary, pub_date, theme, url, views, img } = element
					    this.cityNews.push({ title, summary, pub_date, theme, url, views, img })
                    }
					else return 0;
				})
			}
		})
				
    },
    
}
</script>

<style >

</style>