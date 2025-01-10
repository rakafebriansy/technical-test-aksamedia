import axios from "axios";
import { getAuthorizationToken } from "../helper/utils";

export class EmployeeService {
    static async login() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/employees`,{
                'Content-Type': 'application/json',
            });

            if(response.status != 200) {
                throw new Error(response.data);
            }

            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
