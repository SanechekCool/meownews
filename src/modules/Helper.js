export default class Helper { 
    static getTheme(theme){
        const themes = ['politics', 'science', 'religion', 'culture', 'economy', 'world', 'sport', 'army', 'incidents', 'home']
        const output = ['Политика', 'Наука', 'Религия', 'Культура', 'Экономика', 'В мире', 'Спорт', 'Армия', 'Происшествия', 'Все']
        let index = themes.indexOf(theme)
        return output[index]
    }

    static getDate(date){
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
        
        return date.split("").slice(8, 10).join("") + " " + months[new Date(date).getMonth()] + " в " + date.split("").slice(11,16).join("")
    }
}