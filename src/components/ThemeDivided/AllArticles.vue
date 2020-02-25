<template>
    <div id='app'>
        <div v-if='!loading'>

            <!-- Latest -->
            <div class='mb-6'>
                <h1 class='display-3 font-weight-thin my-12 ml-12 text-center'>Последние</h1>
                <v-container fluid>
                    <v-row dense> 
                        <v-col  v-for='n in 2' :key='n'  cols='6'  style="min-width: 360px; max-width: 100%;" class='px-4'>
                            <v-hover>
                                <v-card :class="`elevation-${hover ? 6 : 2}`"
                                slot-scope="{ hover }" 
                                id='card'
                                height='400'
                                @click='show(news[n].id)'
                                >
                                    <v-card-title >
                                        <div class="col-0 text-truncate mt-3 display-1">
                                            {{ news[n].title }}
                                        </div>
                                        <div id='image-block' class='mt-8'>
                                            <img :src="news[n].img" style='width: 300px; height: 150px; ' alt="">
                                        </div>
                                        <div class="col-0 text-truncate mt-3">
                                            {{ news[n].text }}
                                        </div>
                                    </v-card-title>
                                    <v-divider class='mt-2'></v-divider>
                                    <v-card-actions>
                                        <v-row no-gutters>
                                            <v-col>
                                                <v-subheader class='ml-2'>{{Helper.getDate(news[n].pub_date)}}</v-subheader>
                                            </v-col>
                                            <v-col md="auto">
                                                <v-subheader class='ml-2' style='color: #448AFF'>{{Helper.getTheme(news[n].theme)}}</v-subheader>
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
            <MostViewed class='mt-5' />
                
            <!-- Новости в городе -->
            <CityNews  />

            <!-- Все новости -->
            <Section :theme='"home"' class='mt-5' />
            
        </div>

        <!-- Анимация загрузки -->
        <div v-else class='d-flex justify-center align-center' style='height: 700px'>
            <v-avatar
                size="100"
            >
                <img src="../../assets/logo.svg"  id='animation-logo' alt="alt">
            </v-avatar>
        </div>
    </div>
   
</template>

<script>
import axios from 'axios'
import NewsHelper from '../../modules/NewsHelper'
import Helper from '../../modules/Helper'
import { mapState } from 'vuex'
import CityNews from './CityNews'
import Section from './Section'
import MostViewed from './MostViewed'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default {
    name: 'AllArticles',
	data() {
		return {
			loader: false,
            userCity: '',
            loading: true,
            news: [],
            cityNews: [],
            Helper: Helper,
            next: ''
		}
    },
    components: { CityNews, Section, MostViewed },
    computed: {
        ...mapState(['domain']),
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
		async show(id){
			axios.get("https://meowapi.herokuapp.com/api/articles/views/" + id)
			await this.$router.push('/news/' + id + '/')
		}		
		
	},
	async created(){
        const domain = this.domain + '/articles/'
        let resposnse =  await NewsHelper.loadNews(domain)
        this.news = await resposnse[0]
        this.next = await resposnse[1]
        this.loading = await false
    }
}
</script>

