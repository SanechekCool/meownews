<template>
	<div v-if='userCity != ""' class='my-12 text-center'>
        <h1 class='display-3 font-weight-thin d-inline ml-12 '>В вашем городе: </h1>
        <h1 class='display-3 font-weight-thin d-inline text-truncate' id='city'>{{ userCity }}</h1>
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
                        @click='show(elem.id)'
                        >
                            <v-card-title >
                                <div class="col-0 text-truncate mt-3 display-1">
                                    {{ elem.title }}
                                </div>
                                <div id='image-block' class='mt-2'>
                                    <img :src="elem.img" style='width: 150px; height: 75px; ' alt="">
                                </div>
                                <div class="col-0 text-truncate mt-1">
                                    {{ elem.text }}
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
</template>

<script>
import axios from 'axios'
import NewsHelper from '../../modules/NewsHelper'

export default {
    name: 'CityNews',
	data() {
		return {
			cityNews: [],
            userCity: null
		}
	},
	
	methods: {
		show(id){
			axios.get("https://meowapi.herokuapp.com/api/articles/views/" + id)
			this.$router.push('/news/' + id + '/')
		},
		
	},
	async created(){
		navigator.geolocation.getCurrentPosition(async (position) => {
            this.userCity = await YMaps.location.city
            const domain = 'https://meowapi.herokuapp.com/api/articles/filter/city/' + this.userCity + '/'
            
            const response = await NewsHelper.loadNews(domain)
            const data = await response[0]
            
			if (data.length > 0) {
				data.forEach((element, i ) => {
                    if (i < 5) {
                        let { title, text, pub_date, theme, url_to_source, views, id, img } = element
					    this.cityNews.push({ title, text, pub_date, theme, url: url_to_source, views, id, img })
                    }
					else return 0;
				})
			}
		})
		
	},
	
}
</script>