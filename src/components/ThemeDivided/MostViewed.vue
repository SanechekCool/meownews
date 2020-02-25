<template>
	<div class='my-12'>
        <h1 class='display-3 font-weight-thin my-12 ml-12' style='text-align: center'>Самые просматриваемые</h1>
        <v-divider class='mt-2 mb-4'></v-divider>
        <v-container fluid>
            <v-row dense justify='center'> 
                <v-col  v-for='(item, i) in news' :key='i'  cols='3' class='mx-12'  style="min-width: 360px; max-width: 100%;">
                    <v-subheader style='color: red; '>Просмотры: {{ item.views }}</v-subheader>
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
</template>

<script>
import axios from 'axios'
import NewsHelper from '../../modules/NewsHelper'
import { mapState } from 'vuex'

export default {
    name: 'MostViewed',
	data() {
        return {
            news: []
        }
    },
	computed: {
        ...mapState(['domain']),
    },
	methods: {
		show(id){
			axios.get("https://meowapi.herokuapp.com/api/articles/views/" + id)
			this.$router.push('/news/' + id + '/')
		},
		
    },
    async created(){
        const domain = this.domain + '/articles/sorted/views'
        let resposnse =  await NewsHelper.loadNews(domain)
        this.news = await resposnse[0].slice(0, 3)
        this.next = await resposnse[1]
        this.loading = await false
    }
	
	
}
</script>