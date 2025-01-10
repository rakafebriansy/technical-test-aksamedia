import axios from "axios";
import { removeCookie, setCookie } from "../helper/cookie";
import { getAuthorizationToken } from "../helper/utils";

export class AuthService {
    static async login(username, password) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`,{
                username, 
                password
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
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
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if(response.status != 200) {
                throw new Error(response.data);
            }

            removeCookie('user');
    
            return;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}