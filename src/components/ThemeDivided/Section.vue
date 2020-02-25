<template>
	<div>
		<div v-if='loading' justify='center'>
			<v-progress-circular 
				indeterminate
				color="black"
			></v-progress-circular>
		</div>
		<div else>
			<v-container fluid >
                <h1 v-if='!loading' class='display-3 font-weight-thin my-12 ml-12 text-center'>{{ Helper.getTheme(theme) }}</h1>
                <v-container fluid>
                    <v-row dense> 
                        <v-col  v-for='(el, i) in news.slice(2, )' :key='i'  cols='4'  style="min-width: 360px; max-width: 100%;" class='px-4'>
                            <v-hover>
                                <v-card :class="`elevation-${hover ? 6 : 2}`"
                                slot-scope="{ hover }" 
                                id='card'
                                height='400'
                                @click='show(el.id)'
                                >
                                    <v-card-title >
                                        <div class="col-0 text-truncate mt-3 display-1">
                                            {{ el.title }}
                                        </div>
                                        <div v-if='el.img != undefined' id='image-block' class='mt-8'>
                                            <img :src="el.img" style='width: 300px; height: 150px; ' alt="">
                                        </div>
                                        <div class="col-0  text-truncate mt-3">
                                            {{ el.text }}
                                        </div>
                                    </v-card-title>
                                    <div style='position: absolute; bottom: 1px; width: 100%'>
                                        <v-divider class='mt-2' ></v-divider>
                                    <v-card-actions >
                                        <v-row no-gutters>
                                            <v-col>
                                                <v-subheader class='ml-2'>{{Helper.getDate(el.pub_date)}}</v-subheader>
                                            </v-col>
                                            <v-col md="auto">
                                                <v-subheader class='ml-2' style='color: #448AFF'>{{Helper.getTheme(el.theme)}}</v-subheader>
                                            </v-col>
                                            <v-col lg="2">
                                                <div class='d-inline-flex ml-4'>
                                                    <v-icon color='red'>mdi-eye-outline</v-icon> 
                                                    <v-subheader style='color: red'>{{ el.views }}</v-subheader>
                                                </div>
                                                
                                            </v-col>
                                        </v-row>
                                    </v-card-actions>
                                    </div>
                                    
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                    <v-col v-if='!loading' cols='12'>
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
	</div>
</template>

<script>
import axios from 'axios'
import NewsHelper from '../../modules/NewsHelper'
import Helper from '../../modules/Helper'
import { mapState } from 'vuex'

export default {
    name: 'Section',
    props: ["theme"],
	data() {
		return {
			loader: false,
			loading: true,
            news: [],
            Helper: Helper,
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
		async show(id){
			axios.get("https://meowapi.herokuapp.com/api/articles/views/" + id)
			await this.$router.push('/news/' + id + '/')
		},
		
	},
	async mounted(){
        let domain 
        if (this.theme == 'home') domain = this.domain + '/articles/';
        else domain = this.domain + '/articles/filter/theme/' + this.theme + '/'
        const resposnse = await NewsHelper.loadNews(domain)
        this.news = resposnse[0]
        this.next = resposnse[1]
        this.loading = await false
		
	},
	
}
</script>