import axios from 'axios';
import { baseUrl } from 'utils';

class HomeService {
    constructor() {
        this.axios = axios;
    }

    availableColumns() {
        return [
            { id: 'Business_name' },
            { id: 'Business_email' },
            { id: 'Business_id' },
            { id: 'Entity_type' },
            { id: 'Lead_owner' },
            { id: 'Mbo_personnel' },
            { id: 'Qualification_score' },
            { id: 'Registration_Time' },
            { id: 'Account_status' },
        ];
    }

    async get() {
        return this.axios.get(`${baseUrl}/businesses`)
            .then((response) => response.data);
    }

    async post(formData, id, options) {

    }
}

export default new HomeService();
