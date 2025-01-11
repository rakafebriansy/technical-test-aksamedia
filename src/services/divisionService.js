import axios from "axios";
import { getAuthorizationToken } from "../helper/utils";

export class DivisionService {
    static async get({name, perPage, page}) {
        try {
            let url = `${import.meta.env.VITE_BACKEND_URL}/api/divisions`;
            const params = [];
            if (name && name !== 'undefined') {
                params.push(`name=${name}`);
            }
            if (page && page !== 'undefined') {
                params.push(`page=${page}`);
            }
            if (perPage && page !== 'undefined') {
                params.push(`per_page=${perPage}`);
            }

            if (params.length > 0) {
                url += '?' + params.join('&');
            }

            const token = getAuthorizationToken();
            const response = await axios.get(url,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if(response.status != 200) {
                throw new Error(response.data);
            }

            return {
                divisions: response.data.data.divisions,
                pagination: response.data.pagination
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async all() {
        try {
            const token = getAuthorizationToken();
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/divisions/all`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if(response.status != 200) {
                throw new Error(response.data);
            }

            return response.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
