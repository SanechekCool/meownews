<template>
    <div>
        <div v-if='!loading'>
            <v-container fluid grid-list-xl>
                <h1 class='display-3 font-weight-thin mb-3'>Последние</h1>
                <v-layout row wrap >
                    <v-flex lg6 md12>
                        <v-hover>
                            <v-card @click='show(news[0].url)' :class="`elevation-${hover ? 6 : 2}`"  slot-scope="{ hover }" id='card' height='300'>
                                <v-card-title>
                                    <h1 class='display-1 ml-5 mb-2 pt-1' id='text-title'>{{news[0].title}}</h1>
                                    <div id='image-block'>
                                        <img :src="news[0].img" style='width: 200px; height: 100px' alt="">
                                    </div>
                                    <div id='text-block'>
                                        <p class='ml-4 mt-1 subheading'>{{news[0].summary}}</p>
                                    </div>
                                </v-card-title>
                                <v-divider class='mt-2'></v-divider>
                                <v-card-actions>
                                    <v-layout row wrap>
                                        <v-flex xl7 lg6 sm6>
                                            <v-subheader class='ml-2'>{{getDate(news[0].pub_date)}}</v-subheader>
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
                                    <div id='image-block'>
                                        <img :src="news[1].img" style='width: 200px; height: 100px' alt="">
                                    </div>
                                    <div id='text-block'>
                                        <p class='ml-4 mt-1 subheading'>{{news[1].summary}}</p>
                                    </div>
                                </v-card-title>
                                <v-divider class='mt-2'></v-divider>
                                <v-card-actions>
                                    <v-layout row wrap>
                                        <v-flex xl7 lg6 sm6>
                                            <v-subheader class='ml-2'>{{getDate(news[1].pub_date)}}</v-subheader>
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
                                    <div id='image-block'>
                                        <img :src="el.img" style='width: 100px; height: 50px' alt="">
                                    </div>
                                    <div class='mt-3' id='mostviewed-text-block'>
                                        <p class='ml-2 subheading'>{{el.summary}}</p>
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
                                    <div id='image-block'>
                                        <img :src="el.img" style='width: 200px; height: 100px' alt="">
                                    </div>
                                    <div style='height: 20px' class='mt-3'>
                                        <p class='ml-2 subheading'>{{el.summary.split(" ").slice(0, 10).join(" ")}}</p>
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
                                        <h1 class='display-1 ml-5' id='text-title'>{{ item.title }}</h1>
                                    </div>
                                    <div id='image-block'>
                                        <img :src="item.img" style='width: 200px; height: 100px' alt="">
                                    </div>
                                    <div class='mt-3' id='text-block'>
                                        <p class='ml-4 subheading'>{{ item.summary }}</p>
                                    </div>
                                </v-card-title>
                                <v-divider class='mt-2'></v-divider>
                                <v-card-actions>
                                    <v-layout row wrap>
                                        <v-flex xl7 lg6 sm8>
                                            <v-subheader class='ml-2'>{{getDate(item.pub_date)}}</v-subheader>
                                        </v-flex>
                                        <v-flex xl3 lg3 sm2>
                                            <v-subheader class='ml-2' style='color: #448AFF'>{{getTheme(item.theme)}}</v-subheader>
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
                    </v-flex>
                </v-layout>
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
            return this.news.sort( (a, b) => a.views - b.views).slice(0, 5)
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
                        let { title, summary, pub_date, theme, url, views } = element
					    this.cityNews.push({ title, summary, pub_date, theme, url, views })
                    }
					else return 0;
				})
			}
		})
				
    },
    
}
</script>