import axios from "axios";
import { getAuthorizationToken, getUserFromCookie } from "../helper/utils";

export class EmployeeService {
    static async get({name, perPage, page}) {
        try {
            let url = `${import.meta.env.VITE_BACKEND_URL}/api/employees`;
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
                employees: response.data.data.employees,
                pagination: response.data.pagination
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async show(id) {
        try {
            const token = getAuthorizationToken();
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/employees/${id}`;

            const response = await axios.get(url,{
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

    static async store(formData) {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/employees`;

            const token = getAuthorizationToken();
            const response = await axios.post(url,formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response)

            if(response.status != 201) {
                throw new Error(response.data);
            }

            return;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async update(formData,id) {
        try {
            const token = getAuthorizationToken();
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/employees/${id}`;
            formData.append('_method', 'PUT');

            const response = await axios.post(url,formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if(response.status != 200) {
                throw new Error(response.data);
            }

            return;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async remove(id) {
        try {
            const token = getAuthorizationToken();
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/employees/${id}`;

            const response = await axios.delete(url,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if(response.status != 200) {
                throw new Error(response.data);
            }

            return;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
