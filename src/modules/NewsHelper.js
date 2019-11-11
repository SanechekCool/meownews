import axios from 'axios';


export default class NewsHelper {
    static async loadNews(domain){
        const news = []
        let next
        const response = await axios.get(domain)
            
        let data = response.data['results']
        data.forEach( (element, i) => {
            let { title, summary, pub_date, theme, url, views, img } = element
            news.push({ title, summary, pub_date, theme, url, views, img })
        })
        next = response.data['next']
        return [news, next]
        
    }

}