import axios from 'axios';


export default class NewsHelper {
    static async loadNews(domain){
        const news = []
        const response = await axios.get(domain)
            
        let data = response.data['results']
        data.forEach( (element) => {
            let { title, text, pub_date, theme, url_to_source, views, id, img } = element
            news.push({ title, text, pub_date, theme, url: url_to_source, id, views, img })
        })
        let next = response.data['next']
        return [news, next]
        
    }

}   