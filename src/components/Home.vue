<template>
	<div id='app'>
		<Header />
		<v-tabs
		v-model='tabs'
		dark
		slider-color="grey lighten-2"
		>
			
			<v-tab class='ml-5' href='#tab-home'>Главная</v-tab>
			<v-tab class='ml-5' href='#tab-recommended'>Рекомендуемое</v-tab>
			<v-tab class='ml-5' href='#tab-politics'>Политика</v-tab>
			<v-tab class='ml-5' href='#tab-culture'>Культура</v-tab>
			<v-tab class='ml-5' href='#tab-science'>Наука</v-tab>
			<v-tab class='ml-5' href='#tab-religion'>Религия</v-tab>
			<v-tab class='ml-5' href='#tab-economy'>Экономика</v-tab>

			<v-tabs-items v-model='tabs'>
				<v-tab-item v-for='(tab, i) in items' :key='i' :value='"tab-" + tab.theme'>
						
						<Recommended v-if='tab.theme == "recommended"' />
						<AllArticles  v-else-if='tab.theme == "home"' />	
						<Section v-else :theme='tab.theme' :name='tab.name' />
				</v-tab-item>
			</v-tabs-items>

		</v-tabs>
	</div>
</template>

<script>
import axios from 'axios'
import Header from './Header/Header'
import Recommended from './ThemeDivided/Recommended'
import AllArticles from './ThemeDivided/AllArticles'
import Section from './ThemeDivided/Section'
import { mapState } from 'vuex'

export default {
	name: 'Home',
	data() {
		return {
			items: [ {name: 'Главная', theme: "home"}, {name: 'Рекомендуемое', theme: "recommended"},
			 {name: 'Политика', theme: "politics"}, {name: 'Культура', theme: "culture"}, {name: 'Наука', theme: "science"}, 
			 {name: 'Религия', theme: "religion"}, {name: 'Экономика', theme: "economy"} 
			],
			tabs: null,
			
		}
	},
	components: {
		Header, Recommended, Section, AllArticles
	},
	computed: {
		...mapState(["color"])
	},
	methods: {
		
	},
	
	
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
		height: 110px;
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