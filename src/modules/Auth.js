import axios from 'axios';
const domain = 'https://meowapi.herokuapp.com/api';


export default class Auth {
    static async signIn(username, password){
        try{
            const response = await axios.post(domain + "-token-auth/", { username, password });
            return response.data.token;
            
        } catch(err) {
            return err;
        }
    }

    static async signUp(email, username, password, image, first_name, last_name){
        try {
            const data = await axios.post(domain + "/users", { email, password, username, image, first_name, last_name });
            this.signIn(username, password);
        } catch(err){
            return err;
        }
    }
}