<template>
	<div id='app'>
		<Header />
		<v-tabs
		show-arrows
		v-model='tabs'
		dark
		slider-color="grey lighten-2"
		icons-and-text
		>
			
			<v-tab class='ml-5' href='#tab-home'>
				Главная
				<v-icon>mdi-home</v-icon>
			</v-tab>
			<v-tab class='ml-5' href='#tab-politics'>
				Политика
				<v-icon>mdi-briefcase</v-icon>	
			</v-tab>
			<v-tab class='ml-5' href='#tab-culture'>
				Культура
				<v-icon>mdi-theater</v-icon>
			</v-tab>
			<v-tab class='ml-5' href='#tab-science'>
				Наука
				<v-icon>mdi-flask</v-icon>	
			</v-tab>
			<v-tab class='ml-5' href='#tab-religion'>
				Религия
				<v-icon>mdi-church</v-icon>
			</v-tab>
			<v-tab class='ml-5' href='#tab-economy'>
				Экономика
				<v-icon>mdi-square-inc-cash</v-icon>
			</v-tab>
			<v-tab class='ml-5' href='#tab-world'>
				В мире
				<v-icon>mdi-earth</v-icon>
			</v-tab>
			<v-tab class='ml-5' href='#tab-army'>
				Армия
				<v-icon>mdi-pistol</v-icon>
			</v-tab>
			<v-tab class='ml-5' href='#tab-sport'>
				Спорт
				<v-icon>mdi-basketball</v-icon>
			</v-tab>
			<v-tab class='ml-5' href='#tab-incidents'>
				Происшествия
				<v-icon>mdi-calendar-blank</v-icon>
			</v-tab>

			<v-tabs-items v-model='tabs'>
				<v-tab-item v-for='(tab, i) in items' :key='i' :value='"tab-" + tab.theme'>
						
						<AllArticles v-if='tab.theme == "home"' />	
						<Section v-else :theme='tab.theme'  />
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
			items: [ {name: 'Главная', theme: "home"},
			 {name: 'Политика', theme: "politics"}, {name: 'Культура', theme: "culture"}, {name: 'Наука', theme: "science"}, 
			 {name: 'Религия', theme: "religion"}, {name: 'Экономика', theme: "economy"}, {name: 'В мире', theme: "world"},
			 {name: 'Армия', theme: "army"}, {name: 'Спорт', theme: "sport"}, {name: 'Происшествия', theme: "incidents"},
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

