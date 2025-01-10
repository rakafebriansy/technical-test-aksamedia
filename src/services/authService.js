import axios from "axios";
import { setCookie } from "../helper/cookie";
import { getAuthorizationToken } from "../helper/utils";

export class AuthService {
    static async login(username, password) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`,{
                username, 
                password
            },{
                'Content-Type': 'application/json',
            });

            if(response.status != 200) {
                throw new Error(response.data);
            }

            setCookie('user', JSON.stringify(response.data.data),30);
    
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async logout() {
        try {
            const token = getAuthorizationToken();
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`,null,{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            });

            if(response.status != 200) {
                throw new Error(response.data);
            }

            removeFromLocalStorage('user');
    
            return;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}